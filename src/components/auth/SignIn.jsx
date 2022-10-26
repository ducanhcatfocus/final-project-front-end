import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authAction";
import { isValidEmail } from "../../utils/validate";
import CustomLink from "../form/CustomLink";
import FormInput from "../form/FormInput";
import Notification from "../form/Notification";
import Submit from "../form/Submit";
import Title from "../form/Title";

const validateInfo = ({ password, email }) => {
  if (!email.trim()) return { status: false, error: "Email is missing!" };
  if (!isValidEmail.test(email))
    return { status: false, error: "Email is invalid!" };
  if (!password.trim()) return { status: false, error: "Password is missing!" };
  return { status: true };
};

const SignIn = ({ login, isPending, error, setError }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { email, password } = userInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, error } = validateInfo(userInfo);
    console.log(error);
    if (!status) {
      setError(error);
      return;
    }
    setError(null);
    login({ email: userInfo.email, password: userInfo.password }, navigate);
  };

  return (
    <div className="dark:bg-dark-primary bg-light-secondary w-full h-full grid">
      <form
        onSubmit={handleSubmit}
        className="dark:bg-secondary bg-white drop-shadow-lg rounded p-6 w-72 space-y-6 mx-auto place-self-center"
      >
        <Title>Sign In</Title>
        {error && <Notification color="border-red-500" notification={error} />}
        <FormInput
          value={email}
          label="Email"
          placeholder="das@email.com"
          name="email"
          onChange={handleChange}
        />
        <FormInput
          value={password}
          label="Password"
          placeholder="********"
          name="password"
          type="password"
          autoComplete="on"
          onChange={handleChange}
        />
        <Submit value="Login" loading={isPending} />
        <div className="flex justify-between">
          <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
          <CustomLink to="/auth/signup">Sign up</CustomLink>
        </div>
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

export default connect(mapStateToProps, mapActionToProps)(SignIn);
