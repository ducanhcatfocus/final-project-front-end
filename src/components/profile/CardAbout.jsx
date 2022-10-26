import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { updateProfile } from "../../api/user";

const CardAbout = ({ setSelectedId, about, setUserProfile, userProfile }) => {
  const defaultValue = about;
  const [text, setText] = useState(about);
  const [change, setChange] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (e.target.value === about) {
      setChange(false);
      return;
    }
    setChange(true);
  };

  const handleSubmit = async () => {
    await updateProfile({ about: text });
    setUserProfile({ ...userProfile, about: text });
    setChange(false);
  };

  return (
    <div className="lg:w-1/2 lg:h-1/2 bg-dark-third mx-auto mt-4 lg:my-auto h-64 flex flex-col justify-between rounded-lg p-4">
      <div className="flex justify-between">
        <div className="font-semibold">ABOUT ME</div>
        <button
          className="border-2 rounded-full w-8 h-8 hover:bg-dark-secondary"
          onClick={() => {
            setSelectedId(null);
            setChange(false);
          }}
        >
          X
        </button>
      </div>
      <div className="mb-auto">
        You can use markdown and links if you'd like.
      </div>
      <textarea
        onChange={(e) => handleTextChange(e)}
        value={text}
        className="bg-dark-secondary resize-none p-4 focus:outline-none rounded h-1/2"
        maxLength="190"
      />
      <div className="bg-dark-secondary rounded-b text-end p-1 text-xs text-gray-400">
        {190 - text.length}
      </div>
      <AnimatePresence>
        {change && (
          <motion.div
            animate={{ y: -75 }}
            exit={{ y: 0 }}
            // transition={{ stiffness: 50 }}
            className="absolute h-12 md:w-96 w-80 border lg:bottom-2  bottom-1/2 py-1 px-2 m-auto bg-dark-third flex justify-between rounded left-0 right-0"
          >
            <div className="font-semibold self-center text-sm lg:text-base">
              You have unsaved changes!
            </div>
            <div className="flex">
              <button
                onClick={() => {
                  setText(defaultValue);
                  setChange(false);
                }}
                className="mr-2 hover:underline text-gray-300"
              >
                reset
              </button>
              <button
                onClick={() => handleSubmit()}
                className="bg-blue-500 py-1 px-3 my-1 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardAbout;
