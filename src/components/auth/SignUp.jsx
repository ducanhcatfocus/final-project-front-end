import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/auth";
import { useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/validate";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormInput from "../form/FormInput";
import Notification from "../form/Notification";
import Submit from "../form/Submit";
import Title from "../form/Title";

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

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { updateNotification, color, notification } = useNotification();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, error } = validateInfo(userInfo);
    if (!status) return updateNotification("error", error);
    const { error: err, user } = await createUser(userInfo);
    if (err) return updateNotification("error", err);
    navigate("/auth/login", { replace: true });
  };

  const { name, email, password } = userInfo;
  return (
    <div className="col-span-6 bg-dark-primary  flex justify-center items-center">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="bg-secondary rounded p-6 w-72 space-y-6 mx-auto"
        >
          <Title>Sign Up</Title>
          {notification && (
            <Notification color={color} notification={notification} />
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
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/login">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SignUp;
