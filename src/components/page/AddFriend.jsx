import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/friendAction";
import { isValidEmail } from "../../utils/validate";
import MainPageContainer from "../MainPageContainer";

const validateInfo = (email) => {
  if (!email.trim()) return { status: false, error: "Email is missing!" };
  if (!isValidEmail.test(email))
    return {
      status: false,
      error: `We need ${email} is an valid email address!`,
    };
  return { status: true };
};

const AddFriend = ({ sendFriendInvitation }) => {
  const [mail, setMail] = useState();
  const [noti, setNoti] = useState({
    border: "dark:border-gray-600 border-gray-300",
    message: "",
  });

  const handleChangeInput = (e) => {
    setMail(e.target.value);
    setNoti({
      border: "dark:border-gray-600 border-gray-300 ",
      message: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { status, error } = validateInfo(mail);
    if (!status)
      return setNoti({
        border: "border-red-500",
        message: error,
      });
    sendFriendInvitation({ targetEmail: mail });
  };

  return (
    <MainPageContainer>
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto p-5 border-b-0.5 border-dark-third space-y-3"
      >
        <h1 className="text-white font-semibold">ADD FRIEND</h1>
        <span className="text-gray-400">
          You can add your contact with their email
        </span>
        <label
          className={"flex justify-between bg-dark-third border " + noti.border}
        >
          <input
            className={
              "p-2 w-3/4 text-sm text-gray-900 bg-gray-50 dark:bg-dark-third dark:placeholder-gray-400 dark:text-white focus:outline-none"
            }
            placeholder="example@email.com"
            maxLength="60"
            onChange={(e) => handleChangeInput(e)}
          />
          <button
            className={
              !mail
                ? "w-1/5 bg-blue-900 p-1 m-2 h-full rounded cursor-not-allowed self-center text-gray-400"
                : "w-1/5 bg-blue-500 p-1 m-2 h-full rounded self-center"
            }
            disabled={!mail}
          >
            Send Request
          </button>
        </label>
        <div className="text-xs text-red-500 select-none">{noti.message}</div>
      </form>
    </MainPageContainer>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionToProps)(AddFriend);
