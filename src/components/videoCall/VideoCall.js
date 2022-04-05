import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import "./videoCall.css";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
const socket = io.connect("http://localhost:3001");

export default function VideoCall(props) {
  const { EmployeeReducer } = useSelector((state) => state);
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [redirectOrNo, setredirectOrNo] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [empToCall, setEmpToCall] = useState({});
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const callUser = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: empToCall._id,
        signalData: data,
        from: EmployeeReducer.connectedEmployee._id,
        name: EmployeeReducer.connectedEmployee.userName,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };
  useEffect(() => {
    setEmpToCall(props.location.state.empToCall);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
    socket.on("me", (id) => {
      setMe(id);
    });
    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      // setName(data.name);
      setName(EmployeeReducer.connectedEmployee.userName);
      setCallerSignal(data.signal);
    });
  }, []);
  console.log("me",me)
  //unmount
  useEffect(() => () => console.log("unmount"), []);

  useEffect(() => {
    socket.emit("persistIdEmployee", {
      me: me,
      name: EmployeeReducer.connectedEmployee.userName,
      id: EmployeeReducer.connectedEmployee._id,
    });
  }, [me]);
  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };
  const declineCall = () => {
    setCallEnded(true);
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    setredirectOrNo(true)
  };
  // console.log("emppp", empToCall)
  return (
    <main id="idVIID">
      <div className="main__container">
        <div className="bodyVideo">
          <div className="side__img ">
            <img src={logo} className="img_video " alt="logo" />
            <h2 style={{ textAlign: "center", color: "#fff" }}>OnTime</h2>
            {/* <h4 style={{ textAlign: "center", color: "#fff" }}>Please Confirm Call</h4>
            <div className="call-button" style={{ textAlign: "center"}}>
                {callAccepted && !callEnded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={leaveCall}
                  >
                    End Call
                  </Button>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="call"
                    onClick={() => callUser()}
                  >
                    <PhoneIcon fontSize="large" />
                  </IconButton>
                )}
              </div> */}
          </div>

          <div className="container-video">
            <div className="video-container">
              <div className="video">
                {stream && (
                  <video
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                    className="stream-video "
                  />
                )}
              </div>
              <div className="video">
                {callAccepted && !callEnded ? (
                  <video
                    playsInline
                    ref={userVideo}
                    autoPlay
                    className="stream-video "
                  />
                ) : null}
              </div>
            </div>
            <div className="myId">
              {/* <TextField
                id="filled-basic"
                label="Name"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: "20px" }}
              /> */}
              {/* <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AssignmentIcon fontSize="large" />}
                >
                  Copy ID
                </Button>
              </CopyToClipboard> */}

              <div className="call-button">
                {callAccepted && !callEnded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={leaveCall}
                  >
                    End Call
                  </Button>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="call"
                    onClick={() => callUser()}
                  >
                    <PhoneIcon fontSize="large" />
                  </IconButton>
                )}
              </div>
            </div>
            <div>
              {receivingCall && !callAccepted && !callEnded ? (
                <div className="card-call">
                  <div className="header-call">
                    <div className="animation-call">
                      <span className="icon ring"></span>
                      <div className="cercle one"></div>
                      <div className="cercle two"></div>
                      <div className="cercle three"></div>
                    </div>

                    <p className="phoneNumber">{name}</p>
                    <p className="calling">Calling</p>
                  </div>

                  <div className="footer-call">
                    <div
                      className="bouton-call raccrocher"
                      onClick={declineCall}
                    >
                      <span className="icon red"></span>
                    </div>
                    <div className="bouton-call decrocher" onClick={answerCall}>
                      <span className="icon green"></span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {redirectOrNo ? (
          <Redirect to="/home/chat" />
        ) : (null)
        }
    </main>
  );
}
