import io from "socket.io-client";
import store from "../store/store";
import {
  prepareNewPeerConnection,
  handleSignalingData,
  handleUserLeftRoom,
} from "./webRTCHandle";

export let socket = null;

const socketURL =
  process.env.REACT_APP_NOT_SECRET_CODE === "production"
    ? "https://warm-garden-25129.herokuapp.com"
    : "http://localhost:5000";

export const connectWithSocketServer = (token) => {
  console.log(token);
  // const jwtToken = user?.token;
  socket = io(socketURL, {
    auth: {
      token,
    },
  });

  socket.on("connect", () => {
    console.log("successfully connected");
    console.log(socket.id);
  });

  socket.on("friend-invitation", (data) => {
    const { pending } = data;
    store.dispatch({
      type: "FRIEND.SET_PENDING_INVITATION",
      pendingFriendInvitation: pending,
    });
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    store.dispatch({
      type: "FRIEND.SET_FRIENDS",
      friends,
    });
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch({
      type: "FRIEND.SET_ONLINE_USERS",
      onlineUsers,
    });
  });

  socket.on("update-chat", (data) => {
    console.log(data);
    const isChosenChat = store.getState().chat.chosenChatDetails;
    const user = store.getState().auth.user;
    const conversations = store.getState().chat.conversations;

    console.log(isChosenChat);
    if (isChosenChat?.id === data.author._id || user.id === data.author._id) {
      store.dispatch({
        type: "CHAT.UPDATE_MESSAGES",
        message: data,
      });
      store.dispatch({
        type: "CHAT.SET_LOADING",
        loading: false,
      });
    }
    if (user.id !== data.author._id) {
      store.dispatch({
        type: "CHAT.SET_NEW_MESSAGE",
      });
    }
  });

  socket.on("update-typing", (data) => {
    console.log(data);
    const { id, type } = data;
    const isChosenChat = store.getState().chat.chosenChatDetails;
    if (isChosenChat?.id === id) {
      store.dispatch({
        type: "CHAT.SET_TYPING",
        typing: type,
      });
    }
  });

  socket.on("room-create", (data) => {
    console.log(data);
    store.dispatch({
      type: "ROOM.SET_ROOM_DETAILS",
      roomDetails: data,
    });
  });

  socket.on("active-rooms", (data) => {
    const { activeRooms } = data;
    console.log(activeRooms);
    const rooms = [];
    const friends = store.getState().friend.friends;
    const userId = store.getState().auth.user.id;
    activeRooms.forEach((room) => {
      if (room.roomCreator.userId === userId) {
        rooms.push(room);
      }
      friends.forEach((f) => {
        if (f._id === room.roomCreator.userId && !room.roomPrivate) {
          rooms.push(room);
          alert(
            "A friend create a room" + ":" + store.getState().auth.user.name
          );
        }
      });
    });

    store.dispatch({
      type: "ROOM.SET_ACTIVE_ROOMS",
      activeRooms: rooms,
    });
  });

  socket.on("join-room", (data) => {
    store.dispatch({
      type: "ROOM.SET_ROOM_DETAILS",
      roomDetails: data,
    });
  });

  socket.on("update-chat-room", (data) => {
    data.time = new Date().toLocaleTimeString("en-IT");
    store.dispatch({
      type: "ROOM.SET_MESSAGE",
      roomMessages: data,
    });
  });

  socket.on("update-rooms", (data) => {
    store.dispatch({
      type: "ROOM.SET_ACTIVE_ROOMS",
      activeRooms: data,
    });
  });

  socket.on("conn-prepare", (data) => {
    console.log("prepare", data);
    const { connUserSocketId } = data;
    prepareNewPeerConnection(connUserSocketId, false);
    socket.emit("conn-init", { connUserSocketId });
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("conn-signal", (data) => {
    handleSignalingData(data);
  });

  socket.on("room-participant-left", (data) => {
    console.log("User left room");
    handleUserLeftRoom(data);
  });

  socket.on("join-room-error", (data) => {
    console.log(data);
    const localStream = store.getState().room.localStream;
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      store.dispatch({
        type: "ROOM.SET_LOCAL_STREAM",
        localStream: null,
      });
    }
    alert(data);
  });
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const sendDirectMessage = (data) => {
  console.log(data);
  socket.emit("direct-message", data);
};

export const typingMessage = (data) => {
  socket.emit("typing", data);
};

export const createRoom = (data) => {
  socket.emit("room-create", data);
};

export const joinRoom = (data) => {
  socket.emit("room-join", data);
};

export const leaveRoom = (data) => {
  socket.emit("room-leave", data);
};

export const sendChatRoom = (data) => {
  socket.emit("chat-room", data);
};

export const updateRoomChat = () => {
  socket.emit("update-chat-room");
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};

///function

const getUserInfoInRoom = () => {};
