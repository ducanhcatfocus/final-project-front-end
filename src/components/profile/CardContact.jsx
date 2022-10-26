import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { updateProfile } from "../../api/user";

const CardContact = ({
  setSelectedId,
  userProfile,
  setUserProfile,
  email1,
}) => {
  const defaultValue = {
    phoneNumber: userProfile.phoneNumber,
    address: userProfile.address,
  };
  const [text, setText] = useState({
    phoneNumber: userProfile.phoneNumber,
    address: userProfile.address,
  });
  const [change, setChange] = useState(false);

  const handleTextChange = (e) => {
    const { value, name } = e.target;
    setText({ ...text, [name]: value });
    if (value !== defaultValue[name]) {
      setChange(true);
      return;
    }
  };
  console.log(email1);

  const handleSubmit = async () => {
    await updateProfile(text);
    setUserProfile({
      ...userProfile,
      phoneNumber: text.phoneNumber,
      address: text.address,
    });
    setChange(false);
  };
  return (
    <div className="lg:w-1/2 lg:h-1/2 lg:my-auto h-80 mt-4 mx-auto w-80  bg-dark-third m-auto flex flex-col justify-between rounded-lg p-4">
      <div className="flex justify-between">
        <div className="font-semibold">CONTACT</div>
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
      <div className=" w-full relative">
        <div className="absolute left-2 top-0 px-2 bg-dark-third text-xs">
          Email
        </div>
        <div className="p-1 border-2 border-dark-secondary mt-2 rounded ">
          <input
            disabled
            className="p-1 w-full text-gray-900 bg-gray-50 dark:bg-dark-third dark:placeholder-gray-400 dark:text-white focus:outline-none"
            type="text"
            maxLength="20"
            placeholder="None"
            value={email1}
          />
        </div>
      </div>
      <div className=" w-full relative">
        <div className="absolute left-2 top-0 px-2 bg-dark-third text-xs ">
          Phone Number
        </div>
        <div className="p-1 border-2 border-dark-secondary mt-2 rounded ">
          <input
            className="p-1 w-full text-gray-900 bg-gray-50 dark:bg-dark-third dark:placeholder-gray-400 dark:text-white focus:outline-none"
            type="text"
            maxLength="20"
            placeholder="None"
            name="phoneNumber"
            value={text.phoneNumber}
            onChange={(e) => handleTextChange(e)}
          />
        </div>
      </div>
      <div className=" w-full relative">
        <div className="absolute left-2 top-0 px-2 bg-dark-third text-xs ">
          Address
        </div>
        <div className="p-1 border-2 border-dark-secondary mt-2 rounded ">
          <input
            className="p-1 w-full text-gray-900 bg-gray-50 dark:bg-dark-third dark:placeholder-gray-400 dark:text-white focus:outline-none"
            type="text"
            maxLength="20"
            placeholder="None"
            name="address"
            value={text.address}
            onChange={(e) => handleTextChange(e)}
          />
        </div>
      </div>
      <AnimatePresence>
        {change && (
          <motion.div
            animate={{ y: -75 }}
            exit={{ y: 0 }}
            className="absolute h-12 md:w-96 w-80 border lg:bottom-2 bottom-1/2 py-1 px-2 m-auto bg-dark-third flex justify-between rounded left-0 right-0"
          >
            <div className="font-semibold self-center  text-sm lg:text-base">
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

export default CardContact;
