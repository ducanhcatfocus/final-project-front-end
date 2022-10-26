import React from "react";
import CustomLink from "../form/CustomLink";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const ConfirmPassword = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <form className="bg-secondary rounded p-6 w-96 space-y-6 mx-auto">
        <Title>Enter New Password</Title>
        <FormInput
          label="New Password"
          placeholder="********"
          name="password"
          type="password"
        />
        <FormInput
          label="Confirm Password"
          placeholder="*******"
          name="confirmPassword"
          type="password"
        />

        <Submit value="Save" />
      </form>
    </div>
  );
};

export default ConfirmPassword;
