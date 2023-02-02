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
      {pendingFriendInvitation.length === 0 && (
        <div className="text-center dark:text-gray-500 text-gray-300">
          No friend request
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {pendingFriendInvitation.map((invitation) => (
          <div
            key={invitation._id}
            className="dark:bg-dark-third bg-light-primary border-2 dark:border-dark-third rounded-t-2xl"
          >
            <img
              src={invitation.senderId.avatar}
              alt=""
              className="w-full rounded-t-2xl"
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
                className="bg-blue-500 px-3 md:px-2 lg:px-8 py-1 rounded-lg hover:bg-blue-600"
              >
                Accept
              </button>
              <button
                onClick={() => rejectInvitationHandle(invitation._id)}
                className="border px-3 py-1 rounded-lg lg:px-8 md:px-2 dark:hover:bg-slate-500 hover:bg-light-secondary"
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
