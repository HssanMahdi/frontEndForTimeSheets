import React, { useEffect, useState } from "react";
import "./Chat.css";
import hello from "../../assets/chat.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  ChangeSelectedChat,
  CompanWorkers,
} from "../../redux/actions/EmployeeActions";
import Message from "./message/Message";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { ChatFetcher } from "../../redux/actions/EmployeeActions";
// import { Socket } from "socket.io-client";

export default function Chat(props) {
  const { EmployeeReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const socket = EmployeeReducer.socket;
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [selectedSearchedEmployee, setSelectedSearchedEmployee] = useState({});
  const config = {
    headers: {
      Authorization: `Bearer ${EmployeeReducer.token}`,
    },
  };
  const fetchChats = async () => {
    dispatch(ChatFetcher(config));
  };
  const searchEmployees = async () => {
    const { data } = await axios.get(`/employee?search=${search}`, config);
    setSearchResult(data);
  };
  // useEffect(()=>{
  //   dispatch(ChatFetcher(config));
  // },[EmployeeReducer.chats])
  const accessChat = async () => {
    let employeeToCheckChat = {
      employeeId: selectedSearchedEmployee._id,
    };
    const { data } = await axios.post("/chat", employeeToCheckChat, config);
    dispatch(ChangeSelectedChat(data));
    fetchChats();
    setSelectedChat(data);
  };
  function Check(props) {
    if (props.employee._id != EmployeeReducer.connectedEmployee._id) {
      return <div className="name">{props.employee.userName}</div>;
    }
    return <></>;
  }
  useEffect(() => () => dispatch(ChangeSelectedChat()), []);
  useEffect(() => {
    dispatch(CompanWorkers(config));
    fetchChats();
  }, []);
  useEffect(() => {
    setSelectedChat(EmployeeReducer.selectedChat);
  }, [EmployeeReducer.selectedChat]);
  if (socket) {
    socket.on("refetchChats", () => {
      fetchChats();
    });
  }

  useEffect(() => {
    dispatch(CompanWorkers(config));
    searchEmployees();
  }, [search]);

  useEffect(() => {
    if (Object.entries(selectedSearchedEmployee).length !== 0) {
      accessChat();
      fetchChats();
    }
  }, [selectedSearchedEmployee]);

  function changeSelectedChat1(chat) {
    setSelectedChat(chat);
    dispatch(ChangeSelectedChat(chat));
  }
  return (
    <main>
      <div className="main__container">
        <div className="main__title ">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Messages</h1>
            <p>Chat Workplace</p>
          </div>
          <span id="idBut">
            <button
              style={{ background: "rgb(30, 45, 78)" }}
              type="button"
              className="btn btn-secondary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i className="bi bi-chat-quote"> Group Chat</i>
            </button>
          </span>
          <GroupChatModal></GroupChatModal>
        </div>
        <div className="row clearfix my-3">
          <div className="col-lg-12">
            <div className="cardCHAT chat-app">
              <div id="plist" className="people-list">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {search ? (
                  <ul id="test1" className="list-unstyled  chat-list mt-2 mb-0">
                    {searchResult?.map((search, i) => (
                      <li
                        key={i}
                        className="clearfix"
                        onClick={() => {
                          setSelectedSearchedEmployee(search);
                          setSearch("");
                        }}
                      >
                        <img src={search.images} alt="avatar" />
                        <div className="about">
                          {search.userName}
                          <div className="status">
                            <i className="fa fa-circle offline"></i>
                            {search.email}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <ul
                  id="test2"
                  className="list-unstyled scrollbar-card chat-list mt-2 mb-0"
                >
                  {EmployeeReducer.chats?.map((chat) =>
                    !chat.isGroup ? (
                      <React.Fragment key={chat._id}>
                        <li
                          className="clearfix"
                          onClick={() => changeSelectedChat1(chat)}
                        >
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt="avatar"
                          />
                          <div className="about">
                            {chat.employees?.map((employee, index) => (
                              <React.Fragment key={index}>
                                <Check employee={employee} />
                              </React.Fragment>
                            ))}
                            <div className="status">
                              {typeof chat.lastMessage !== "undefined" &&
                              chat.lastMessage !== null ? (
                                <>
                                  <i className="fa fa-circle offline"></i>
                                  {chat.lastMessage.content}
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </li>
                      </React.Fragment>
                    ) : (
                      <li
                        key={chat._id}
                        className="clearfix"
                        onClick={() => changeSelectedChat1(chat)}
                      >
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          alt="avatar"
                        />
                        <div className="about">
                          {chat.chatName}
                          <div className="status">
                            {typeof chat.lastMessage !== "undefined" &&
                            chat.lastMessage !== null ? (
                              <>
                                <i className="fa fa-circle offline"></i>
                                {chat.lastMessage.content}
                              </>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="chat">
                <Message selectedChat={selectedChat}></Message>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
