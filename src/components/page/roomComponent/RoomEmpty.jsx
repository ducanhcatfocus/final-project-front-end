import React from "react";
import { useNavigate } from "react-router-dom";

const RoomEmpty = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex items-center justify-center gap-2 ">
      You are alone, poor you
      <img
        src="https://cdn.discordapp.com/emojis/598344932423630848.webp?size=128&quality=lossless"
        alt="sad"
        className="h-10 w-10"
      />
      ,so
      <div className="text-center flex flex-col gap-2">
        <button
          onClick={() => navigate("/create-room")}
          className="rounded-lg w-fit bg-green-500 p-1 hover:bg-green-600"
        >
          Create a Room
        </button>
        <p>Or</p>
        <button
          onClick={() => navigate("/join-room")}
          className="rounded-lg bg-blue-500 p-1 hover:bg-blue-600"
        >
          Join a Room
        </button>
      </div>
    </div>
  );
};

export default RoomEmpty;
