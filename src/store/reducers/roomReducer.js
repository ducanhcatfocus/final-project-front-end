const initState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  roomMessages: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "ROOM.OPEN_ROOM":
      return {
        ...state,
        isUserInRoom: action.isUserInRoom,
        isUserRoomCreator: action.isUserRoomCreator,
      };
    case "ROOM.SET_ROOM_DETAILS":
      return {
        ...state,
        roomDetails: action.roomDetails,
      };
    case "ROOM.SET_ACTIVE_ROOMS":
      return {
        ...state,
        activeRooms: action.activeRooms,
      };
    case "ROOM.SET_MESSAGE":
      return {
        ...state,
        roomMessages: [...state.roomMessages, action.roomMessages],
      };

    case "ROOM.SET_LOCAL_STREAM":
      return {
        ...state,
        localStream: action.localStream,
      };

    case "ROOM.SET_AUDIO_ONLY":
      return {
        ...state,
        audioOnly: action.audioOnly,
      };
    case "ROOM.SET_REMOTE_STREAMS":
      return {
        ...state,
        remoteStreams: action.remoteStreams,
      };

    case "ROOM.SET_SCREEN_SHARE_STREAM":
      return {
        ...state,
        isScreenSharingActive: action.isScreenSharingActive,
        screenSharingStream: action.screenSharingStream,
      };
    case "ROOM.RESET_STATE":
      return initState;
    default:
      return state;
  }
};

export default reducer;
