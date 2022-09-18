import React from "react";
import { connect } from "react-redux";
import Footer from "./user/Footer";

const MainPageContainer = ({ children }) => {
  return (
    <div
      className={`col-span-4 bg-light-secondary dark:bg-dark-secondary  border-x-0.5 border-light-third dark:border-dark-third text-dark-secondary dark:text-white overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100`}
    >
      <div className="flex flex-col justify-between h-full">
        {children}
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStateToProps)(MainPageContainer);
