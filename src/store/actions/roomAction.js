export const getActions = (dispatch) => {
  return {
    setAudioOnly: (onlyAudio) => dispatch(setAudioOnly(onlyAudio)),
    setScreenShareStream: (stream) => dispatch(setScreenShareStream(stream)),
  };
};

export const setAudioOnly = (audioOnly) => {
  return {
    type: "ROOM.SET_AUDIO_ONLY",
    audioOnly,
  };
};

export const setScreenShareStream = (stream) => {
  return {
    type: "ROOM.SET_SCREEN_SHARE_STREAM",
    isScreenSharingActive: stream ? true : false,
    screenSharingStream: stream || null,
  };
};
