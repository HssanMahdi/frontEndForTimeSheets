import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import UpdateChatModal from "../miscellaneous/UpdateChatModal";
import Moment from "react-moment";
import { v1 as uuid } from "uuid";
import Picker from "emoji-picker-react";

import { BsEmojiSmileFill } from "react-icons/bs";
import {
  ChatFetcher,
  notifications,
} from "../../../redux/actions/EmployeeActions";
import moment from "moment";
// const socket = io.connect("http://localhost:3001");
var socket;

export default function Message(props) {
  const { EmployeeReducer } = useSelector((state) => state);
  const history = useHistory();
  const [messages, setMessages] = useState([]);
  const [displayed, setDisplayed] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [selectedChatCompare, setSelectedChatCompare] = useState({});
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [selectedChat, setSelectedChat] = useState({});
  const [istyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const hiddenFileInput = useRef();
  const dispatch = useDispatch();
  const ref = useRef();
  const config = {
    headers: {
      Authorization: `Bearer ${EmployeeReducer.token}`,
    },
  };
  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (event, emoji) => {
    let message = newMessage;
    message += emoji.emoji;
    setNewMessage(message);
  };

  function myTime(dateFromDB) {
    return moment(dateFromDB).format("hh:mm");
  }
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
              chatId: selectedChat._id,
            },
            configM
          );

          socket.emit("new message", data);
          setMessages([...messages, data]);

          // if (ref.current !== null) {
          //   ref?.current.scrollIntoView({ behavior: "smooth" });
          // }
        });
      e.target.value = null;
    }
  };

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setSelectedChat(EmployeeReducer.selectedChat);
    fetchMessages();
    displayedChanger();
    setNewMessage("");
    setIsTyping(false);
    setSelectedChatCompare(selectedChat);
  }, [EmployeeReducer.selectedChat]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const fetchMessages = async () => {
    if (typeof selectedChat !== "undefined") {
      if (Object.entries(selectedChat).length !== 0) {
        const { data } = await axios.get(
          `/message/${EmployeeReducer.selectedChat._id}`,
          config
        );
        setMessages(data);

        // if (ref.current !== null) {
        //   ref.current.scrollIntoView({ behavior: "smooth" });
        // }
        socket.emit("join chat", selectedChat._id);
      }
    }
  };
  function displayedChanger() {
    if (typeof selectedChat !== "undefined") {
      setDisplayed(selectedChat);

      if (selectedChat.isGroup) {
        setDisplayed(selectedChat.chatName);
      } else {
        selectedChat.employees?.map((employee) => {
          if (employee._id != EmployeeReducer.connectedEmployee._id) {
            setDisplayed(employee);
          }
        });
      }
    }
  }
  const create = async () => {
    const configM = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${EmployeeReducer.token}`,
      },
    };
    const id = uuid();
    setNewMessage("");
    const { data } = await axios.post(
      "/message",
      {
        content: `http://localhost:3000/home/makecall/${id}`,

        chatId: selectedChat._id,
      },
      configM
    );

    socket.emit("new message", data);
    setMessages([...messages, data]);

    history.push(`/home/makecall/${id}`);
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
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
          chatId: selectedChat._id,
        },
        configM
      );
      socket.emit("new message", data);
      setMessages([...messages, data]);
      dispatch(ChatFetcher(config));
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
    socket.on("message recieved", (newMessageRecieved) => {
      console.log("chatnewmessage : ",newMessageRecieved.chat)
      console.log("chat selected : ",EmployeeReducer.selectedChat._id)
      if (
        !EmployeeReducer.selectedChat._id || // if chat is not selected or doesn't match current chat
        EmployeeReducer.selectedChat._id !== newMessageRecieved.chat._id
      ) {
        return;
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  }, []);

  useEffect(() => {
    fetchMessages();
    displayedChanger();
    setIsTyping(false);
    setSelectedChatCompare(selectedChat);
    const ac = new AbortController();
    return () => ac.abort();
  }, [selectedChat]);
  // useEffect(
  //   () => () => {
  //     console.log("5rajt");

  //     setSelectedChatCompare({});
  //   },
  //   []
  // );

  // selectedChat._id;
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return console.log("pass de cnx");

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };


  const getSender = (msg) => {
    if (msg.sender._id === EmployeeReducer.connectedEmployee._id) {
      return true;
    }
    return false;
  };
  function callThisPerson() {
    EmployeeReducer.selectedChat.employees?.map((employee) => {
      if (employee._id != EmployeeReducer.connectedEmployee._id) {
        let id = uuid();
        history.push({
          pathname: `/home/videocall/${id}`,
          state: { empToCall: employee },
        });
        // history.push(`/home/videocall/${id}`)
      }
    });
  }

  return (
    <>
      {typeof selectedChat !== "undefined" ? (
        <>
          <div className="chat-header clearfix">
            <div className="row d-inline">
              {Object.keys(displayed).length != 0 ? (
                <>
                  {!selectedChat.isGroup ? (
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
                          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg?fbclid=IwAR2PGk8pKz8LIGKpG1d3Y2Z-gXOoZeY8w7E2leuZNGDctvWZB0mpLuOc0DM" />
                        </a>
                        <div className="chat-about">
                          <h6 className="m-b-0">{selectedChat.chatName}</h6>
                        </div>
                      </div>

                      <div className="col-lg-12 hidden-sm text-right">
                        <a
                          className="btn btn-outline-info mx-2"
                          onClick={create}
                          style={{ color: "black" }}
                        >
                          <i
                            style={{ color: "#3692a1" }}
                            className="bi bi-camera-video-fill"
                          ></i>
                        </a>
                        <a
                          data-toggle="modal"
                          data-target="#updateModal"
                          className="btn btn-outline-info"
                        >
                          <i className="fa fa-cogs"></i>
                        </a>
                        {typeof selectedChat !== "undefined" ? (
                          <UpdateChatModal
                            selectedChat={selectedChat}
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
                      style={{marginRight: "8px"}}
                        src={message.sender.images}
                        alt="avatar"
                      />
                      <span>{message.sender.userName}</span>
                    </div>
                    {!message.isFile ? (
                      <div className="message my-message">
                        {message.content.includes(
                          "http://localhost:3000/home/makecall/"
                        ) ? (
                          <a style={{ color: "blue" }} href={message.content}>
                            <i className="bi bi-link"></i> Click here to join a
                            videoCall
                          </a>
                        ) : (
                          <>{message.content}</>
                        )}
                      </div>
                    ) : (
                      <div className="message my-message">
                        <img
                          style={{ width: "390px" }}
                          src={message.content}
                          alt="avatar"
                        />
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
                      {myTime(message.createdAt)} |
                      <Moment format=" DD-MM-YYYY ">
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
                      style={{marginLeft: "13px"}}
                        src={EmployeeReducer.connectedEmployee.images}
                        alt="avatar"
                      />
                    </div>
                    {!message.isFile ? (
                      <div className="message other-message float-right">
                        {message.content.includes(
                          "http://localhost:3000/home/makecall/"
                        ) ? (
                          <a style={{ color: "blue" }} href={message.content}>
                            <i className="bi bi-link"></i> Click here to join a
                            videoCall
                          </a>
                        ) : (
                          <>{message.content}</>
                        )}
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
                      {myTime(message.createdAt)} |
                      <Moment format="DD-MM-YYYY ">
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
              <>
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
                    <span className="input-group-text emoji">
                      <BsEmojiSmileFill onClick={handleEmojiPicker} />
                    </span>
                  </div>

                  <div className="input-group-prepend ">
                    <span className="input-group-text ">
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
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
              </>
            ) : null}
          </div>
        </>
      ) : (
        <div className="chat-header clearfix">
          <div className="row d-inline">
            <h4 className="h4-class ">Please Select User</h4>
          </div>
        </div>
      )}
    </>
  );
}
