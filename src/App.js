import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import Navbar from "./components/user/Navbar";
import Sidebar from "./components/user/Sidebar";
import Rightbar from "./components/user/Rightbar";

import ConfirmPassword from "./components/auth/ConfirmPassword";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import NotFound from "./components/NotFound";
import Main from "./components/page/Main";
import AddFriend from "./components/page/AddFriend";
import Inbox from "./components/page/Inbox";
import SendDocument from "./components/page/SendDocument";
import MyFlow from "./components/page/MyFlow";
import MyDocument from "./components/page/MyDocument";
import Document from "./components/page/Document";
import RecievedDocument from "./components/page/RecievedDocument";
import Chatbox from "./components/page/Chatbox";
import ErrorNotification from "./components/ErrorNotification";
import Messages from "./components/page/Messages";
import Profile from "./components/page/Profile";
import UserProfile from "./components/page/userProfile";
import CreateRoom from "./components/page/CreateRoom";
import Room from "./components/page/Room";
import JoinRoom from "./components/page/JoinRoom";
import { getActions } from "./store/actions/authAction";

function App({ user, chosenChatDetails, error, isAuth, loading }) {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      navigate("/auth/login");
      return;
    }
    isAuth(token);
    if (location.pathname.slice(0, 5) === "/auth") {
      navigate("/");
    }
  }, [isAuth]);
  return (
    <div className="h-screen w-screen dark:bg-primary bg-light-secondary ">
      <Navbar />
      <div className="grid grid-cols-6 h-[calc(100%_-_3.5rem)] max-w-screen-2xl">
        {location.pathname.slice(0, 5) !== "/auth" && <Sidebar />}
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/add-friend" element={<AddFriend />} />
          <Route exact path="/send-document" element={<SendDocument />} />
          <Route exact path="/my-document" element={<MyDocument />} />
          <Route exact path="/document/:documentId" element={<Document />} />
          <Route
            exact
            path="/received-document/:documentId"
            element={<RecievedDocument />}
          />
          <Route exact path="/inbox" element={<Inbox />} />
          <Route exact path="/flow" element={<MyFlow />} />
          <Route exact path="/messages" element={<Messages />} />
          <Route exact path="/my-profile" element={<Profile user={user} />} />
          <Route exact path="/profile/:userId" element={<UserProfile />} />
          <Route exact path="/create-room" element={<CreateRoom />} />
          <Route exact path="/join-room" element={<JoinRoom />} />
          <Route exact path="/room" element={<Room />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/verification" element={<EmailVerification />} />
          <Route path="/auth/forget-password" element={<ForgetPassword />} />
          <Route path="/auth/confirm-password" element={<ConfirmPassword />} />
        </Routes>
        {chosenChatDetails &&
          location.pathname !== "/messages" &&
          location.pathname.slice(0, 8) !== "/profile" && <Chatbox />}
        {error && <ErrorNotification error={error} />}
        {location.pathname.slice(0, 5) !== "/auth" && <Rightbar />}
      </div>
    </div>
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
