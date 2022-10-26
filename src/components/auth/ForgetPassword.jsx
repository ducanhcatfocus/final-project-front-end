import React from "react";
import CustomLink from "../form/CustomLink";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const ForgetPassword = () => {
  return (
    <div className="dark:bg-dark-primary bg-light-secondary w-full h-full grid">
      <form className="dark:bg-secondary bg-white drop-shadow-lg rounded p-6 w-72 space-y-6 mx-auto place-self-center">
        <Title>Enter your email</Title>
        <FormInput label="Email" placeholder="das@email.com" name="email" />
        <Submit value="Send" />
        <div className="flex justify-between">
          <CustomLink to="/auth/signup">Sign up</CustomLink>
          <CustomLink to="/auth/login">Sign in</CustomLink>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
