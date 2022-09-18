import React from "react";

const TopPageContainer = ({ children }) => {
  return (
    <div className="h-12 bg-light-primary dark:bg-dark-primary border-b-0.5 border-light-third dark:border-dark-third p-2 px-3 flex flex-nowrap justify-between">
      {children}
    </div>
  );
};

export default TopPageContainer;
