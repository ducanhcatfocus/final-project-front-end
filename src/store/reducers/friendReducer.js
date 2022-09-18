const initState = {
  friends: [],
  pendingFriendInvitation: [],
  onlineUsers: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "FRIEND.SET_FRIENDS":
      return { ...state, friends: action.friends };
    case "FRIEND.SET_PENDING_INVITATION":
      return {
        ...state,
        pendingFriendInvitation: action.pendingFriendInvitation,
      };
    case "FRIEND.SET_ONLINE_USERS":
      return { ...state, onlineUsers: action.onlineUsers };
    case "FRIEND.DEFAULT":
      return initState;
    default:
      return state;
  }
};

export default reducer;
