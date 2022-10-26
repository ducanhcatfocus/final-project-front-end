import React from "react";

const FriendRequest = ({
  acceptFriend,
  rejectFriend,
  pendingFriendInvitation,
}) => {
  const acceptInvitationHandler = (id) => {
    acceptFriend(id);
  };

  const rejectInvitationHandle = (id) => {
    rejectFriend(id);
  };

  return (
    <div className="w-full mx-auto px-5 pt-3 space-y-3">
      <h1 className="text-white font-semibold">FRIEND REQUESTS</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {pendingFriendInvitation.map((invitation) => (
          <div
            key={invitation._id}
            className="bg-dark-third border-2 border-dark-third rounded-t-2xl"
          >
            <img
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t1.6435-1/196816422_615325399426758_5926012258863928099_n.jpg?stp=dst-jpg_s480x480&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Q2lQ3vjRTiIAX9DrvaD&_nc_ht=scontent.fhan19-1.fna&oh=00_AT9fRJ8CNINkOgOxkn_Ar3r8HAO8__-ym3eLqtMwzdB1mQ&oe=636107AD"
              alt=""
              className="w-full"
            />
            <div className="px-5 md:px-1 truncate">
              {invitation.senderId.name}
            </div>
            <div className="px-5 md:px-1 text-gray-500 truncate">
              {invitation.senderId.email}
            </div>
            <div className="flex justify-between px-5 md:px-1 py-1">
              <button
                onClick={() => acceptInvitationHandler(invitation._id)}
                className="bg-blue-500 px-3 md:px-2 lg:px-8 py-1 rounded-lg hover:bg-blue-400"
              >
                Accept
              </button>
              <button
                onClick={() => rejectInvitationHandle(invitation._id)}
                className="border px-3 py-1 rounded-lg lg:px-8 md:px-2 hover:bg-slate-500"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequest;
