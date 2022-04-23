import "./Navbar.css";
import avatar from "../../assets/avatar.svg";
import { Popover, Button, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useHistory } from "react-router";
import {
  ChangeCheckPresence,
  ChangeSelectedChat,
  Logout,
  notifications,
} from "../../redux/actions/EmployeeActions";
import { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import * as faceapi from "@vladmandic/face-api";
import Message from "../chat/message/Message";

export default function Navbar({ sidebarOpen, openSidebar }) {
  const { EmployeeReducer } = useSelector((state) => state);
  const [redirectOrNo, setredirectOrNo] = useState(false);
  const [redirectToChat, setRedirectToChat] = useState(false);
  const [link, setLink] = useState("");
  const [stream, setStream] = useState();
  const myVideo = useRef();
  const [keysPressed, setKeysPressed] = useState([]);
  const [navNotifications, setNavNotifications] = useState([]);
  const dispatch = useDispatch();
  const [valueSearch, setValueSearch] = useState("");

  const history = useHistory();
  const searchGoogle = (e) => {
    history.push({
      pathname: "/home/search",
      state: { valueSearch: valueSearch },
    });
  };
  const config = {
    headers: {
      Authorization: `Bearer ${EmployeeReducer.token}`,
    },
  };
  useEffect(() => {
    setLink(`${process.env.REACT_APP_URL}signup/${EmployeeReducer.token}`);
    navigator.geolocation.getCurrentPosition((position) => {
      let longLat = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      dispatch({
        type: "LOCATION",
        payload: longLat,
      });
    });
    document.addEventListener("keyup", (event) => {
      const { key } = event;
      keysPressed.push(key);
    });
    // Promise.all([
    //   faceapi.nets.tinyFaceDetector.loadFromUri("/model"),
    //   faceapi.nets.faceLandmark68Net.loadFromUri("/model"),
    //   faceapi.nets.faceRecognitionNet.loadFromUri("/model"),
    //   faceapi.nets.faceExpressionNet.loadFromUri("/model")
    // ])
    //   .then(checkVideo(), handleVideo())
    //   .catch((err) => console.log("err : ", err));
    checkVideo();
    handleVideo();
  }, []);

  useEffect(() => {
    setredirectOrNo(false);
    setNavNotifications(EmployeeReducer.notification);
  });

  function checkVideo() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
  }
  const searchGooglePress = async (event) => {
    if (event.key === "Enter" && valueSearch) {
      searchGoogle();
    }
  };
  function sweetAlert() {
    const MySwal = withReactContent(Swal);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Link copied sent it to Employees",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  const handleVideo = async () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(myVideo.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections[0]) {
        EmployeeReducer.checkPresence.push(true);
        dispatch(ChangeCheckPresence(EmployeeReducer.checkPresence));
      } else {
        EmployeeReducer.checkPresence.push(false);
        dispatch(ChangeCheckPresence(EmployeeReducer.checkPresence));
      }
      console.log(
        "EmployeeReducer.checkPresence : ",
        EmployeeReducer.checkPresence
      );
    }, 900000); //900000 every 15 mins
  };

  function Item(props) {
    //? `New message in ${notif.chat.chatName}`:`New message in ${notif.sender.userName}`
    if (props.props.chat.isGroup) {
      return (
        <li
          onClick={() => {
            setNavNotifications(
              navNotifications.filter((n) => n !== props.props)
            );
            dispatch(
              notifications(navNotifications.filter((n) => n !== props.props))
            );
            dispatch(ChangeSelectedChat(props.props.chat));
            history.push("/home/chat");
          }}
        >
          New message in group chat {props.props.chat.chatName}
        </li>
      );
    }

    return (
      <li
        onClick={() => {
          setNavNotifications(
            navNotifications.filter((n) => n !== props.props)
          );
          dispatch(
            notifications(navNotifications.filter((n) => n !== props.props))
          );
          dispatch(ChangeSelectedChat(props.props.chat));
          history.push("/home/chat");
        }}
      >
        New message in chat with {props.props.sender.userName}
      </li>
    );
  }

  const logout = async () => {
    // const toUpdate = {
    //   todaysWorkedHours: 0,
    //   totalWorkedHours: 0,
    //   overTimeHours: 0
    // }
    // const timeLogout = new Date();
    // const timeLastLogin = new Date(EmployeeReducer.connectedEmployee.timeLastLogin);
    // const timeLogin = new Date(EmployeeReducer.timeLogin);
    // const workedHoursThisSession = timeLogout.getTime() - timeLogin.getTime();
    // let seconds = Math.floor(workedHoursThisSession / 1000);
    // let minutes = Math.floor(seconds / 60);
    // if (timeLogout.getMonth() === timeLogin.getMonth() && timeLogout.getDate() === timeLogin.getDate()
    //   && timeLogout.getFullYear() === timeLogin.getFullYear()) {
    //   if (timeLastLogin.getMonth() === timeLogin.getMonth() && timeLastLogin.getDate() === timeLogin.getDate()
    //     && timeLastLogin.getFullYear() === timeLogin.getFullYear()) {
    //     toUpdate.todaysWorkedHours = EmployeeReducer.connectedEmployee.todaysWorkedHours + minutes
    //     toUpdate.totalWorkedHours = EmployeeReducer.connectedEmployee.totalWorkedHours + minutes
    //   } else {
    //     toUpdate.todaysWorkedHours = minutes
    //     toUpdate.totalWorkedHours = EmployeeReducer.connectedEmployee.totalWorkedHours + minutes
    //   }
    // }else{
    // time login to 00 &&& 00 to timeLogout
    //   var now = new Date(),
    // then = new Date(
    //     now.getFullYear(),
    //     now.getMonth(),
    //     now.getDate(),
    //     0,0,0),
    // }
    // if (toUpdate.todaysWorkedHours > 480) {
    //   toUpdate.overTimeHours = toUpdate.todaysWorkedHours - 480
    //   toUpdate.todaysWorkedHours = 480;
    // }
    // console.log(toUpdate)
    navigator.geolocation.getCurrentPosition((position) => {
      if (
        getDistanceFromLatLonInKm(
          position.coords.latitude,
          position.coords.longitude,
          EmployeeReducer.longLatLogin.latitude,
          EmployeeReducer.longLatLogin.longitude
        )
      ) {
        EmployeeReducer.connectedEmployee.notifications.push(
          "Employee suspected of moving long distances while supposedly working"
        );
        let data = {
          notifications: EmployeeReducer.connectedEmployee.notifications,
        };
        axios.post("/employee/updatenotifs", data, config);
      }
    });
    if (
      EmployeeReducer.checkPresence.filter((x) => x === false).length >
      EmployeeReducer.checkPresence.filter((x) => x === true).length
    ) {
      EmployeeReducer.connectedEmployee.notifications.push(
        "Employee suspected of not being in front of his computer while supposedly working"
      );
      let data = {
        notifications: EmployeeReducer.connectedEmployee.notifications,
      };
      axios.post("/employee/updatenotifs", data, config);
    }
    dispatch(Logout());
    console.log("keypressed : ", keysPressed);
    setredirectOrNo(true);
  };
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    if (d > 10) {
      return true;
    }
    return false;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const popover = (
    <Popover id="popover-basic" style={{ borderRadius: 19, marginRight: 30 }}>
      <Popover.Header
        as="h3"
        style={{
          backgroundColor: "rgb(225 226 243)",
          padding: "13px 26px",
          color: "#0c1b48",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          textAlign: "center",
        }}
      >
        <Link
          to={"/home/profile"}
          style={{ color: "#150d32", textDecoration: "none" }}
        >
          <i className="bi bi-person-lines-fill mx-2">
            {" "}
            {EmployeeReducer.connectedEmployee.userName}{" "}
          </i>
        </Link>
      </Popover.Header>
      <Popover.Body
        style={{
          color: "#150d32",
          textAlign: "center",
          margin: "8px 29px",
        }}
      >
        <strong>{EmployeeReducer.connectedEmployee.email}</strong>

        <button
          style={{
            backgroundColor: "rgb(225 226 243)",
            color: "#150d32",
            borderRadius: 10,
          }}
          className="btn btn-outline   mx-2 my-2"
          onClick={logout}
        >
          <i className="fa fa-sign-out mx-2">Logout</i>
        </button>
      </Popover.Body>
    </Popover>
  );

  const popover1 = (
    <Popover id="popover-basic" style={{ borderRadius: 19, marginRight: 30 }}>
      <Popover.Header
        as="h3"
        style={{
          backgroundColor: "rgb(225 226 243)",
          padding: "13px 26px",
          color: "#0c1b48",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          textAlign: "center",
        }}
      >
        <i
          className="bi bi-bell"
          style={{ color: "#150d32", textDecoration: "none" }}
        >
          {" "}
          {EmployeeReducer.notification.length} Notifications{" "}
        </i>
      </Popover.Header>
      <Popover.Body
        style={{
          color: "#150d32",
          textAlign: "center",
          margin: "8px 29px",
        }}
      >
        <ul>
          {navNotifications.map((notif, index) => (
            <Item key={index} props={notif} />
          ))}
        </ul>
        {/* <ul>
        {EmployeeReducer.notification?.map((notif) => {
           <li key={notif._id}>
           OK
           </li>
          {notif.chat.isGroup? `New message in ${notif.chat.chatName}`:`New message in ${notif.sender.userName}`}
          console.log("notif",notif)
          <Message selectedChat={notif}></Message>
        })
        }
        </ul> */}
      </Popover.Body>
    </Popover>
  );
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar__left">
        {EmployeeReducer.connectedEmployee.isManager ? (
          // <a href="#">Subscribers</a>
          <>
            <CopyToClipboard text={link}>
              <button
                className="button-53"
                variant="contained"
                onClick={sweetAlert}
                style={{ backgroundColor: "#3984E6" }}
                starticon={<AssignmentIcon fontSize="large" />}
              >
                Invite employees
              </button>
            </CopyToClipboard>
          </>
        ) : null}
        {/* <a href="#">Video Management</a>
        <a className="active_link" href="#">
          Manager
        </a> <Link to={"/home/projectPlanning"}>Project Planning</Link>*/}
        <span>
          <video
            crossOrigin="anonymous"
            playsInline
            muted
            ref={myVideo}
            width={"70"}
            height={"35"}
            style={{ visibility: "hidden" }}
            autoPlay
          />
        </span>
      </div>
      <div className="navbar__right">
        <div>
          <div className="search-box">
            <input
              type="text"
              className="search-input11 "
              onChange={(e) => setValueSearch(e.target.value)}
              value={valueSearch}
              placeholder="Search Google .."
              onKeyDown={searchGooglePress}
            />

            <i
              style={{ color: "darkblue" }}
              onClick={searchGoogle}
              className="bi bi-google"
            ></i>
          </div>
        </div>
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="bottom"
          overlay={popover1}
        >
          <a href="#">
            <i className="fa fa-bell"></i>

            {EmployeeReducer.notification.length > 0 && (
              <div className="common-count">
                <div className="value">
                  {EmployeeReducer.notification.length}
                </div>
              </div>
            )}
          </a>
        </OverlayTrigger>
        <a href="#">
          <i className="fa fa-clock-o"></i>
        </a>
        {redirectOrNo ? (
          <Redirect to="/" />
        ) : (
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="bottom"
            overlay={popover}
          >
            <a href="#">
              <img width="30" src={avatar} alt="avatar" />
            </a>
          </OverlayTrigger>
        )}
        {redirectToChat ? <Redirect to="/home/chat" /> : null}
      </div>
    </nav>
  );
}
