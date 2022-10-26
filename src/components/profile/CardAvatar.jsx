import React from "react";
import { useState } from "react";
import { RiImageEditLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { updateProfile } from "../../api/user";
import { ChromePicker } from "react-color";
import { getActions } from "../../store/actions/authAction";
import { connect } from "react-redux";

const CardAvatar = ({
  setSelectedId,
  avatar,
  userProfile,
  setUserProfile,
  changeAvatar,
}) => {
  const defaultColor = userProfile.background;
  const [color, setColor] = useState(userProfile.background);
  const [customColor, setCustomColor] = useState(false);
  const [change, setChange] = useState(false);
  const [hover, setHover] = useState(false);
  const [image, setImage] = useState(null);

  const handleTextChange = (color) => {
    setColor(color.hex);
    if (color.hex !== defaultColor) {
      setChange(true);
      return;
    }
    setChange(false);
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setChange(true);
    }
  };

  const handleSubmit = async () => {
    await updateProfile({ background: color, avatar: image });
    setUserProfile({
      ...userProfile,
      background: color,
    });
    if (image) {
      changeAvatar(URL.createObjectURL(image));
    }
    setChange(false);
    setCustomColor(false);
  };

  return (
    <div className="lg:w-1/2 lg:h-80 lg:my-auto h-80 mt-4   bg-dark-third mx-auto flex flex-col justify-between rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <div className="font-semibold">PROFILE COLOR</div>
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
      <div className="flex justify-between mb-2">
        <div className="lg:w-1/2 text-center">Preview</div>
        <div className="w-1/2 text-center">Background</div>
      </div>
      <div className="flex justify-between mb-auto text-center gap-2">
        <div className="lg:w-1/2 h-full rounded">
          <div
            className="h-full p-2 rounded-lg"
            style={{
              backgroundColor: color,
            }}
          >
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="h-fit w-fit relative rounded-full shadow-2xl"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="image"
                  className="h-24 w-24 rounded-full "
                />
              ) : (
                <img
                  src={avatar}
                  alt="avatar"
                  className="h-24 w-24 rounded-full "
                />
              )}
              {hover ? (
                <label
                  className="absolute bottom-0 right-0 h-full w-full rounded-full backdrop-brightness-25 flex border cursor-pointer"
                  htmlFor="formId"
                  onChange={(e) => handleImageChange(e)}
                >
                  <div className="m-auto font-semibold text-xs break-words">
                    CHANGE AVATAR
                  </div>
                  <input
                    name="avatar"
                    type="file"
                    id="formId"
                    hidden
                    accept="image/*"
                  />
                </label>
              ) : null}
              <button className="absolute bg-dark-third p-1 rounded-full top-1 right-1">
                <RiImageEditLine className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setColor("#ED6DE3");
                (() => {
                  if (color !== "#ED6DE3") setChange(true);
                })();
              }}
              className="w-20 h-20 md:w-24 md:h-24 bg-slate-500 rounded-lg"
            >
              Default
            </button>

            <button className="w-20 h-20 md:w-24 md:h-24 bg-slate-500 rounded-lg">
              Custom
            </button>
            <button
              onClick={() => setCustomColor(!customColor)}
              className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-slate-500 col-start-2 col-span-1"
            >
              Custom Color
            </button>
          </div>
        </div>
      </div>
      {customColor && (
        <div className="absolute lg:top-1/2 top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ChromePicker
            disableAlpha={true}
            color={color}
            onChangeComplete={handleTextChange}
            className="text-xs"
          />
        </div>
      )}
      <AnimatePresence>
        {change && (
          <motion.div
            animate={{ y: -75 }}
            // transition={{ stiffness: 75 }}
            exit={{ y: 0 }}
            className="absolute h-12 md:w-96 w-80 border  lg:bottom-2 bottom-1/2 py-1 px-2 m-auto bg-dark-third flex justify-between rounded left-0 right-0"
          >
            <div className="font-semibold self-center text-sm lg:text-base">
              You have unsaved changes!
            </div>
            <div className="flex">
              <button
                onClick={() => {
                  setColor(defaultColor);
                  setChange(false);
                  setImage(null);
                  setCustomColor(false);
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

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionToProps)(CardAvatar);
