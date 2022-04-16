import React, { useState, Suspense, useEffect } from "react";
import AppContent from "../components/AppContent";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import "./defaultLayout.css";
import { useHistory } from "react-router-dom";
import { parse, stringify } from 'flatted'
const Login = React.lazy(() =>
  import("../components/authentification/Authentification")
);
export default function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [redirectOrNot, setRedirectOrNot] = useState(false);
  const [redirectToVideo, setRedirectToVideo] = useState(false);
  const { EmployeeReducer } = useSelector((state) => state);
  const socket = EmployeeReducer.socket;
  const history = useHistory();
  const [caller, setCaller] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [name, setName] = useState("");
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  console.log(EmployeeReducer.socket)
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  useEffect(() => {
    if (EmployeeReducer.token.length === 0) {
      setRedirectOrNot(true)
    }
  }, []);
  if (socket) {
    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      // setName(data.name);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }
  const answerCall = () => {
    setReceivingCall(false)
    setRedirectToVideo(true)
  };
  const declineCall = () => {
    setReceivingCall(false)
  };
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
      {redirectOrNot ? (
        <Redirect to="/" />
      ) : null
      }
      {redirectToVideo ? (
        <Redirect
          to={{
            pathname: "/home/videocall",
            state: { callerSignal: callerSignal , caller: caller }
          }}
        />
      ) : null
      }
      {/* {receivingCall ? (
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
      ) : null} */}

    </Router>
  );
}
