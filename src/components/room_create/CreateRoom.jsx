import React, { useState } from "react";
import MainPageContainer from "../MainPageContainer";
import { isValidName } from "../../utils/validate";
import { createNewRoom, leaveARoom } from "../../socket/roomHandle";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const validateInfo = (name) => {
  if (!name.trim()) return { status: false, error: "Room name is missing!" };
  if (!isValidName.test(name))
    return {
      status: false,
      error: `We need ${name} is valid name (letters, numbers (0-9), underscore "_", dash "-", point ".")`,
    };
  return { status: true };
};

const CreateRoom = ({ user, roomDetails }) => {
  const [roomInfo, setRoomInfo] = useState({
    name: "",
    password: "",
    privateRoom: false,
    userName: user.name,
    userAvatar: user.avatar,
    userMail: user.email,
  });
  const [noti, setNoti] = useState({
    border: "dark:border-gray-600 border-gray-300",
    message: "",
  });

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setRoomInfo({
      ...roomInfo,
      [name]: value,
    });
    setNoti({
      border: "dark:border-gray-600 border-gray-300 ",
      message: "",
    });
    console.log(roomInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { status, error } = validateInfo(roomInfo.name);
    if (!status)
      return setNoti({
        border: "border-red-500",
        message: error,
      });
    if (roomDetails) {
      leaveARoom();
      createNewRoom(roomInfo);
      navigate("/room");
      return;
    }
    createNewRoom(roomInfo);
    navigate("/room");
  };

  return (
    <div className="w-full mx-auto p-5 space-y-3">
      <h1 className="dark:text-white font-semibold">CREATE ROOM</h1>
      <span className="dark:text-gray-400">
        You can add create room chat with room name and password
      </span>
      <label
        className={"flex justify-between bg-dark-third border " + noti.border}
      >
        <input
          className={
            "p-2 w-full text-sm text-gray-900 bg-gray-50 dark:bg-dark-third dark:placeholder-gray-400 dark:text-white focus:outline-none"
          }
          placeholder="name"
          maxLength="60"
          onChange={(e) => handleChangeInput(e)}
          name="name"
          type="text"
        />
      </label>
      <div className="text-xs text-red-500 select-none">{noti.message}</div>
      <label className="flex justify-between bg-dark-third border dark:border-gray-600 border-gray-300">
        <input
          className={
            "p-2 w-full text-sm text-gray-900 bg-gray-50 dark:bg-dark-third dark:placeholder-gray-400 dark:text-white focus:outline-none"
          }
          placeholder="password"
          maxLength="60"
          onChange={(e) => handleChangeInput(e)}
          type="text"
          name="password"
        />
      </label>
      <div>More options</div>
      <div className="flex items-center">
        <input
          id="link-checkbox"
          type="checkbox"
          value={roomInfo.privateRoom}
          name="privateRoom"
          className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-dark-third"
          onChange={() =>
            setRoomInfo({ ...roomInfo, privateRoom: !roomInfo.privateRoom })
          }
        />
        <label htmlFor="link-checkbox" className="ml-2">
          Private Room
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className={
          !roomInfo.name
            ? "w-1/5 dark:bg-blue-900 bg-blue-800 p-1 m-2  rounded cursor-not-allowed self-center text-gray-400"
            : "w-1/5 bg-blue-500 hover:bg-blue-600 p-1 m-2  rounded self-center"
        }
        disabled={!roomInfo.name}
      >
        Create
      </button>
    </div>
  );
};

const mapStateToProps = ({ auth, room }) => {
  return {
    ...auth,
    ...room,
  };
};
export default connect(mapStateToProps)(CreateRoom);
