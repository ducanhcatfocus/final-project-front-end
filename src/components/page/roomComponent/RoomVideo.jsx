import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

const RoomVideo = ({
  stream,
  isLocalStream,
  openChat,
  userName,
  userAvatar,
}) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);
  return (
    <div className="flex justify-center pt-2 ">
      <div className="relative">
        <video
          ref={videoRef}
          className="rounded-lg"
          width={openChat ? "720" : "720"}
          autoPlay
          muted={isLocalStream ? true : false}
        />
        <div className="absolute top-1 left-1 flex gap-1 items-center bg-dark-third p-1 rounded-lg">
          <img src={userAvatar} className="h-10 w-10 rounded-full" />
          {userName}
        </div>
      </div>
    </div>
  );
};

export default RoomVideo;
