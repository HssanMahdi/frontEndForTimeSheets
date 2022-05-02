import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { ChatFetcher } from "../../../redux/actions/EmployeeActions";
var socket;
export default function GroupChatModal() {
  const { EmployeeReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchsResult, setSearchsResult] = useState([]);
  const [userExist, setUserExist] = useState(false);
  const [showElement, setShowElement] = useState(true);
  const [formValid, setFormValid] = useState();

  const closeRef = useRef();
  const config = {
    headers: {
      Authorization: `Bearer ${EmployeeReducer.token}`,
    },
  };
  useEffect(()=>{
    socket = io.connect("http://localhost:3001", {
      transports: ["websocket"],
    });
  },[])
  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
      setFormValid(false);
      setUserExist(false);
    }, 3000);
  }, [showElement]);
  const handleSearchU = async (query) => {
    setSearchUser(query);
    if (!query) {
      return;
    }
    const { data } = await axios.get(`/employee?search=${searchUser}`, config);
    setSearchsResult(data);
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      setUserExist(true);
      setShowElement(true);
    } else {
      setUserExist(false);
      setSelectedUsers([...selectedUsers, userToAdd]);
    }
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      setFormValid(true);
      setShowElement(true);
    } else {
      setFormValid(false);
      const { data } = await axios.post(
        `/chat/group`,
        {
          name: groupChatName,
          employees: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      socket.emit('chatCreation',data.employees)
      setGroupChatName("");
      setSearchUser("");
      setSelectedUsers([]);
      dispatch(ChatFetcher(config));

      closeRef.current.click();
    }
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref={closeRef}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              <i className="bi bi-chat-quote"> Create Group chat </i>
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="my-4">
              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Group Name.."
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </div>

              <div className="input-group mb-1">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend">
                    @
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={searchUser}
                  onChange={(e) => handleSearchU(e.target.value)}
                />
              </div>
            </form>
            {selectedUsers.map((u, idUs) => (
              <React.Fragment key={idUs}>
                <a className="badge badge-info mx-1">
                  {u.userName}
                  <i
                    className="bi bi-x-circle-fill mx-1"
                    onClick={() => handleDelete(u)}
                  ></i>
                </a>
              </React.Fragment>
            ))}

            {searchUser ? (
              <div className="list-group first-init-reply">
                {searchsResult?.map((seach, iSeach) => (
                  <React.Fragment key={iSeach}>
                    <div onClick={() => handleGroup(seach)}>
                      <a className="list-group-item">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          alt="avatar"
                          className="img-search"
                        />
                        {seach.userName}
                      </a>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ) : null}
            {userExist && showElement ? (
              <div className="alert alert-danger my-2" role="alert">
                user already exist !
              </div>
            ) : null}
            {formValid && showElement ? (
              <div className="alert alert-danger my-2" role="alert">
                Please Fill !
              </div>
            ) : null}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            {/* <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Create Chat
            </button> */}
            <Link to={"/home/chat"}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Create Chat
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
