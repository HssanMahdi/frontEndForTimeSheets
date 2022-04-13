import React, { useEffect, useState } from "react";
import "./employees.css"
import hello from "../../assets/employees-group.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import Swal from "sweetalert2";
import { NotificationTwoTone, getTwoToneColor, setTwoToneColor } from "@ant-design/icons";
setTwoToneColor('#17A2B8');
getTwoToneColor('#D7EFEF');
export default function Employees() {
    const { EmployeeReducer } = useSelector((state) => state);
    const [employeesList, setEmployeesList] = useState([]);
    const config = {
        headers: {
            Authorization: `Bearer ${EmployeeReducer.token}`,
        },
    };
    const fetchEmployeesList = async () => {
        const { data } = await axios.get('/employee/', config);
        setEmployeesList(data);
    }
    useEffect(() => {
        fetchEmployeesList();
    }, [])

    const changeState = async (idEmployee, state) => {
        let data = {
            isManager: state
        };
        await axios.put(`/employee/changeemployeestate/${idEmployee}`, data, config)
            .then(fetchEmployeesList())
            .catch((err) => console.log(err))
    }

    const deleteEmployee = async (idEmployee) => {
        await axios.delete(`/employee/${idEmployee}`, config)
            .then(fetchEmployeesList())
            .catch((err) => console.log(err))
    }
    function sweetAlert(employee) {
        if (employee.notifications.length>0){
            let txt = "<ul>"
            employee.notifications?.map((notif, key) => (
                txt+=`<li><span>${notif}</span></li>`
            ))
            txt+="</ul>"
            
            Swal.fire({
                icon: 'error',
                title: `${employee.notifications.length} issues`,
                html: txt,
              })
        }else{
        Swal.fire(
            `No issues`,
            `${employee.userName} is doing a good job`,
            'success'
          )
        }  
      }
    return (
        <main>
            <div className="main__container">
                <div className="main__title ">
                    <img src={hello} alt="hello" />
                    <div className="main__greeting">
                        <h1>Company's employees</h1>
                        <p>List</p>
                    </div>
                </div>
                <hr></hr>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-margin">
                                <div className="card-body">
                                    <h3 style={{ color: "#3984E6" }}>{employeesList.length} employees</h3>
                                    <div className="row search-body">
                                        <div className="col-lg-12">
                                            <div className="search-result">
                                                <div className="result-header">
                                                </div>
                                                <div className="result-body">
                                                    <div className="table-responsive">
                                                        <table className="table widget-26">
                                                            <tbody>
                                                                {employeesList?.map((employee, key) => (
                                                                    <tr key={key}>
                                                                        <td>
                                                                            <div className="widget-26-job-emp-img">
                                                                                <img src={employee.images} alt="Company" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="widget-26-job-title">
                                                                                <span >{employee.userName}</span>
                                                                                <p className="m-0"><a href="#" className="employer-name">Joined the : </a><span className="text-muted time"><Moment format=" DD-MM-YYYY ">{employee.createdAt}</Moment></span></p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="widget-26-job-info">
                                                                                <p className="type m-0">Email :</p>
                                                                                <p className="text-muted m-0">in <span className="location">{employee.email}</span></p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="widget-26-job-salary">$ {employee.hourPrice}/hr</div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="widget-26-job-category bg-soft-info">
                                                                                <i className="indicator bg-info"></i>
                                                                                {employee.isManager ? (
                                                                                    <span>Manager</span>
                                                                                ) :
                                                                                    <span>Employee</span>
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            {employee.isManager ? (
                                                                                <button className="button-29" role="button" onClick={() => changeState(employee._id, false)}>Change to employee</button>
                                                                            ) :
                                                                                <button className="button-29" role="button" onClick={() => changeState(employee._id, true)}>Change to manager</button>
                                                                            }
                                                                        </td>
                                                                        <td style={{ display:'flex'}}>
                                                                            <NotificationTwoTone style={{ fontSize: '27px', marginTop: "2px" }} onClick={() => sweetAlert(employee)}/>                                                                        
                                                                            <div className="icon-trash" onClick={() => deleteEmployee(employee._id)}>
                                                                                <div className="trash-lid" style={{ backgroundColor: "#02A7D7" }}></div>
                                                                                <div className="trash-container" style={{ backgroundColor: "#02A7D7" }}></div>
                                                                                <div className="trash-line-1"></div>
                                                                                <div className="trash-line-2"></div>
                                                                                <div className="trash-line-3"></div>
                                                                            </div>
                                                                        </td>
                                                                        {/* <td>
                                                                        <div className="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    className="feather feather-star starred"
                                                                                >
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td> */}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
