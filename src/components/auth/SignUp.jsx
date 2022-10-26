import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/auth";
import { isValidEmail } from "../../utils/validate";
import CustomLink from "../form/CustomLink";
import FormInput from "../form/FormInput";
import Notification from "../form/Notification";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authAction";

const validateInfo = ({ name, password, email }) => {
  if (!name.trim()) return { status: false, error: "Name is missing!" };
  if (!/^[a-z A-Z]+$/.test(name))
    return { status: false, error: "Name is invalid!" };
  if (!email.trim()) return { status: false, error: "Email is missing!" };
  if (!isValidEmail.test(email))
    return { status: false, error: "Email is invalid!" };
  if (!password.trim()) return { status: false, error: "Password is missing!" };
  if (password.length < 6)
    return {
      status: false,
      error: "Password must contains at least 6 characters",
    };
  return { status: true };
};

const SignUp = ({ error, setError }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, error } = validateInfo(userInfo);
    if (!status) {
      setError(error);
      return;
    }
    const { error: err, user } = await createUser(userInfo);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    navigate("/auth/login", { replace: true });
  };

  const { name, email, password } = userInfo;
  return (
    <div className="dark:bg-dark-primary bg-light-secondary w-full h-full grid">
      <form
        onSubmit={handleSubmit}
        className="dark:bg-secondary bg-white drop-shadow-lg rounded p-6 w-72 space-y-6 mx-auto place-self-center"
      >
        <Title>Sign Up</Title>
        {error && (
          <Notification color={"border-red-500"} notification={error} />
        )}
        <FormInput
          value={name}
          label="Name"
          placeholder="Das Doe"
          name="name"
          onChange={handleChange}
        />
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
          onChange={handleChange}
        />
        <Submit value="Sign Up" />
        <div className="flex justify-between">
          <div className="text-gray-300">Already have an account?</div>
          <CustomLink to="/auth/login">Log in</CustomLink>
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

export default connect(mapStateToProps, mapActionToProps)(SignUp);
