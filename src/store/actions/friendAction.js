import {
  friendRequest,
  sendFriendRequest,
  acceptFriendInvitation,
  rejectFriendInvitation,
  friends,
} from "../../api/friend";

export const getActions = (dispatch) => {
  return {
    sendFriendInvitation: (data) => dispatch(sendFriendInvitation(data)),
    friendInvitation: () => dispatch(friendInvitation()),
    friendList: () => dispatch(friendList()),
    acceptFriend: (data) => dispatch(acceptFriend(data)),
    rejectFriend: (data) => dispatch(rejectFriend(data)),
  };
};

const sendFriendInvitation = (data) => {
  return async (dispatch) => {
    const { error, message } = await sendFriendRequest(data);
    dispatch({
      type: "LOADING.SET_ERROR",
      error: {
        errorType: "FRIEND REQUEST SUCCESS",
        errorMessage: message,
      },
    });
    if (error) {
      dispatch({
        type: "LOADING.SET_ERROR",
        error: {
          errorType: "FRIEND REQUEST FAILED",
          errorMessage: error,
        },
      });
      return;
    }
  };
};

const friendInvitation = () => {
  return async (dispatch) => {
    const { error, data } = await friendRequest();
    if (error) {
      console.log(error);
      return;
    }
    dispatch({
      type: "FRIEND.SET_PENDING_INVITATION",
      pendingFriendInvitation: data,
    });
  };
};

const friendList = () => {
  return async (dispatch) => {
    const { error, data } = await friends();
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    dispatch({
      type: "FRIEND.SET_FRIENDS",
      friends: data,
    });
  };
};

const acceptFriend = (id) => {
  return async (dispatch) => {
    const { error, data } = await acceptFriendInvitation(id);
    if (error) {
      console.log(error);
      return;
    }
    // dispatch({
    //   type: "FRIEND.SET_PENDING_INVITATION",
    //   pendingFriendInvitation: data,
    // });
  };
};

const rejectFriend = (id) => {
  return async (dispatch) => {
    const { error, data } = await rejectFriendInvitation(id);
    if (error) {
      console.log(error);
      return;
    }
    // dispatch({
    //   type: "FRIEND.SET_PENDING_INVITATION",
    //   pendingFriendInvitation: data,
    // });
  };
};
