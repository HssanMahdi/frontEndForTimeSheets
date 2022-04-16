import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import "../videoCall/videoCall.css";
import { Redirect } from "react-router-dom";

const StyledVideo = styled.video`
  height: 50%;
  width: 45%;
  margin-left: 68px;
  border-radius: 100px;
  padding-bottom: 30px;
`;

const Cont = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Test = styled.div`
  width: 10%;
  height: 10%;
  background: yellow;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};
export default function Room(props) {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const connectionRef = useRef([]);
  const [stream, setStream] = useState();
  const [redirectOrNo, setredirectOrNo] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const [screenSharingActive, setScreenSharingActive] = useState(false);
  const roomID = props.match.params.roomID;

  useEffect(() => {
    socketRef.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        setStream(stream);
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            connectionRef.current = peer;
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          connectionRef.current = peer;
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  // for (let [key, value] of peersRef.current) {
  //   // peersRef.current
  //   //   .get(key)[0]
  //   //   .peerConnection.getSenders()[1]
  //   console.log(peersRef.current.get(key)[0]);
  // }
  // peersRef.current.forEach()

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  const leaveCall = () => {
    socketRef.current.destroy();
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    setredirectOrNo(true);
  };

  const handleCameraButtonPressed = () => {
    stream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };
  const handleMicButtonPressed = () => {
    stream.getAudioTracks()[0].enabled = !microphoneEnabled;
    setMicrophoneEnabled(!microphoneEnabled);
  };

  return (
    <main id="idVIID">
      <div className="main__container">
        <div className="bodyVideo">
          <div className="side__img ">
            <img src={logo} className="img_video " alt="logo" />
            <h2 style={{ textAlign: "center", color: "#fff" }}>OnTime</h2>
          </div>
          <Cont>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
              return (
                <React.Fragment key={index}>
                  <Video peer={peer} />
                </React.Fragment>
              );
            })}
          </Cont>
          <div className="contVid">
            <button style={{ background: "#cd1212" }} className=" btn vidBtn">
              <i
                onClick={leaveCall}
                style={{ color: "white" }}
                className="bi bi-telephone-fill"
              ></i>
            </button>
            <button
              style={{ background: "rgb(46 78 190" }}
              className="btn vidBtn"
            >
              <i
                style={{ color: "white" }}
                onClick={handleCameraButtonPressed}
                className="bi bi-camera-video-off-fill"
              ></i>
            </button>
            <button
              style={{ background: "rgb(105 120 173)" }}
              className="btn vidBtn"
            >
              <i
                style={{ color: "white" }}
                onClick={handleMicButtonPressed}
                className="bi bi-mic-mute-fill"
              ></i>
            </button>
          </div>
        </div>
      </div>
      {redirectOrNo ? <Redirect to="/home/chat" /> : null}
    </main>
  );
}
