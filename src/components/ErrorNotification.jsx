import React from "react";
import { connect } from "react-redux";
import { getActions } from "../store/actions/loadingAction";

const ErrorNotification = ({ error, setDefaultError }) => {
  return (
    <div className="absolute bottom-0 right-0 h-full w-full backdrop-brightness-25 flex overflow-hidden">
      <div className="w-80 h-48 bg-dark-third m-auto flex flex-col justify-between rounded">
        <div className="h-12 text-white font-semibold rounded-t flex items-center justify-center border-b-0.5 border-gray-500">
          {error.errorType}
        </div>
        <div className="text-white text-center">{error.errorMessage}</div>
        <button
          onClick={() => setDefaultError()}
          className="px-5 py-2.5 m-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800"
        >
          Okay
        </button>
      </div>
    </div>
  );
};
const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionToProps)(ErrorNotification);
