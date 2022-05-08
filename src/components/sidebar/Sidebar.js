import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { v1 as uuid } from "uuid";
import pathToRegexp from "path-to-regexp";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4} from 'uuid';
const socket = io.connect("http://localhost:3001");

export default function Sidebar({ sidebarOpen, closeSidebar }) {
  const { EmployeeReducer } = useSelector((state) => state);
  const [path, setPath] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const re = pathToRegexp("/home/makecall/:roomID");
  const result = re.exec(location.pathname);
  const rev = pathToRegexp("/home/videocall/:roomID");
  const resultv = rev.exec(location.pathname);
  var idRoom, idRoomCall;
  function create() {
    const id = uuid();
    history.push(`/home/makecall/${id}`);
  }
  idRoom = result?.[1];
  idRoomCall = resultv?.[1];

  useEffect(() => {
    if (
      location.pathname === `/home/videocall/${idRoomCall}` ||
      location.pathname === "/home/groupcall" ||
      location.pathname === `/home/makecall/${idRoom}`
    ) {
      setPath(true);
    } else {
      setPath(false);
    }
  });
  return (
    <>
      {!path ? (
        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
          <div className="sidebar__title">
            <div className="sidebar__img">
              <img src={logo} className="mr-1 " alt="logo" />
              <h2>OnTime</h2>
            </div>
            <i
              className="fa fa-times"
              id="sidebarIcon"
              onClick={() => closeSidebar()}
            ></i>
          </div>

          <div className="sidebar__menu">
            <div className="sidebar__link active_menu_link">
              <i className="fa fa-home"></i>
              <Link to={"/home/dashboard"}>Dashboard</Link>
            </div>

            <h3 className="text_pad">Project Management</h3>
            {EmployeeReducer.connectedEmployee.isManager ? (
              <div className="sidebar__link">
                <i className="fa fa-user"></i>
                <Link to={"/home/employees"}>Employee Management</Link>
              </div>
            ) : null}

            <div className="sidebar__link">
              <i className="fa fa-wrench"></i>
              <a href="#">Time Tracking</a>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-building-o"></i>
              <Link to="/project">Project Management</Link>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-archive"></i>
              <Link to={"/home/projectPlanning"}>Project Planning</Link>
            </div>

            <div className="sidebar__link">
              <i className="fa fa-calendar"></i>
              <Link to="/home/Calendar">Calendar</Link>
            </div>
            <div className="sidebar__link">
                    <i className="fa fa-file"></i>
                    <Link to={`/home/FileEdit/documents/${uuidV4()}`}>File Editor</Link> 
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-archive"></i>
                    <Link to={"/home/fileUploader"}>File Uploader</Link> 
                </div>
            <h3 className="text_pad">CHAT</h3>
            <div className="sidebar__link">
              <i className="fa fa-book"></i>
              <Link to={"/home/chat"}>Messages</Link>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-book"></i>
              <a onClick={create}>Group Call</a>
            </div>
            <h3 className="text_pad">LEAVE</h3>
            <div className="sidebar__link">
              <i className="fa fa-question"></i>
              <Link to={"/home/admin_leaves"}>Leave Requests</Link>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-sign-out"></i>
              <Link to={"/home/emp_leaves"}>Leaves </Link>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-calendar"></i>
              <Link to="/home/holidays">Holidays</Link>
            </div>
            <h3 className="text_pad">PAYROLL</h3>
            <div className="sidebar__link">
              <i className="fa fa-money"></i>
              <Link to="/home/employee_salary">Employee Salary</Link>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-briefcase"></i>
              <Link to="/home/payroll_items">Payroll Items</Link>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-briefcase"></i>
              <Link to="/home/payroll_items">Payroll Items</Link>
            </div>
            <div className="sidebar__logout">
              <i className="fa fa-power-off"></i>
              <a href="#">Log out</a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
