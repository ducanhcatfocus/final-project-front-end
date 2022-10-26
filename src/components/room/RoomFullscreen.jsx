import React, { useEffect } from "react";
import { useRef } from "react";

const RoomFullscreen = ({ toggleFullVideo, setToggleFullVideo }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = toggleFullVideo;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [toggleFullVideo]);
  return (
    <div className="absolute h-full w-full  top-0 left-0 overflow-hidden backdrop-brightness-25 py-6 px-10">
      <div className="relative h-full bg-dark-secondary">
        <video
          ref={videoRef}
          className="rounded-lg border-0.5 border-dark-third  cursor-pointer h-full w-full relative"
          autoPlay
          width=""
        />
        <div
          onClick={() => setToggleFullVideo(null)}
          className="absolute text-white top-2 hover:bg-slate-500 right-5 bg-dark-third rounded-full h-9 w-9 text-lg text-center p-1 cursor-pointer"
        >
          X
        </div>
      </div>
    </div>
  );
};

export default RoomFullscreen;
