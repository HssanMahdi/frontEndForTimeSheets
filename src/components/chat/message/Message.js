import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import UpdateChatModal from "../miscellaneous/UpdateChatModal";
import Moment from "react-moment";
import { notifications } from "../../../redux/actions/EmployeeActions";
// const socket = io.connect("http://localhost:3001");
var socket, selectedChatCompare;

export default function Message(props) {
  const { EmployeeReducer } = useSelector((state) => state);
  const history = useHistory();
  const [messages, setMessages] = useState([]);
  const [displayed, setDisplayed] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [inputFiles, setInputFiles] = useState();
  const [senderM, setSenderM] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const hiddenFileInput = useRef();
  const dispatch = useDispatch();
  const ref = useRef();
  const config = {
    headers: {
      Authorization: `Bearer ${EmployeeReducer.token}`,
    },
  };

  const uploadImage = (e) => {
    if (e !== undefined) {
      const configM = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${EmployeeReducer.token}`,
        },
      };
      const form = new FormData();
      form.append("file", e.target.files[0]);
      form.append("upload_preset", "onTime-app");
      fetch("https://api.cloudinary.com/v1_1/espritt/image/upload", {
        method: "post",
        body: form,
      })
        .then((res) => res.json())
        .then(async (result) => {
          setNewMessage("");
          const { data } = await axios.post(
            "/message",
            {
              content: result.secure_url,
              isFile: true,
              chatId: props.selectedChat._id,
            },
            configM
          );

          socket.emit("new message", data);
          setMessages([...messages, data]);

          if (ref.current !== null) {
            ref.current.scrollIntoView({ behavior: "smooth" });
          }
        });
      e.target.value = null;
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    console.log("dddd");
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
  };

  const fetchMessages = async () => {
    if (Object.entries(props.selectedChat).length !== 0) {
      const { data } = await axios.get(
        `/message/${props.selectedChat._id}`,
        config
      );
      setMessages(data);

      if (ref.current !== null) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
      socket.emit("join chat", props.selectedChat._id);
    }
  };
  function displayedChanger() {
    setDisplayed(props.selectedChat);

    if (props.selectedChat.isGroup) {
      setDisplayed(props.selectedChat.chatName);
    } else {
      props.selectedChat.employees?.map((employee) => {
        if (employee._id != EmployeeReducer.connectedEmployee._id) {
          setDisplayed(employee);
        }
      });
    }
  }

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", props.selectedChat._id);
      const configM = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${EmployeeReducer.token}`,
        },
      };
      setNewMessage("");
      const { data } = await axios.post(
        "/message",
        {
          content: newMessage,
          chatId: props.selectedChat._id,
        },
        configM
      );

      socket.emit("new message", data);
      setMessages([...messages, data]);

      if (ref.current !== null) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  useEffect(() => {
    socket = io.connect("http://localhost:3001", {
      transports: ["websocket"],
    });
    socket.emit("setup", EmployeeReducer.connectedEmployee);
    socket.on("connection", setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    displayedChanger();
    selectedChatCompare = props.selectedChat;
  }, [props.selectedChat._id]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return console.log("pass de cnx");

    if (!typing) {
      setTyping(true);
      socket.emit("typing", props.selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", props.selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!EmployeeReducer.notification.includes(newMessageRecieved)) {
          EmployeeReducer.notification.push(newMessageRecieved);
          dispatch(notifications(EmployeeReducer.notification));
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const getSender = (msg) => {
    if (msg.sender._id === EmployeeReducer.connectedEmployee._id) {
      return true;
    }
    return false;
  };
  function callThisPerson() {
    props.selectedChat.employees?.map((employee) => {
      if (employee._id != EmployeeReducer.connectedEmployee._id) {
        history.push({
          pathname: "/home/videocall",
          state: { empToCall: employee },
        });
      }
    });
  }

  return (
    <>
      <div className="chat-header clearfix">
        <div className="row d-inline">
          {Object.keys(displayed).length != 0 ? (
            <>
              {!props.selectedChat.isGroup ? (
                <>
                  <div className="col-lg-12">
                    <a data-toggle="modal" data-target="#view_info">
                      <img src={displayed.images} alt="avatar" />
                    </a>
                    <div className="chat-about">
                      <h6 className="m-b-0">{displayed.userName}</h6>
                    </div>
                  </div>
                  <div className="col-lg-12 hidden-sm text-right">
                    <a
                      className="btn btn-outline-info"
                      onClick={callThisPerson}
                      style={{ color: "black" }}
                    >
                      <i
                        style={{ color: "#3692a1" }}
                        className="bi bi-camera-video-fill"
                      ></i>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-lg-12">
                    <a data-toggle="modal" data-target="#view_info">
                      <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" />
                    </a>
                    <div className="chat-about">
                      <h6 className="m-b-0">{props.selectedChat.chatName}</h6>
                    </div>
                  </div>

                  <div className="col-lg-12 hidden-sm text-right">
                    <a
                      data-toggle="modal"
                      data-target="#updateModal"
                      className="btn btn-outline-info"
                    >
                      <i className="fa fa-cogs"></i>
                    </a>
                    {typeof props.selectedChat !== "undefined" ? (
                      <UpdateChatModal
                        selectedChat={props.selectedChat}
                      ></UpdateChatModal>
                    ) : null}
                  </div>
                </>
              )}
            </>
          ) : (
            <h4 className="h4-class ">Please Select User</h4>
          )}
        </div>
      </div>
      <div className="chat-history  ">
        <ul className="m-b-0">
          {messages?.map((message, i) =>
            !getSender(message) ? (
              <li key={i} className="clearfix" ref={ref}>
                <div className="message-data text-left">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="avatar"
                  />
                  <span>{message.sender.userName}</span>
                </div>
                {!message.isFile ? (
                  <div className="message my-message">{message.content}</div>
                ) : (
                  <div className="message my-message">
                    {" "}
                    <img src={message.content} alt="avatar" />
                  </div>
                )}

                <span
                  className="message-data mx-2"
                  style={{
                    transform: "translateX(-50%) translateY(-50%)",
                    color: "#291872",
                    fontSize: "13px",
                    fontFamily: "Orbitron",
                    letterSpacing: "1px",
                  }}
                >
                  <Moment format="HH:MM | DD-MM-YYYY ">
                    <span className="message-data-time">
                      {message.createdAt}
                    </span>
                  </Moment>
                </span>
              </li>
            ) : (
              <li key={i} className="clearfix">
                <div className="message-data text-right">
                  <span>{EmployeeReducer.connectedEmployee.userName}</span>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="avatar"
                  />
                </div>
                {!message.isFile ? (
                  <div className="message other-message float-right">
                    {message.content}
                  </div>
                ) : (
                  <div className="message other-message float-right">
                    <img
                      style={{ width: "390px" }}
                      src={message.content}
                      alt="avatar"
                    />
                  </div>
                )}

                <span
                  className="float-right my-3 mx-2 "
                  style={{
                    color: "#291872",
                    fontSize: "13px",
                    fontFamily: "Orbitron",
                    letterSpacing: "1px",
                    float: "right ",
                  }}
                >
                  <Moment format="hh:mm | DD-MM-YYYY ">
                    <span className="message-data-time">
                      {message.createdAt}
                    </span>
                  </Moment>
                </span>
              </li>
            )
          )}
        </ul>
      </div>
      <div className="chat-message clearfix">
        {istyping ? (
          <div className="chat-bubble my-4">
            <div className="typing">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {Object.keys(displayed).length != 0 ? (
          <div className="input-group mb-0" onKeyDown={sendMessage}>
            <div className="input-group-prepend image-uploadss">
              <span className="input-group-text">
                <i className="bi bi-card-image" onClick={handleClick}></i>
              </span>
              <form>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={hiddenFileInput}
                  onChange={(e) => uploadImage(e)}
                />
              </form>
            </div>
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-send"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter text here..."
              onChange={typingHandler}
              value={newMessage}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
