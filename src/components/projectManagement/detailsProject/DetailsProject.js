import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import './DetailsProject.css'
import '../Project.css'

import axios from "axios";

export default function DetailsProject(props) {
    const [data, setData] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);

    const location = useLocation();


    useEffect(
    async () => {
        const id = location.state.detail
        console.log( "hellooo", location.state.detail)
        await axios.get("/projects/"+id).then(
            (response) => {
                setData(response.data.project.tasks)
                setEmployeeList(response.data.tabEmp)
console.log(response.data)
            }
        );
    },

        []
)


    return (
        <main>
            <div className="main__container">
                <div className="main">
                    <div className="container">
                        <div className="app-header">
                            <div className="app-header-left">
                                <span className="app-icon"/>
                                <p className="app-name">Task Management</p>
                                <div className="search-wrapper">
                                    <input className="search-input" type="text" placeholder="Search"/>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none"
                                         stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                         className="feather feather-search" viewBox="0 0 24 24">
                                        <defs/>
                                        <circle cx={11} cy={11} r={8}/>
                                        <path d="M21 21l-4.35-4.35"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="app-header-right">


                                <button className="add-btn" title="Add New Task" >
                                    <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
                                         strokeLinecap="round" strokeLinejoin="round">
                                        <line x1={12} y1={5} x2={12} y2={19}/>
                                        <line x1={5} y1={12} x2={19} y2={12}/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <div className="one-o">
                                    <div className="px-3 pb-4">
                                        <div><img
                                            src="https://img.icons8.com/bubbles/50/000000/blond-short-hair-lady-with-blue-glasses.png"
                                            width={15} className="pic1-o"/><img
                                            src="https://img.icons8.com/bubbles/50/000000/girl-with-chemical-test-tube.png"
                                            width={22} className="pic2-o"/></div>
                                        <div><img
                                            src="https://img.icons8.com/bubbles/100/000000/girl-with-glasses-art-palette.png"
                                            width={65}/></div>
                                        <div><img
                                            src="https://img.icons8.com/bubbles/50/000000/short-curly-hair-girl-gem.png"
                                            width={16} className="pic3-o"/><img
                                            src="https://img.icons8.com/bubbles/50/000000/girl-and-playing-card.png"
                                            width={16} className="pic4-o"/></div>
                                        <div>
                                            <div>  <h4 className="project-o">Add new task + </h4>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="quote-o">Still not enough? Click  to add a new task
                                                .</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="CriticalActions-o col-md-8">

                                <div className="commitment-task-card-o">


                                    <ul className="list-group">
                                        <li className="list-group-item text_pad-o">
                                            <h3>Project Employees</h3> </li>
                                        {employeeList.map((emp, key) => {

                                            return  <li className="list-group-item"><i
                                                className="fa fa-user"></i> {emp.firstName} </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {data.map((task, key) => {
                                return <div className="col-md-6" key={task?._id}>
                                    <div className="CriticalActions-o">
                                        <div className="commitment-task-card-o">
                                            <div className="commitment-task-card-header-o">
                                                <h4 className="commitment-task-card-title-o">
                                                    <span className="commitment-task-type-o"></span>
                                                    {task?.description}
                                                </h4>
                                                <p className="commitment-task-due-date-o">Start: {task?.startDate}</p>
                                                <p className="commitment-task-due-date-o">End: {task?.endDate}</p>


                                            </div>
                                            <div className="commitment-task-card-body-o">{task?.description}
                                            </div>

                                            <div className="commitment-task-card-footer-o">
                                                {task?.employee === null ? (
                                                   <button className="add-participant " style={{color: '#4f3ff0'}}>
                                                       <i
                                                           className="fa fa-user"></i>
                                                       <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12}
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            strokeWidth={3} strokeLinecap="round"
                                                            strokeLinejoin="round" className="feather feather-plus">
                                                           <path d="M12 5v14M5 12h14"/>
                                                       </svg>
                                                   </button>
                                                ) : (
                                                   <a href="#" className="btn btn-link commitment-help-link-o">
                                                       {task?.employee.firstName}  </a>
                                                )}
                                                <span span className="btn btn-default btn-xs">{task?.taskType}</span>
                                                <i className="fa fa-pencil" aria-hidden="true">edit</i>
                                                <i className="fa fa-times" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>

                    </div>

                </div>

            </div>

        </main>
    )

}