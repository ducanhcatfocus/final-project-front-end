import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const EnterPassword = ({
  handleJoinRoom,
  isRoomPassword,
  setIsRoomPassword,
}) => {
  const ref = useRef();
  const passwordRef = useRef();
  const [wrongPassword, setIsWrongPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       setIsRoomPassword(null);
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     window.removeEventListener("click", handleClickOutside);
  //   };
  // }, [ref]);

  const handleConfirmPassword = () => {
    console.log(isRoomPassword.roomPassword);
    if (isRoomPassword.roomPassword) {
      if (passwordRef.current.value === isRoomPassword.roomPassword) {
        handleJoinRoom(isRoomPassword.roomId, passwordRef.current.value);
        setIsRoomPassword(null);
        setIsWrongPassword(false);
        return;
      }
      setIsWrongPassword(true);
      return;
    }
    handleJoinRoom(isRoomPassword.roomId, passwordRef.current.value);
  };

  return (
    <div className="absolute bottom-0 right-0 h-full w-full backdrop-brightness-25 flex overflow-hidden">
      <div
        ref={ref}
        className="w-80 h-48 bg-dark-third m-auto flex flex-col justify-between rounded relative"
      >
        <div className="h-12 text-white font-semibold rounded-t flex items-center justify-center border-b-0.5 border-gray-500">
          Password
          <AiOutlineCloseCircle
            onClick={() => setIsRoomPassword(null)}
            className="absolute top-1 right-1 h-7 w-7 cursor-pointer"
          />
        </div>
        <label htmlFor="password" className="relative m-2">
          <input
            onChange={() => {
              if (passwordRef.current.value === "") {
                setIsWrongPassword(false);
              }
            }}
            ref={passwordRef}
            className={
              wrongPassword
                ? "text-dark-primary text-center h-10 w-full focus:outline-none border-2 border-red-500 bg-slate-400"
                : "text-dark-primary text-center h-10 w-full focus:outline-none bg-slate-400"
            }
            id="password"
            type={showPassword ? "text" : "password"}
            maxLength="50"
          />
          {showPassword ? (
            <AiOutlineEye
              onClick={() => {
                setShowPassword(false);
              }}
              className="absolute top-3 right-2 h-5 w-5 text-dark-primary cursor-pointer"
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => setShowPassword(true)}
              className="absolute top-3 right-2 h-5 w-5 text-dark-primary cursor-pointer"
            />
          )}
        </label>
        {wrongPassword && (
          <p className="mx-2 text-red-500">Room password is incorrect!</p>
        )}
        <button
          onClick={handleConfirmPassword}
          className="px-5 py-2.5 m-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default EnterPassword;
