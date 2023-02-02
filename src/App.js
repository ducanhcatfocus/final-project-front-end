import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";

import ConfirmPassword from "./components/auth/ConfirmPassword";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import NotFound from "./components/NotFound";

import ErrorNotification from "./components/ErrorNotification";

import { getActions } from "./store/actions/authAction";

//test
import Navbar from "./components/b_navbar/Navbar";
import TopBar from "./components/b_topbar/TopBar";
import RightBar from "./components/b_rightbar/RightBar";
import AddFriend from "./components/add-friend/AddFriend";
import Profile from "./components/profile/Profile";
import UserProfile from "./components/profile_friend/UserProfile";
import CreateRoom from "./components/room_create/CreateRoom";
import JoinRoom from "./components/room_join/JoinRoom";
import Room from "./components/room/Room";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatMenu from "./components/chat-menu/ChatMenu";
import Notification from "./components/notification/Notification";
import Compose from "./components/document/compose/Compose";
import Inbox from "./components/document/inbox/Inbox";
import SendDocument from "./components/document/send/SendDocument";
import Document from "./components/document/document-view/Document";
import ChatFullscreen from "./components/message/chat_fullscreen/ChatFullscreen";
import ChatBox from "./components/message/chat_box/ChatBox";
import Guild from "./components/guild/Guild";

function App({ user, chosenChatDetails, error, isAuth, conversations }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [toggleFriend, setToggleFriend] = useState(true);
  const [toggleChat, setToggleChat] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      navigate("/auth/login");
      return;
    }
    isAuth(token);
    if (location.pathname.slice(0, 5) === "/auth") {
      navigate("/send-document");
    }
  }, [isAuth]);
  return (
    <>
      {location.pathname.slice(0, 5) !== "/auth" && user ? (
        <div className="flex flex-col md:max-h-screen md:h-screen text-dark-primary dark:text-white h-screen dark:bg-dark-primary">
          <Navbar
            setToggleFriend={setToggleFriend}
            toggleFriend={toggleFriend}
            toggleChat={toggleChat}
            setToggleChat={setToggleChat}
            conversations={conversations}
            toggleNotification={toggleNotification}
            setToggleNotification={setToggleNotification}
          />
          <div
            className={
              location.pathname != "/room"
                ? "w-full flex flex-col md:flex-row md:space-y-0 h-full md:max-h-[calc(100%_-_6rem)]"
                : "w-full flex flex-col md:flex-row md:space-y-0 h-full md:max-h-[calc(100%_-_3rem)]"
            }
          >
            <div
              className={
                toggleFriend
                  ? "md:w-2/3 lg:w-3/4 flex flex-col"
                  : "w-full flex flex-col"
              }
            >
              <TopBar />
              <div className="dark:bg-dark-secondary bg-light-fourth h-full overflow-auto overflow-y-auto md:scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 border-0.5 dark:border-dark-third">
                <Routes>
                  <Route exact path="/" element={<Guild />} />
                  <Route exact path="/add-friend" element={<AddFriend />} />
                  <Route
                    exact
                    path="/my-profile"
                    element={<Profile user={user} />}
                  />
                  <Route
                    exact
                    path="/profile/:userId"
                    element={<UserProfile />}
                  />
                  <Route exact path="/create-room" element={<CreateRoom />} />
                  <Route exact path="/join-room" element={<JoinRoom />} />
                  <Route exact path="/room" element={<Room />} />
                  <Route exact path="/compose" element={<Compose />} />
                  <Route
                    exact
                    path="/inbox"
                    element={<Inbox email={user.email} />}
                  />
                  <Route
                    exact
                    path="/send-document"
                    element={<SendDocument />}
                  />
                  <Route
                    exact
                    path="/document/:documentId"
                    element={<Document email={user.email} />}
                  />
                  <Route
                    exact
                    path="/messages"
                    element={<ChatFullscreen toggleFriend={toggleFriend} />}
                  />
                  <Route exact path="/guild" element={<Guild />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>

            <AnimatePresence>
              {toggleFriend && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="md:w-1/3 lg:w-1/4 h-full md:h-full lg:h-full "
                >
                  <RightBar />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {toggleChat && (
            <ChatMenu
              user={user}
              chosenChatDetails={chosenChatDetails}
              conversations={conversations}
              setToggleChat={setToggleChat}
            />
          )}
          {toggleNotification && <Notification />}
          {location.pathname !== "/room" && (
            <footer className="dark:bg-dark-primary bg-light-primary p-1 h-12">
              {/* <h1 className="text-2xl md:text-4xl text-white">Footer</h1> */}
            </footer>
          )}
          {chosenChatDetails &&
            location.pathname !== "/messages" &&
            location.pathname.slice(0, 8) !== "/profile" && <ChatBox />}
          {error && <ErrorNotification error={error} />}
        </div>
      ) : (
        <div className="flex flex-col md:max-h-screen  md:h-screen text-white">
          <Routes>
            <Route path="/auth/login" element={<SignIn />} />
            <Route path="/auth/login" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/verification" element={<EmailVerification />} />
            <Route path="/auth/forget-password" element={<ForgetPassword />} />
            <Route
              path="/auth/confirm-password"
              element={<ConfirmPassword />}
            />
          </Routes>
        </div>
      )}
    </>
  );
}

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStateToProps = ({ auth, chat, loading }) => {
  return {
    ...auth,
    ...chat,
    ...loading,
  };
};
export default connect(mapStateToProps, mapActionToProps)(App);
