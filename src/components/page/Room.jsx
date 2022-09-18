import React from "react";
import MainPageContainer from "../MainPageContainer";
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
import RoomChat from "./roomComponent/RoomChat";
import { connect } from "react-redux";
import { leaveARoom } from "../../socket/roomHandle";
import RoomVideo from "./roomComponent/RoomVideo";
import { getActions } from "../../store/actions/roomAction";
import { switchOutgoingTracks } from "../../socket/webRTCHandle";
import RoomEmpty from "./roomComponent/RoomEmpty";

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
    <MainPageContainer>
      {roomDetails ? (
        <>
          <div className=" h-full flex justify-between">
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
                    ? `w-[calc(100%-16rem)] grid grid-cols-2 gap-1 h-[calc(100%-10px)] overflow-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100`
                    : "w-full grid grid-cols-2 gap-1  h-[calc(100%-10px)] overflow-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 px-2"
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
                />
                {remoteStreams.map((stream) => (
                  <RoomVideo
                    key={stream.id}
                    stream={stream}
                    openChat={openChat}
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
              />
            ) : null}
          </div>
          <div className="h-24 w-full bg-dark-primary mt-auto flex justify-between items-center px-2 border-t-0.5 border-dark-third">
            <div className="font-semibold">{roomDetails.roomName}</div>
            <div className="flex gap-2">
              <button
                onClick={handleToggleAudio}
                className="border h-10 w-10 rounded-full p-1 flex hover:bg-dark-third"
              >
                {audioEnable ? (
                  <AiOutlineAudio className="h-6 w-6 mx-auto my-auto " />
                ) : (
                  <AiOutlineAudioMuted className="h-6 w-6 mx-auto my-auto " />
                )}
              </button>
              <button
                onClick={handleToggleCamera}
                className="border h-10 w-10 rounded-full p-1 flex"
              >
                {cameraEnable ? (
                  <BsCameraVideo className="h-6 w-6 mx-auto my-auto" />
                ) : (
                  <BsCameraVideoOff className="h-6 w-6 mx-auto my-auto " />
                )}
              </button>
              <button
                onClick={handleToggleScreen}
                className="border h-10 w-10 rounded-full p-1 flex"
              >
                <MdOutlineScreenShare className="h-6 w-6 mx-auto my-auto" />
              </button>
              <button
                onClick={handleLeaveRoom}
                className="border h-10 w-10 rounded-full p-1 flex"
              >
                <MdCallEnd className="h-6 w-6 mx-auto my-auto" />
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
                className="border h-10 w-10 rounded-full p-1 flex"
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
                className="border h-10 w-10 rounded-full p-1 flex"
              >
                <BsChatLeftText className="h-6 w-6 mx-auto my-auto" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <RoomEmpty />
      )}
    </MainPageContainer>
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
