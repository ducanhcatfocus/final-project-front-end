import React from "react";

const SkeLoader = ({ chatbox }) => {
  return (
    <>
      <div className="flex justify-start p-1">
        <div className="p-1">
          <div className="rounded-full p-1 w-8 h-8 bg-slate-500" />
        </div>
        <div className="grid ml-1">
          <div className="flex items-end mb-2 mt-1">
            <div className="font-semibold text-sm w-1/3 h-4 bg-slate-400 rounded-lg mr-2"></div>
            <div className="font-semibold text-sm w-1/4 h-4 bg-slate-400 rounded-lg"></div>
          </div>
          <div className="font-light text-sm break-all w-12 rounded-lg h-4 bg-slate-300 mb-1"></div>
          <div className="font-light text-sm break-all w-24 rounded-lg h-4 bg-slate-300 mb-1"></div>
          <div className="font-light text-sm break-all w-48 rounded h-36 bg-slate-300 mb-1"></div>
          <div className="font-light text-sm break-all w-36 rounded-lg h-4 bg-slate-300"></div>
        </div>
      </div>
      <div
        className={
          chatbox ? "flex justify-start p-1" : "flex justify-end p-1 mr-11"
        }
      >
        <div className="p-1">
          <div
            className={
              chatbox
                ? "rounded-full p-1 w-8 h-8 bg-slate-500"
                : "rounded-full p-1 w-8 h-8 "
            }
          />
        </div>
        <div className="grid ml-1">
          <div className="flex items-end mb-2 mt-1">
            <div className="font-semibold text-sm w-1/2 h-4 bg-slate-400 rounded-lg mr-2"></div>
            <div className="font-semibold text-sm w-1/3 h-4 bg-slate-400 rounded-lg"></div>
          </div>
          <div className="font-light text-sm break-all w-12 rounded-lg h-4 bg-slate-300 mb-1"></div>
          <div className="font-light text-sm break-all w-24 rounded-lg h-4 bg-slate-300 mb-1"></div>
          <div className="font-light text-sm break-all w-48 rounded-lg h-4 bg-slate-300 mb-1"></div>
          <div className="font-light text-sm break-all w-36 rounded-lg h-4 bg-slate-300"></div>
        </div>
      </div>
      <div
        className={
          chatbox ? "flex justify-start p-1" : "flex justify-end p-1 mr-11"
        }
      >
        <div className="p-1">
          <div
            className={
              chatbox
                ? "rounded-full p-1 w-8 h-8 bg-slate-500"
                : "rounded-full p-1 w-8 h-8 "
            }
          />
        </div>
        <div className="grid ml-1">
          <div className="flex items-end mb-2 mt-1">
            <div className="font-semibold text-sm w-1/3 h-4 bg-slate-400 rounded-lg mr-2"></div>
            <div className="font-semibold text-sm w-1/4 h-4 bg-slate-400 rounded-lg"></div>
          </div>
          <div className="font-light text-sm break-all w-12 rounded-lg h-4 bg-slate-300 mb-1"></div>
          <div className="font-light text-sm break-all w-24 rounded-lg h-4 bg-slate-300 mb-1"></div>
          <div className="font-light text-sm break-all w-48 rounded h-36 bg-slate-300 mb-1"></div>
          <div className="font-light text-sm break-all w-36 rounded-lg h-4 bg-slate-300"></div>
        </div>
      </div>
      <div className="flex justify-start p-1">
        <div className="p-1">
          <div className="rounded-full p-1 w-8 h-8 bg-slate-500" />
        </div>
        <div className="grid ml-1">
          <div className="flex items-end mb-2 mt-1">
            <div className="font-semibold text-sm w-1/2 h-4 bg-slate-400 rounded-lg mr-2"></div>
            <div className="font-semibold text-sm w-1/3 h-4 bg-slate-400 rounded-lg"></div>
          </div>
          <div className="font-light text-sm break-all w-12 rounded-lg h-4 bg-slate-300 mb-1"></div>
          <div className="font-light text-sm break-all w-24 rounded-lg h-4 bg-slate-300 mb-1"></div>
          <div className="font-light text-sm break-all w-48 rounded-lg h-4 bg-slate-300 mb-1"></div>
          <div className="font-light text-sm break-all w-36 rounded-lg h-4 bg-slate-300"></div>
        </div>
      </div>
    </>
  );
};

export default SkeLoader;
