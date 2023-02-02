import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

const RoomVideo = ({
  stream,
  isLocalStream,
  userName,
  userAvatar,
  setToggleFullVideo,
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
    <div className="p-1 h-full flex justify-center">
      <div className="relative self-center">
        <video
          onClick={() => setToggleFullVideo(stream)}
          ref={videoRef}
          className="rounded-lg border-0.5 dark:border-dark-third cursor-pointer"
          autoPlay
          muted={isLocalStream ? true : false}
          width="750"
        />
        <div className="absolute top-1 left-1 flex gap-1 items-center text-white p-1 rounded-lg">
          <img src={userAvatar} className="h-10 w-10 rounded-full" />
          {userName}
        </div>
      </div>
    </div>
  );
};

export default RoomVideo;
