import React from "react";
import {
  AiOutlineAudio,
  AiOutlineAudioMuted,
  AiOutlineQuestion,
} from "react-icons/ai";
import {
  BsCameraVideo,
  BsCameraVideoOff,
  BsChatLeftText,
} from "react-icons/bs";
import { MdCallEnd, MdOutlineScreenShare } from "react-icons/md";
import { useState } from "react";
import RoomChat from "./RoomChat";
import { connect } from "react-redux";
import { leaveARoom } from "../../socket/roomHandle";
import RoomVideo from "./RoomVideo";
import { getActions } from "../../store/actions/roomAction";
import { switchOutgoingTracks } from "../../socket/webRTCHandle";
import RoomEmpty from "./RoomEmpty";
import RoomFullscreen from "./RoomFullscreen";

//lay tat ca thanh vien trong room ngoai tru minh
const roomFilter = (participants = [], id) => {
  let newP = participants.filter((p) => {
    return p.userId !== id;
  });
  return newP;
};

const Room = ({
  roomDetails,
  localStream,
  remoteStreams,
  isScreenSharingActive,
  screenSharingStream,
  setScreenShareStream,
  roomMessages,
  user,
}) => {
  const [openChat, setOpenChat] = useState(true);
  const [openInfo, setOpenInfo] = useState(false);
  const [cameraEnable, setCameraEnable] = useState(true);
  const [audioEnable, setAudioEnable] = useState(true);
  const [toggleFullVideo, setToggleFullVideo] = useState(null);

  const handleLeaveRoom = () => {
    leaveARoom();
  };

  const handleToggleCamera = () => {
    localStream.getVideoTracks()[0].enabled = !cameraEnable;
    if (screenSharingStream) {
      screenSharingStream.getVideoTracks()[0].enabled = !cameraEnable;
    }
    setCameraEnable(!cameraEnable);
  };

  const handleToggleScreen = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          audio: false,
          video: true,
        });
      } catch (err) {
        console.log("error while access to screen sharing");
      }
      if (stream) {
        setScreenShareStream(stream);
        switchOutgoingTracks(stream);
      }
    } else {
      switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenShareStream(null);
    }
  };

  const handleToggleAudio = () => {
    localStream.getAudioTracks()[0].enabled = !audioEnable;
    setAudioEnable(!audioEnable);
  };
  return (
    <>
      {roomDetails ? (
        <>
          <div className=" h-[calc(100%-3rem)] flex justify-between relative">
            {remoteStreams.length === 0 ? (
              <div className={openChat ? `w-[calc(100%-16rem)]` : "w-full"}>
                <RoomVideo
                  stream={
                    screenSharingStream ? screenSharingStream : localStream
                  }
                  isLocalStream
                  openChat={openChat}
                  userName={user.name}
                  userAvatar={user.avatar}
                />
              </div>
            ) : (
              <div
                className={
                  openChat
                    ? `w-[calc(100%-16rem)] grid grid-cols-1 lg:grid-cols-2 gap-1 h-[calc(100%-10px)] overflow-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100`
                    : "w-full grid grid-cols-1 lg:grid-cols-2 gap-1  h-[calc(100%-10px)] overflow-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 px-2"
                }
              >
                <RoomVideo
                  stream={
                    screenSharingStream ? screenSharingStream : localStream
                  }
                  isLocalStream
                  openChat={openChat}
                  userName={user.name}
                  userAvatar={user.avatar}
                  setToggleFullVideo={setToggleFullVideo}
                />
                {remoteStreams.map((stream, index) => (
                  <RoomVideo
                    id={stream.id}
                    key={stream.id}
                    stream={stream}
                    openChat={openChat}
                    userName={
                      roomFilter(roomDetails.participants, user.id)[index]
                        ?.userName
                    }
                    userAvatar={
                      roomFilter(roomDetails.participants, user.id)[index]
                        ?.userAvatar
                    }
                    setToggleFullVideo={setToggleFullVideo}
                  />
                ))}
              </div>
            )}
            {openChat ? (
              <RoomChat
                roomId={roomDetails.roomId}
                openInfo={openInfo}
                roomMessages={roomMessages}
                roomParticipants={roomDetails.participants}
                userName={user.name}
              />
            ) : null}
          </div>
          <div className=" h-12 w-full lg:bottom-0 bottom-0 py-1 px-2 dark:bg-dark-primary bg-light-primary border-t-0.5 dark:border-dark-third flex justify-between left-0 right-0">
            <div className="font-semibold">{roomDetails.roomName}</div>
            <div className="flex gap-2">
              <button
                onClick={handleToggleAudio}
                className="dark:bg-dark-third dark:hover:bg-gray-600 hover:bg-slate-300 h-10 w-10 rounded-full p-1 flex"
              >
                {audioEnable ? (
                  <AiOutlineAudio className="h-6 w-6 mx-auto my-auto " />
                ) : (
                  <AiOutlineAudioMuted className="h-6 w-6 mx-auto my-auto " />
                )}
              </button>
              <button
                onClick={handleToggleCamera}
                className=" h-10 w-10 rounded-full p-1 flex dark:bg-dark-third dark:hover:bg-gray-600 hover:bg-slate-300"
              >
                {cameraEnable ? (
                  <BsCameraVideo className="h-6 w-6 mx-auto my-auto" />
                ) : (
                  <BsCameraVideoOff className="h-6 w-6 mx-auto my-auto " />
                )}
              </button>
              <button
                onClick={handleToggleScreen}
                className="h-10 w-10 rounded-full p-1 flex dark:bg-dark-third dark:hover:bg-gray-600 hover:bg-slate-300"
              >
                <MdOutlineScreenShare className="h-6 w-6 mx-auto my-auto" />
              </button>
              <button
                onClick={handleLeaveRoom}
                className=" h-10 w-10 rounded-full p-1 flex bg-red-600 hover:bg-red-700"
              >
                <MdCallEnd className="h-6 w-6 mx-auto my-auto text-white" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (!openChat) {
                    setOpenChat(!openChat);
                  }
                  if (openInfo) {
                    setOpenChat(!openChat);
                  }
                  setOpenInfo(!openInfo);
                }}
                className=" h-10 w-10 rounded-full p-1 flex dark:bg-dark-third dark:hover:bg-gray-600 hover:bg-slate-300"
              >
                <AiOutlineQuestion className="h-6 w-6 mx-auto my-auto" />
              </button>
              <button
                onClick={() => {
                  if (!openInfo) {
                    setOpenChat(!openChat);
                  }
                  if (openInfo) {
                    setOpenInfo(!openInfo);
                  }
                }}
                className="h-10 w-10 rounded-full p-1 flex dark:bg-dark-third dark:hover:bg-gray-600 hover:bg-slate-300"
              >
                <BsChatLeftText className="h-6 w-6 mx-auto my-auto" />
              </button>
            </div>
            {toggleFullVideo && (
              <RoomFullscreen
                toggleFullVideo={toggleFullVideo}
                setToggleFullVideo={setToggleFullVideo}
              />
            )}
          </div>
        </>
      ) : (
        <RoomEmpty />
      )}
    </>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStateToProps = ({ room, auth }) => {
  return {
    ...room,
    ...auth,
  };
};

export default connect(mapStateToProps, mapActionToProps)(Room);
