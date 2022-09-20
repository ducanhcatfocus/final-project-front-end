import React, { useState } from "react";
import MainPageContainer from "../MainPageContainer";
import { isValidCode } from "../../utils/validate";
import { joinARoom, leaveARoom } from "../../socket/roomHandle";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { updateRoomChat } from "../../socket/socketConnection";
import { AiOutlineLock } from "react-icons/ai";
import { getActions } from "../../store/actions/roomAction";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";

const validateInfo = (name) => {
  if (!name.trim()) return { status: false, error: "Room code is missing!" };
  if (!isValidCode.test(name))
    return {
      status: false,
      error: `We need ${name} is valid code (letters, numbers (0-9), and dash "-")`,
    };
  return { status: true };
};

const JoinRoom = ({
  roomDetails,
  activeRooms,
  user,
  setAudioOnly,
  audioOnly,
}) => {
  const [roomId, setRoomId] = useState();
  const [noti, setNoti] = useState({
    border: "dark:border-gray-600 border-gray-300",
    message: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      updateRoomChat();
    }
  }, [user]);

  const handleChangeInput = (e) => {
    setRoomId(e.target.value);
    setNoti({
      border: "dark:border-gray-600 border-gray-300 ",
      message: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { status, error } = validateInfo(roomId);
    if (!status)
      return setNoti({
        border: "border-red-500",
        message: error,
      });
    if (!roomDetails || roomDetails.roomId !== roomId) {
      joinARoom({
        roomId: roomId,
        userName: user.name,
        userAvatar: user.avatar,
        userMail: user.email,
      });
    }
    navigate("/room");
  };

  const handleJoinRoom = (roomId) => {
    if (roomDetails && roomDetails.roomId !== roomId) {
      leaveARoom();
      joinARoom({
        roomId,
        userName: user.name,
        userAvatar: user.avatar,
        userMail: user.email,
      });
      navigate("/room");
      return;
    }
    if (!roomDetails) {
      joinARoom({
        roomId,
        userName: user.name,
        userAvatar: user.avatar,
        userMail: user.email,
      });
    }
    navigate("/room");
  };

  return (
    <MainPageContainer>
      <div className="w-full mx-auto p-5 border-b-0.5 border-dark-third space-y-3">
        <h1 className="text-white font-semibold">JOIN ROOM</h1>
        <span className="text-gray-400">
          You can join room chat by room code or click on a available room
        </span>
        <div>
          {!audioOnly ? (
            <button onClick={() => setAudioOnly(!audioOnly)}>
              <BsCameraVideo className="h-6 w-6 mx-auto my-auto" />
            </button>
          ) : (
            <button onClick={() => setAudioOnly(!audioOnly)}>
              <BsCameraVideoOff className="h-6 w-6 mx-auto my-auto " />
            </button>
          )}
        </div>

        <label
          className={"flex justify-between bg-dark-third border " + noti.border}
        >
          <input
            className={
              "p-2 w-full text-sm text-gray-900 bg-gray-50 dark:bg-dark-third dark:placeholder-gray-400 dark:text-white focus:outline-none"
            }
            placeholder="Enter Room code"
            maxLength="60"
            onChange={(e) => handleChangeInput(e)}
            name="name"
            type="text"
          />
          <button
            onClick={handleSubmit}
            className={
              !roomId
                ? "w-1/5 bg-blue-900 p-1 m-2  rounded cursor-not-allowed self-center text-gray-400"
                : "w-1/5 bg-blue-500 p-1 m-2  rounded self-center"
            }
            disabled={!roomId}
          >
            Join
          </button>
        </label>
        <div className="text-xs text-red-500 select-none">{noti.message}</div>
      </div>
      <div className="h-full">
        <ul>
          {activeRooms.map((r) => (
            <li
              key={r.roomId}
              onClick={() => handleJoinRoom(r.roomId)}
              className="border-b-0.5 border-light-third dark:border-dark-third hover:bg-gray-100 dark:hover:bg-gray-700 flex h-11 p-1 "
            >
              <img
                src={r.roomCreator.roomCreatorAvatar}
                className="h-9 w-9 bg-white rounded-full"
                alt="avatar"
              />
              <div className="w-1/4 border-r-0.5 border-dark-third my-auto p-1 truncate">
                {r.roomCreator.roomCreatorName}
              </div>
              <div className="w-1/2 border-r-0.5 border-dark-third my-auto p-1 truncate">
                {r.roomName}
              </div>
              <div className="w-1/4 flex justify-between items-center p-1">
                <div className="flex gap-1 truncate w-full">
                  {r.participants.map((p, index) => {
                    if (index < 4) {
                      return (
                        <img
                          src={p.userAvatar}
                          className="h-8 w-8 bg-white rounded-full"
                          alt="avatar"
                        />
                      );
                    }
                    return <>... + {r.participants.length - index} more</>;
                  })}
                </div>
                {r.roomPassword !== "" ? (
                  <div className="justify-self-end">
                    <AiOutlineLock />
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MainPageContainer>
  );
};

const mapStateToProps = ({ room, auth }) => {
  return {
    ...room,
    ...auth,
  };
};
const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionToProps)(JoinRoom);
