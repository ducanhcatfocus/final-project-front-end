import React from "react";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const ForgetPassword = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6 mx-auto">
          <Title>Enter your email</Title>
          <FormInput label="Email" placeholder="das@email.com" name="email" />
          <Submit value="Send" />
          <div className="flex justify-between">
            <CustomLink to="/auth/signup">Sign up</CustomLink>
            <CustomLink to="/auth/login">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default ForgetPassword;
