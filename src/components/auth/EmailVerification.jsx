import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../api/auth";
import Notification from "../form/Notification";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { AiOutlineClose } from "react-icons/ai";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authAction";

const otp_length = 6;

const isValidOTP = (otp) => {
  let valid = false;
  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

const EmailVerification = ({ error, setError }) => {
  const [otp, setOtp] = useState(new Array(otp_length).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [success, setSuccess] = useState(false);

  const inputRef = useRef();

  const { state } = useLocation();

  const navigate = useNavigate();

  const user = state?.user;
  console.log(user);

  useEffect(() => {
    if (!user) navigate("/not-found");
  }, [user]);

  const moveToNextIndex = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const moveToPreviousIndex = (index) => {
    let nextIndex;
    const checkIndex = index - 1;
    nextIndex = checkIndex !== 0 ? checkIndex : 0;
    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];
    console.log(value);
    newOtp[index] = value.substring(value.length - 1, value.length);
    console.log({ value: value, index: index });

    if (!value) moveToPreviousIndex(index);
    else moveToNextIndex(index);
    setOtp([...newOtp]);
  };

  const handleKeyDown = ({ key }, index) => {
    if (key === "Backspace") {
      moveToPreviousIndex(index);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(otp);

    if (!isValidOTP(otp)) {
      setError("Invalid Otp! Please try again!");
      return;
    }
    const {
      error,
      message,
      user: userResponse,
    } = await verifyEmail({
      OTP: otp.join(""),
      userId: user.id,
    });
    if (error) {
      setError(error);
      return;
    }
    setSuccess(true);
    localStorage.setItem("auth-token", userResponse.token);
    setTimeout(() => {
      navigate("/auth/login");
    }, 4000);
    // isAuth();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);
  return (
    <div
      onSubmit={handleSubmit}
      className="dark:bg-dark-primary bg-light-secondary w-full h-full grid"
    >
      <form className="dark:bg-secondary bg-white drop-shadow-lg rounded p-6  space-y-6 mx-auto place-self-center">
        <button
          onClick={() => navigate("/auth/login")}
          className="absolute top-1 right-1 dark:text-white text-primary p-1 border-0.5 dark:hover:border-white border-dark-third rounded-full"
        >
          <AiOutlineClose className="h-5 w-5" />
        </button>
        <div>
          <Title>Enter your OTP to verify your account</Title>
          <p className="text-center dark:text-dark-subtle text-primary">
            OTP has been sent to your email
          </p>
        </div>
        <div className="flex justify-center items-center space-x-4">
          {otp.map((_, index) => {
            return (
              <input
                key={index}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                value={otp[index] || ""}
                ref={activeOtpIndex === index ? inputRef : null}
                type="number"
                className="w-12 h-12 border-2 rounded dark:border-dark-subtle dark:focus:border-white bg-transparent outline-none text-center dark:text-white font-semibold text-xl spin-button-none text-primary"
              />
            );
          })}
        </div>
        {error && <Notification color="border-red-500" notification={error} />}
        {success && (
          <Notification
            color="border-green-500"
            notification="Email verified! Please wait 5s to redirect"
          />
        )}
        <Submit value="Send" />
      </form>
    </div>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

export default connect(mapStateToProps, mapActionToProps)(EmailVerification);
