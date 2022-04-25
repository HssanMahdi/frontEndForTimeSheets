import React, { useState, Suspense, useEffect } from "react";
import AppContent from "../components/AppContent";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import "./defaultLayout.css";
import { useHistory } from "react-router-dom";
import { parse, stringify } from "flatted";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { ChatFetcher, notifications } from "../redux/actions/EmployeeActions";
import Swal from "sweetalert2";
const socket = io.connect("http://localhost:3001");

const Login = React.lazy(() =>
  import("../components/authentification/Authentification")
);
var selectedChatCompare, linkTo;
export default function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [redirectOrNot, setRedirectOrNot] = useState(false);
  const [redirectToVideo, setRedirectToVideo] = useState(false);
  const [redirectToChat, setRedirectToChat] = useState(false);
  const { EmployeeReducer } = useSelector((state) => state);
  const history = useHistory();
  const [caller, setCaller] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const config = {
    headers: {
      Authorization: `Bearer ${EmployeeReducer.token}`,
    },
  };
  const fetchChats = async () => {
    dispatch(ChatFetcher(config));
  };
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  useEffect(() => {
    if (EmployeeReducer.token.length === 0) {
      setRedirectOrNot(true);
    }
  }, []);
  // if (socket) {
  //   socket.on("calledUser", (data) => {
  //     setReceivingCall(true);
  //     setCaller(data.from);
  //     // setName(data.name);
  //     setName(data.name);
  //     setCallerSignal(data.signal);
  //   });
  // }
  const answerCall = () => {
    setRedirectToVideo(true);
    setReceivingCall(false);
    history.push(`/home/videocall/${linkTo}`);
  };
  const declineCall = () => {
    socket.emit("hangup", {
      tohangup: caller,
    });
    setReceivingCall(false);
  };
  useEffect(() => {
    console.log("mountit");
    setTimeout(() => {
      socket.emit("persistIdEmployee", {
        me: socket.id,
        name: EmployeeReducer.connectedEmployee.userName,
        id: EmployeeReducer.connectedEmployee._id,
      });
      socket.on("calledUser", (data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setName(data.from.userName);
        linkTo = data.link;
      });
      socket.on("otherhangup", () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Call declined",
          timer: 2500,
        });
        setRedirectToChat(true);
      });
      socket.on("otherhanguptwo", () => {
        Swal.fire({
          icon: "error",
          title: "Call ended",
          timer: 2500,
        });
        setRedirectToChat(true);
      });
      socket.on("refetchChats", () => {
        fetchChats();
      });
    }, 2000);
  }, []);
  useEffect(() => {
    selectedChatCompare = EmployeeReducer.selectedChat;
  }, [EmployeeReducer.selectedChat]);
  socket.on("message recieved", (newMessageRecieved) => {
    let notifs;
    if (
      !selectedChatCompare ||
      selectedChatCompare._id !== newMessageRecieved.chat._id
    ) {
      if (!EmployeeReducer.notification.includes(newMessageRecieved)) {
        notifs = EmployeeReducer.notification;
        console.log(notifs);
        notifs.push(newMessageRecieved);
        dispatch(notifications(notifs));
      }
    }
  });
  return (
    <Router>
      <Suspense fallback={<div>LOADING...</div>}>
        <Route
          exact
          path="/"
          name="Login"
          render={(props) => <Login {...props} />}
        />
        <div className="container-page ">
          <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
          <AppContent />
          <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>
      </Suspense>
      {redirectOrNot ? <Redirect to="/" /> : null}
      {redirectToChat ? <Redirect to="/home/chat" /> : null}
      {redirectToVideo ? <Redirect to={`/home/videocall/${linkTo}`} /> : null}
      {receivingCall ? (
        <div className="card-call" style={{ zIndex: "99999" }}>
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
            <div className="bouton-call raccrocher" onClick={declineCall}>
              <span className="icon red"></span>
            </div>
            <div className="bouton-call decrocher" onClick={answerCall}>
              <span className="icon green"></span>
            </div>
          </div>
        </div>
      ) : null}
    </Router>
  );
}
