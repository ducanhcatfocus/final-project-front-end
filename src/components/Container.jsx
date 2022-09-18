import React from "react";

const Container = ({ className, children }) => {
  return <div className={"w-full mx-auto " + className}>{children}</div>;
};

export default Container;
