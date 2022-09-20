import store from "../store/store";
import { createRoom, joinRoom, leaveRoom } from "./socketConnection";
import { closeConnection, getLocalStreamPreview } from "./webRTCHandle";

export const createNewRoom = (roomInfo) => {
  const successCallbackFunc = () => {
    store.dispatch({
      type: "ROOM.OPEN_ROOM",
      isUserInRoom: true,
      isUserRoomCreator: true,
    });
    createRoom(roomInfo);
  };
  const onlyAudio = store.getState().room.audioOnly;
  getLocalStreamPreview(onlyAudio, successCallbackFunc);
};

export const joinARoom = (joinInfo) => {
  const successCallbackFunc = () => {
    // store.dispatch({
    //   type: "ROOM.RESET_STATE",
    // });
    store.dispatch({
      type: "ROOM.OPEN_ROOM",
      isUserInRoom: true,
      isUserRoomCreator: false,
    });
    joinRoom(joinInfo);
  };
  const onlyAudio = store.getState().room.audioOnly;

  getLocalStreamPreview(onlyAudio, successCallbackFunc);
};

export const leaveARoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;
  const localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch({
      type: "ROOM.SET_LOCAL_STREAM",
      localStream: null,
    });
  }
  const screenSharingStream = store.getState().room.screenSharingStream;
  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach((track) => track.stop());
    store.dispatch({
      type: "ROOM.SET_SCREEN_SHARE_STREAM",
      isScreenSharingActive: false,
      screenSharingStream: null,
    });
  }
  closeConnection();
  leaveRoom({ roomId });
  store.dispatch({
    type: "ROOM.RESET_STATE",
  });
};
