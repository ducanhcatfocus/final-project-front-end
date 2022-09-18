import React from "react";

const SecondViewDocument = ({ name, email, other, receiverId }) => {
  return (
    <div className="flex justify-between p-5">
      <img
        src="https://images-ext-1.discordapp.net/external/O_dgrLJaz7Z0dsIdHS4g7aVZ3L9YiC6ZBVklzonvLZ8/%3Fv%3D1/https/cdn.discordapp.com/emojis/699216226714648637.png"
        className="rounded-full p-1 w-12 h-12"
      />
      <div className="grid grid-rows-2 grid-flow-col mr-auto">
        <span className="flex-1 ml-1 whitespace-nowrap font-semibold col-span-2">
          {name}
        </span>
        <span className="flex-1 ml-1 whitespace-nowrap font-light col-span-2">
          {email}
        </span>
      </div>
      {other === 1 ? (
        <div>To: {receiverId}</div>
      ) : (
        <div>
          To: {receiverId}, and {other - 1} others
        </div>
      )}
    </div>
  );
};

export default SecondViewDocument;
