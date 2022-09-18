import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../../api/user";
import { AiOutlineUser } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/chatAction";

const UserProfile = ({ friends, setChosenChatDetails }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [tag, setTag] = useState("about");
  const [mutualFriends, setMutualFriends] = useState([]);

  const navigate = useNavigate();
  const { userId } = useParams();
  const ref = useRef();

  console.log(userProfile);

  useEffect(() => {
    (async () => {
      const { profile } = await getProfile(userId);
      setTag("about");
      setUserProfile(profile);
    })();
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        navigate(-1);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [ref, navigate]);

  const handleChooseActiveConversation = () => {
    setChosenChatDetails(
      {
        id: userProfile.user._id,
        name: userProfile.user.name,
        avatar: userProfile.user.avatar,
      },
      "DIRECT"
    );
    navigate("/messages");
  };
  return (
    <div className="absolute bottom-0 right-0 h-full w-full backdrop-brightness-25 flex text-white">
      {userProfile ? (
        <div
          ref={ref}
          className="w-1/2 h-3/4 bg-dark-third m-auto flex flex-col justify-between rounded"
        >
          <div
            className="h-1/3  font-semibold rounded-t flex items-center justify-center border-b-0.5 border-gray-500 relative"
            style={{
              backgroundColor: userProfile.background,
            }}
          >
            <div className="absolute bottom-0 left-5  translate-y-1/2">
              <img
                src={userProfile.user.avatar}
                alt=""
                className="h-32 w-32 rounded-full border-8 border-dark-third "
              />
            </div>
          </div>
          <div className="font-semibold flex justify-end p-5">
            <button
              onClick={handleChooseActiveConversation}
              className="bg-green-700 text-sm p-1 mr-2 rounded "
            >
              Message
            </button>
            <button className="bg-red-500 text-sm p-1 rounded">Remove</button>
          </div>
          <div className="mb-auto mx-5">
            <div className="font-semibold mb-5">
              <div className="text-start">{userProfile.user.name}</div>
              <div className="text-start text-sm text-gray-400">
                #{userProfile.user.email}
              </div>
            </div>
            <div className="flex justify-start gap-5 text-sm border-b-0.5 border-gray-500 text-gray-400">
              <button
                onClick={() => setTag("about")}
                className={tag === "about" ? `border-b text-white` : null}
              >
                About
              </button>
              <button
                onClick={() => setTag("info")}
                className={tag === "info" ? `border-b text-white` : null}
              >
                Information
              </button>
              <button
                onClick={() => setTag("contact")}
                className={tag === "contact" ? `border-b text-white` : null}
              >
                Contact
              </button>
              <button
                onClick={() => {
                  setTag("mutual");
                  setMutualFriends(
                    friends.filter((f) =>
                      userProfile.user.friends.includes(f._id)
                    )
                  );
                  console.log(mutualFriends);
                }}
                className={tag === "mutual" ? `border-b text-white` : null}
              >
                Mutual Friends
              </button>
            </div>
            <div className="mt-3">
              {tag === "about" && (
                <div className="break-all">
                  {userProfile.about === "" ? "None" : userProfile.about}
                </div>
              )}
              {tag === "info" && (
                <>
                  <div className="break-all">
                    <AiOutlineUser />
                    Name:
                    {userProfile.firstName === "" && userProfile.lastName === ""
                      ? "None"
                      : userProfile.firstName + " " + userProfile.lastName}
                    Gender:
                    {userProfile.gender === "" ? "None" : userProfile.gender}
                  </div>
                  <div className="break-all">
                    <FaBirthdayCake />
                  </div>
                </>
              )}
              {tag === "contact" && (
                <div className="break-all">
                  {userProfile.about === "" ? "None" : userProfile.about}
                </div>
              )}
              {tag === "mutual" && (
                <ul className="">
                  {mutualFriends === []
                    ? "None"
                    : mutualFriends.map((f) => (
                        <li
                          key={f._id}
                          className=" hover:backdrop-brightness-75 rounded"
                        >
                          <Link
                            to={`/profile/${f._id}`}
                            className="flex items-center"
                          >
                            <img
                              src={f.avatar}
                              className="rounded-full p-1 w-8 h-8 lg:w-12 lg:h-12 mr-1"
                              alt="avatar"
                            />
                            {f.name}
                            <p className="text-sm text-gray-400">#{f.email}</p>
                          </Link>
                        </li>
                      ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = ({ friend }) => {
  return {
    ...friend,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(UserProfile);
