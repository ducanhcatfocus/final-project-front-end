import React, { useEffect, useRef } from "react";
import { CgDarkMode } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";
import { FiUsers, FiHelpCircle, FiUser, FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { disconnectSocket } from "../../socket/socketConnection";
import useSound from "use-sound";
import bockSound from "./Misc_soundboard_bockbock.mp3";

const NavBar = ({
  logout,
  user,
  setToggleFriend,
  toggleFriend,
  setToggleChat,
  toggleChat,
  newMessage,
  setToggleNotification,
  toggleNotification,
}) => {
  const { toggleTheme } = useTheme();
  const [contextMenu, setContextMenu] = useState(false);
  const [noti, setNoti] = useState(true);
  const navigate = useNavigate();
  const ref = useRef();
  const [play] = useSound(bockSound);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref?.current?.contains(e.target)) {
        setContextMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("contextmenu", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("contextmenu", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    setNoti(newMessage);
    // play();
  }, [newMessage]);
  const handleLogout = () => {
    setContextMenu(false);
    disconnectSocket();
    logout(navigate);
  };

  return (
    <header className="dark:bg-dark-primary bg-light-primary h-12 shadow-2xl dark:shadow-none px-2">
      {user ? (
        <>
          <div className="flex justify-between">
            <div className="flex p-1 gap-3">
              <Link to="/">
                <img src="./logo.jpg" className="h-10" alt="" />
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="dark:bg-white  bg-light-secondary p-1 rounded"
              >
                <CgDarkMode
                  className="dark:text-secondary text-white"
                  size={24}
                />
              </button>
              <button
                className={
                  toggleNotification
                    ? "dark:bg-gray-600 bg-light-secondary p-2 rounded-full h-9 w-9 items-center flex hover:border-0.5 dark:hover:border-gray-600"
                    : "dark:bg-dark-third bg-light-secondary p-2 rounded-full h-9 w-9 items-center flex hover:border-0.5 dark:hover:border-gray-600"
                }
              >
                <FiBell
                  onClick={() => {
                    setToggleChat(false);
                    setToggleNotification(!toggleNotification);
                  }}
                  className="dark:text-gray-300 text-white"
                  size={24}
                />
              </button>
              <button
                className={
                  toggleChat
                    ? "dark:bg-gray-600 bg-light-secondary p-2 rounded-full h-9 w-9 items-center flex hover:border-0.5 dark:hover:border-gray-600 relative"
                    : "dark:bg-dark-third bg-light-secondary p-2 rounded-full h-9 w-9 items-center flex hover:border-0.5 dark:hover:border-gray-600 relative"
                }
              >
                <BsChatLeftText
                  onClick={() => {
                    setToggleNotification(false);
                    setToggleChat(!toggleChat);
                    setNoti(false);
                  }}
                  className={
                    toggleChat == true
                      ? "dark:text-gray-300  text-blue-500"
                      : "dark:text-gray-300  text-white"
                  }
                  size={24}
                />
                {noti ? (
                  <div className="absolute w-3 h-3 bg-blue-500 top-0 right-0 rounded-full"></div>
                ) : null}
              </button>
              <button className="dark:bg-dark-third bg-light-secondary p-2 rounded-full h-9 w-9 items-center flex hover:border-0.5 dark:hover:border-gray-600 ">
                <FiUsers
                  onClick={() => setToggleFriend(!toggleFriend)}
                  className="dark:text-gray-300 text-white"
                  size={24}
                />
              </button>
              <button
                ref={ref}
                onClick={() => setContextMenu(!contextMenu)}
                className="text-white font-semibold flex dark:hover:bg-dark-third hover:bg-light-secondary p-1   rounded"
              >
                <div className="self-center mr-2 font-semibold dark:text-white text-dark-third">
                  {user?.name}
                </div>
                <img
                  src={user?.avatar}
                  className="h-9 w-9 bg-white rounded-full dark:border-none border"
                />
              </button>
            </div>
          </div>
          {contextMenu && (
            <div
              style={{
                top: `60px`,
                left: `${window.innerWidth - 104}px`,
                position: "absolute",
              }}
            >
              <ul className="bg-gray-700 w-24 rounded text-gray-300 p-1 text-lg shadow-2xl select-none">
                <li className="hover:bg-blue-600 rounded p-1 flex justify-between">
                  <button onClick={() => navigate(`/my-profile`)}>
                    Profile
                  </button>
                  <FiUser className="self-center" />
                </li>
                <li className="hover:bg-blue-600 rounded p-1 flex justify-between">
                  <button onClick={() => navigate(`/guild`)}>Help</button>
                  <FiHelpCircle className="self-center" />
                </li>
                <li className="hover:bg-blue-600 rounded p-1 flex justify-between">
                  <button onClick={handleLogout}>Logout</button>
                  <AiOutlineLogout className="self-center" />
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={toggleTheme}
          className="dark:bg-white p-1 rounded m-2 w-8 justify-self-end col-start-1 col-end-7"
        >
          <CgDarkMode className="dark:text-dark-primary" size={24} />
        </button>
      )}
    </header>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStateToProps = ({ auth, chat }) => {
  return {
    ...auth,
    ...chat,
  };
};

export default connect(mapStateToProps, mapActionToProps)(NavBar);
