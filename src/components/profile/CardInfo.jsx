import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { updateProfile } from "../../api/user";

const CardInfo = ({ setSelectedId, userProfile, setUserProfile }) => {
  const defaultValue = {
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    gender: userProfile.gender,
    day: userProfile.day,
    month: userProfile.month,
    year: userProfile.year,
  };
  const [change, setChange] = useState(false);

  const [text, setText] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    gender: userProfile.gender,
    day: userProfile.day,
    month: userProfile.month,
    year: userProfile.year,
  });

  const { firstName, lastName, gender, day, month, year } = text;

  const handleTextChange = (e) => {
    const { value, name } = e.target;
    setText({ ...text, [name]: value });
    if (value !== defaultValue[name]) {
      setChange(true);
      return;
    }
  };

  const handleSubmit = async () => {
    await updateProfile(text);
    setUserProfile({
      ...userProfile,
      firstName: text.firstName,
      lastName: text.lastName,
      gender: text.gender,
      day: text.day,
      month: text.month,
      year: text.year,
    });
    setChange(false);
  };
  return (
    <div className="lg:w-1/2 lg:h-80 lg:my-auto h-80 mt-4 mx-auto w-80 bg-dark-third m-auto flex flex-col justify-between rounded-lg p-4">
      <div className="flex justify-between">
        <div className="font-semibold">INTRODUCTION</div>
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
          First Name
        </div>
        <div className="p-1 border-2 border-dark-secondary mt-2 rounded ">
          <input
            className="p-1 w-full text-gray-900 bg-gray-50 dark:bg-dark-third dark:placeholder-gray-400 dark:text-white focus:outline-none"
            type="text"
            maxLength="20"
            placeholder="None"
            name="firstName"
            value={firstName}
            onChange={(e) => handleTextChange(e)}
          />
        </div>
      </div>
      <div className=" w-full relative">
        <div className="absolute left-2 top-0 px-2 bg-dark-third text-xs ">
          Last Name
        </div>
        <div className="p-1 border-2 border-dark-secondary mt-2 rounded ">
          <input
            className="p-1 w-full text-gray-900 bg-gray-50 dark:bg-dark-third dark:placeholder-gray-400 dark:text-white focus:outline-none"
            type="text"
            maxLength="20"
            placeholder="None"
            name="lastName"
            value={lastName}
            onChange={(e) => handleTextChange(e)}
          />
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-2 top-0 px-2 bg-dark-third text-xs">
          Gender
        </div>
        <div className="p-1 border-2 border-dark-secondary mt-2 rounded ">
          <select
            value={gender}
            onChange={(e) => handleTextChange(e)}
            name="gender"
            className="form-select appearance-none block w-full p-1 text-white bg-dark-third bg-clip-padding bg-no-repeat m-0 focus:text-white focus:bg-dark-third focus:border-blue-600 focus:outline-none"
          >
            <option selected className="">
              None
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <div className=" flex flex-row gap-2">
        <div className="relative basis-1/3">
          <div className="absolute left-2 top-0 px-2 bg-dark-third text-xs">
            Day
          </div>
          <div className="p-1 border-2 border-dark-secondary mt-2 rounded ">
            <select
              value={day}
              name="day"
              onChange={(e) => handleTextChange(e)}
              className="form-select appearance-none block w-full p-1 text-white bg-dark-third bg-clip-padding bg-no-repeat m-0 focus:text-white focus:bg-dark-third focus:border-blue-600 focus:outline-none"
            >
              <option selected value="">
                None
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
        <div className="relative basis-1/3">
          <div className="absolute left-2 top-0 px-2 bg-dark-third text-xs">
            Month
          </div>
          <div className="p-1 border-2 border-dark-secondary mt-2 rounded ">
            <select
              value={month}
              name="month"
              onChange={(e) => handleTextChange(e)}
              className="form-select appearance-none block w-full p-1 text-white bg-dark-third bg-clip-padding bg-no-repeat m-0 focus:text-white focus:bg-dark-third focus:border-blue-600 focus:outline-none"
            >
              <option selected value="">
                None
              </option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
        </div>
        <div className="relative basis-1/3">
          <div className="absolute left-2 top-0 px-2 bg-dark-third text-xs">
            Year
          </div>
          <div className="p-1 border-2 border-dark-secondary mt-2 rounded ">
            <select
              value={year}
              name="year"
              onChange={(e) => handleTextChange(e)}
              className="form-select appearance-none block w-full p-1 text-white bg-dark-third bg-clip-padding bg-no-repeat m-0 focus:text-white focus:bg-dark-third focus:border-blue-600 focus:outline-none"
            >
              <option selected>None</option>
              <option value="1998">1998</option>
              <option value="1999">1999</option>
            </select>
          </div>
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

export default CardInfo;
