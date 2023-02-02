import React, { useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import addFriend from "./addfri.png";
const arr = [
  {
    img: addFriend,
    content:
      "To start using the app, you need to make friends. First, select the friend item on the navigation bar. Then enter your friend's email address. Finally, press Send friend request to send the invitation.",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKr5wT7rfkjkGvNeqgXjBmarC5ZNoZs-H2uMpML8O7Q4F9W-IlUQibBT6IPqyvX45NOgw&usqp=CAU",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim leo, porttitor ac hendrerit elementum, eleifend ac nisi. Sed dapibus neque vitae lectus tempor gravida at eu elit. Praesent molestie feugiat dapibus. Proin quis lobortis sapien. Donec vel velit massa. Phasellus viverra ipsum eu est finibus aliquet. Donec ex nisl, luctus elementum elementum ut, lacinia vel est. Nulla faucibus sed velit nec lacinia. Nulla ut dui luctus, viverra magna ut, congue purus.",
  },
  {
    img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nytimes.com%2F2021%2F09%2F07%2Fscience%2Fcat-stripes-genetics.html&psig=AOvVaw1UqBE0ncp96XDh0NH1cP68&ust=1670453647901000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOjG2PSK5vsCFQAAAAAdAAAAABAO",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim leo, porttitor ac hendrerit elementum, eleifend ac nisi. Sed dapibus neque vitae lectus tempor gravida at eu elit. Praesent molestie feugiat dapibus. Proin quis lobortis sapien. Donec vel velit massa. Phasellus viverra ipsum eu est finibus aliquet. Donec ex nisl, luctus elementum elementum ut, lacinia vel est. Nulla faucibus sed velit nec lacinia. Nulla ut dui luctus, viverra magna ut, congue purus. ",
  },
  {
    img: "https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim leo, porttitor ac hendrerit elementum, eleifend ac nisi. Sed dapibus neque vitae lectus tempor gravida at eu elit. Praesent molestie feugiat dapibus. Proin quis lobortis sapien. Donec vel velit massa. Phasellus viverra ipsum eu est finibus aliquet. Donec ex nisl, luctus elementum elementum ut, lacinia vel est. Nulla faucibus sed velit nec lacinia. Nulla ut dui luctus, viverra magna ut, congue purus.",
  },
];

const Guild = () => {
  const [sliceNumber, setSliceNumber] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="absolute bottom-0 right-0 h-full w-full backdrop-brightness-25 flex overflow-hidden">
      <div className="w-96 h-[calc(100%_-_12rem)] bg-dark-third m-auto flex flex-col justify-between rounded">
        <div className="h-12 text-white font-semibold rounded-t flex items-center justify-center">
          How to use
        </div>

        <motion.div
          key={sliceNumber}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 2 }}
          exit={{ x: -50, opacity: 0 }}
          className="mx-2 mb-auto"
        >
          <img src={arr[sliceNumber].img} alt="" className="h-40 w-full " />
          <div className="text-justify">{arr[sliceNumber].content}</div>
        </motion.div>

        <div className="flex justify-between m-2">
          {sliceNumber !== 0 ? (
            <MdOutlineArrowBackIos
              onClick={() => setSliceNumber(sliceNumber - 1)}
              className="h-8 w-8 text-slate-400  hover:text-slate-600"
            />
          ) : (
            <div className="h-8 w-8"></div>
          )}
          <div className="flex gap-2 ">
            {arr.map((i, index) => (
              <div
                className={
                  index === sliceNumber
                    ? "h-3 w-3 bg-slate-600 rounded-full self-center"
                    : "h-3 w-3 bg-slate-400 rounded-full self-center"
                }
              ></div>
            ))}
          </div>
          {sliceNumber !== arr.length - 1 ? (
            <MdOutlineArrowForwardIos
              onClick={() => setSliceNumber(sliceNumber + 1)}
              className="h-8 w-8 text-slate-400  hover:text-slate-600"
            />
          ) : (
            <div className="h-8 w-8"></div>
          )}
        </div>
        <div className="flex items-center mx-2">
          <input
            id="link-checkbox"
            type="checkbox"
            name="privateRoom"
            className="w-3 h-3 text-blue-600 rounded border-gray-300 dark:border-dark-third"
          />
          <label htmlFor="link-checkbox" className="ml-2 text-xs">
            Don't show this again
          </label>
        </div>

        <button
          onClick={() => navigate("/add-friend", { replace: true })}
          className="px-5 py-2.5 m-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800"
        >
          Let's go
        </button>
      </div>
    </div>
  );
};

export default Guild;
