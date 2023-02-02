import store from "../store/store";
import Peer from "simple-peer";
import { signalPeerData } from "./socketConnection";

const getConfig = () => {
  const turnIceServers = null;
  if (turnIceServers) {
    //TURN server
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};

const onlyAudioMedia = {
  audio: true,
  video: false,
};
const defaultMedia = {
  audio: true,
  video: true,
};

export const getLocalStreamPreview = (onlyAudio, callbackFunc) => {
  console.log(onlyAudio);
  const media = onlyAudio ? onlyAudioMedia : defaultMedia;

  navigator.mediaDevices
    .getUserMedia(media)
    .then((stream) => {
      store.dispatch({
        type: "ROOM.SET_LOCAL_STREAM",
        localStream: stream,
      });
      callbackFunc();
    })
    .catch((err) => {
      console.log(err);
      console.log("cannot access to local stream");
    });
};

let peers = {};
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStream;

  if (isInitiator) {
    console.log("prepare new peer connection as initiator");
  } else {
    console.log("prepare new peer connection as not initiator");
  }

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfig(),
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId,
    };
    signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (remoteStream) => {
    remoteStream.connUserSocketId = connUserSocketId;

    const remoteStreams = store.getState().room.remoteStreams;
    const newRemoteStreams = [...remoteStreams, remoteStream];
    store.dispatch({
      type: "ROOM.SET_REMOTE_STREAMS",
      remoteStreams: newRemoteStreams,
    });
  });
};

export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

export const closeConnection = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const connUserSocketId = mappedObject[0];
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  });
};

export const handleUserLeftRoom = (data) => {
  const { connUserSocketId } = data;
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
  );
  store.dispatch({
    type: "ROOM.SET_REMOTE_STREAMS",
    remoteStreams: newRemoteStreams,
  });
};

export const switchOutgoingTracks = (stream) => {
  console.log(stream);
  console.log(peers);
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};
