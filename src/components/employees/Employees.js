import React, { useEffect, useState } from "react";
import "./employees.css"
import hello from "../../assets/employees-group.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import Moment from "react-moment";

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
    console.log(employeesList)
    return (
        <main>
            <div class="main__container">
                <div class="main__title ">
                    <img src={hello} alt="hello" />
                    <div class="main__greeting">
                        <h1>Company's employees</h1>
                        <p>List</p>
                    </div>
                </div>
                <hr></hr>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="card card-margin">
                                <div class="card-body">
                                    <h3 style={{ color: "#3984E6" }}>{employeesList.length} employees</h3>
                                    <div class="row search-body">
                                        <div class="col-lg-12">
                                            <div class="search-result">
                                                <div class="result-header">
                                                </div>
                                                <div class="result-body">
                                                    <div class="table-responsive">
                                                        <table class="table widget-26">
                                                            <tbody>
                                                                {employeesList?.map((employee, key) => (
                                                                <tr key={key}>
                                                                    <td>
                                                                        <div class="widget-26-job-emp-img">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-title">
                                                                            <span >{employee.userName}</span>
                                                                            <p class="m-0"><a href="#" class="employer-name">Joined the : </a><span class="text-muted time"><Moment format=" DD-MM-YYYY ">{employee.createdAt}</Moment></span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-info">
                                                                            <p class="type m-0">Part-Time</p>
                                                                            <p class="text-muted m-0">in <span class="location">Mumbai, IN</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-salary">$ {employee.hourPrice }/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-category bg-soft-info">
                                                                            <i class="indicator bg-info"></i>
                                                                            <span>Infra Supervision</span>
                                                                        </div>
                                                                    </td>
                                                                    {/* <td>
                                                                        <div class="widget-26-job-starred">
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
                                                                                    class="feather feather-star starred"
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
