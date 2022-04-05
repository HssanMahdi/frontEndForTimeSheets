import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChatFetcher } from "../../../redux/actions/EmployeeActions";

export default function UpdateChatModal(props) {
  const { EmployeeReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [groupChatName, setGroupChatName] = useState("");
  const [searchUpd, setSearchUpd] = useState("");
  const [searchResultU, setSearchResultU] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const closeRef = useRef();
  useEffect(() => {
    setSelectedChat(props.selectedChat);
    setGroupChatName("");
  }, [props.selectedChat]);
  useEffect(() => {}, [groupChatName]);
  const config = {
    headers: {
      Authorization: `Bearer ${EmployeeReducer.token}`,
    },
  };
  const handleSearchU = async (query) => {
    setSearchUpd(query);
    if (!query) {
      return;
    }
    const { data } = await axios.get(`/employee?search=${searchUpd}`, config);
    setSearchResultU(data);
  };
  const handleRename = async () => {
    if (!groupChatName) return;

    const { data } = await axios.put(
      `/chat/rename`,
      {
        chatId: selectedChat._id,
        chatName: groupChatName,
      },
      config
    );
    setSelectedChat(data);
    setGroupChatName("");
    dispatch(ChatFetcher(config));
  };
  const handleAddUser = async (user1) => {
    if (selectedChat.employees.find((u) => u._id === user1._id)) {
      return;
    }
    if (selectedChat.groupAdmin._id !== EmployeeReducer.connectedEmployee._id) {
      return;
    }
    const { data } = await axios.put(
      `/chat/groupadd`,
      {
        chatId: selectedChat._id,
        employeeId: user1._id,
      },
      config
    );

    setSelectedChat(data);
    setGroupChatName("");
  };
  const handleRemove = async (user1) => {
    if (
      selectedChat.groupAdmin._id !== EmployeeReducer.connectedEmployee._id &&
      user1._id !== EmployeeReducer.connectedEmployee._id
    ) {
      return;
    }

    const { data } = await axios.put(
      `/chat/groupremove`,
      {
        chatId: selectedChat._id,
        employeeId: user1._id,
      },
      config
    );

    if (user1._id === EmployeeReducer.connectedEmployee._id) {
      setSelectedChat();
      dispatch(ChatFetcher(config));
      closeRef.current.click();
    } else {
      setSelectedChat(data);
    }

    setGroupChatName("");
  };
  return (
    <div
      className="modal fade"
      id="updateModal"
      role="dialog"
      aria-labelledby="exampleModalLabel2"
      aria-hidden="true"
      ref={closeRef}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title align-center" id="exampleModalLabel">
              <i className="bi bi-chat-quote">{props.selectedChat.chatName}</i>
            </h5>
          </div>
          <div id="modalId" className="modal-body ">
            <form className="my-4">
              <div className="form-group mb-4">
                <div className="form-row align-items-center ">
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Group Name.."
                      value={groupChatName}
                      onChange={(e) => setGroupChatName(e.target.value)}
                    />
                  </div>
                  <div className="col-2">
                    <Link to={"/home/chat"}>
                      <button
                        onClick={handleRename}
                        className="btn btn-primary "
                      >
                        <i className="bi bi-check-square"></i>
                      </button>
                    </Link>
                  </div>
                  <div className=" input-group mt-4 mx-2">
                    <div className=" input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">
                        @
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Add User To Group"
                      onChange={(e) => handleSearchU(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>

            <div className="d-flex">
              {selectedChat
                ? selectedChat.employees?.map((u, idUs) => (
                    <React.Fragment key={idUs}>
                      <a className="badge badge-info mx-1">
                        {u.userName}
                        <i
                          className="bi bi-x-circle-fill mx-1"
                          onClick={() => handleRemove(u)}
                        ></i>
                      </a>
                    </React.Fragment>
                  ))
                : null}
            </div>
          </div>
          {searchUpd ? (
            <div className="container-fluid list-group first-init-reply ">
              {searchResultU?.map((seach, iSeach) => (
                <div
                  className="d-flex justify-content-start align-center"
                  id="listItems"
                  key={iSeach}
                  onClick={() => handleAddUser(seach)}
                >
                  <a
                    id="idLIST"
                    className="list-group-item "
                    style={{ width: "420px" }}
                  >
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      id="img-search"
                    />
                    {seach.userName}
                  </a>
                </div>
              ))}
            </div>
          ) : null}
          <div className="modal-footer">
            <Link to={"/home/chat"}>
              <button
                onClick={() => handleRemove(EmployeeReducer.connectedEmployee)}
                type="button"
                className="btn btn-danger"
              >
                Leave Group
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
