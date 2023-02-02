import React, { useState } from "react";
import MainPageContainer from "../MainPageContainer";
import { AiOutlineUser } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import CardAbout from "./CardAbout";
import CardInfo from "./CardInfo";
import CardContact from "./CardContact";
import { useEffect } from "react";
import { getProfile } from "../../api/user";
import CardAvatar from "./CardAvatar";

const Profile = ({ user }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    (async () => {
      const { profile } = await getProfile(user.id);
      setUserProfile(profile);
    })();
  }, []);

  return (
    <div className="gap-6 p-6 h-full relative auto-rows-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-hidden ">
      <div className="col-span-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-150 rounded h-64">
        <motion.div
          layoutId="about-me"
          onClick={() => setSelectedId("about-me")}
          className="dark:bg-dark-third bg-light-primary rounded p-2 pb-2 h-full"
        >
          <div className="font-semibold mb-1">ABOUT ME</div>
          <div className="whitespace-normal break-all text-sm font-light">
            {userProfile.about !== "" ? (
              <>{userProfile.about}</>
            ) : (
              <div>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dzhpyrb7b/image/upload/v1660484445/default/NicePng_funny-cat-png_10122537_gnsufj.png"
                />
                <div className="text-center text-xs text-gray-400">
                  Click to add some
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-150 rounded h-64">
        <motion.div
          layoutId="preview"
          onClick={() => setSelectedId("preview")}
          className="dark:bg-dark-third bg-light-primary rounded h-full relative"
        >
          <div
            className="h-1/2 w-full rounded"
            style={{
              backgroundColor: userProfile.background,
            }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src={user?.avatar}
              alt=""
              className="lg:h-32 lg:w-32 md:h-28 md:w-28 h-32 w-32 rounded-full border-8 border-dark-third "
            />
            <div className="text-center text-xl font-semibold ">
              {user?.name}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-150 rounded h-64">
        <motion.div
          layoutId="intro"
          onClick={() => setSelectedId("intro")}
          className="dark:bg-dark-third bg-light-primary rounded p-2 pb-2 h-full"
        >
          <div className="font-semibold mb-1">INTRODUCTION</div>

          {userProfile.firstName !== "" ? (
            <div className="flex justify-between">
              <div className="whitespace-normal break-all font-light">
                <div className="mb-4">
                  <AiOutlineUser />
                  <div>First Name: {userProfile.firstName}</div>
                  <div>Last Name: {userProfile.lastName}</div>
                  <div>Gender: {userProfile.gender}</div>
                </div>
                <div>
                  <FaBirthdayCake />
                  <div>
                    Birth Date: {userProfile.month} {userProfile.day}
                  </div>
                  <div>Birth Year: {userProfile.year}</div>
                </div>
              </div>
              <img
                className="w-1/2"
                alt=""
                src="https://res.cloudinary.com/dzhpyrb7b/image/upload/v1660484445/default/NicePng_funny-cat-png_10122537_gnsufj.png"
              />
            </div>
          ) : (
            <div>
              <img
                className="w-1/2"
                alt=""
                src="https://res.cloudinary.com/dzhpyrb7b/image/upload/v1660484445/default/NicePng_funny-cat-png_10122537_gnsufj.png"
              />
              <div className="text-center text-xs text-gray-400">
                Click to add some
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-150 rounded h-64">
        <motion.div
          layoutId="contact"
          onClick={() => setSelectedId("contact")}
          className="dark:bg-dark-third bg-light-primary rounded p-2 pb-2 h-full"
        >
          <div className="font-semibold mb-1">CONTACT</div>
          {userProfile.phoneNumber !== "" ? (
            <div className="flex justify-between">
              <div className="whitespace-normal break-all font-light">
                <div>Phone Number: {userProfile.phoneNumber}</div>
                <div>Address: {userProfile.address}</div>
              </div>
              <img
                className="w-1/2"
                alt=""
                src="https://res.cloudinary.com/dzhpyrb7b/image/upload/v1660484445/default/NicePng_funny-cat-png_10122537_gnsufj.png"
              />
            </div>
          ) : (
            <div>
              <img
                className="w-1/2"
                alt=""
                src="https://res.cloudinary.com/dzhpyrb7b/image/upload/v1660484445/default/NicePng_funny-cat-png_10122537_gnsufj.png"
              />
              <div className="text-center text-xs text-gray-400">
                Click to add some
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId}
            className="absolute  bottom-0 right-0 h-full w-full backdrop-brightness-50 flex"
          >
            {selectedId === "about-me" && (
              <CardAbout
                about={userProfile.about}
                setSelectedId={setSelectedId}
                setUserProfile={setUserProfile}
                userProfile={userProfile}
              />
            )}
            {selectedId === "intro" && (
              <CardInfo
                setSelectedId={setSelectedId}
                setUserProfile={setUserProfile}
                userProfile={userProfile}
              />
            )}
            {selectedId === "contact" && (
              <CardContact
                setSelectedId={setSelectedId}
                setUserProfile={setUserProfile}
                userProfile={userProfile}
                email1={user.email}
              />
            )}
            {selectedId === "preview" && (
              <CardAvatar
                setSelectedId={setSelectedId}
                setUserProfile={setUserProfile}
                avatar={user.avatar}
                userProfile={userProfile}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
