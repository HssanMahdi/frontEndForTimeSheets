
import React, {useState, useEffect} from 'react'
import axios from "axios";
import {useLocation} from "react-router-dom";
import './searchEmployee.css'

export default function SearchEmployees() {
    const location = useLocation();
    const [employeesSkills, setEmployeesSkills] = useState([]);
    const [workedProjects, setWorkedProjects] = useState([]);
    const idProject = location.state.detail

    useEffect(
        async () => {
            await axios.get("/projects/getEmployeesAccordingToSkills/" + idProject).then(
                (res) => {
                    setEmployeesSkills(res.data.chosenEmployeesSkills)
                   // console.log("employeesSkills",employeesSkills)
                    setWorkedProjects(res.data.workedProjects)
                    //console.log("workedProjects",workedProjects)
                }
            );
        }, []);

    //assign employee to project
    const assignEmployee = async (id) => {
        await axios.put("/projects/assignEmployeeToProject/" + idProject + "/" + id)
            .then(async (success) => {
                alert("assigned successfully");
                await axios.get("/projects/getEmployeesAccordingToSkills/" + idProject).then(
                    (res) => {
                        setEmployeesSkills(res.data.chosenEmployeesSkills)
                        console.log(employeesSkills)
                        setWorkedProjects(res.data.workedProjects)
                        console.log(workedProjects)
                    }
                )
            })
        console.log(id,"assigned","project",idProject)
    }
    return (
        <main>
            <div className="main__container">
                <div className="app-container">
                    <div className="app-header">
                        <div className="app-header-left">
                            <span className="app-icon"/>
                            <p className="app-name">Search employees</p>
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
                            <button className="add-btn" title="Add New Project">
                                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <line x1={12} y1={5} x2={12} y2={19}/>
                                    <line x1={5} y1={12} x2={19} y2={12}/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="app-content">
                        <div className="projects-section">
                            <div className="projects-section-header">
                                <p>According To Projects</p>
                            </div>
                            <div className="project-boxes jsGridView">
                                {workedProjects?.map((emp, key) => {
                                    return <div className="project-box-wrapper">
                                        <div className="project-box" style={{backgroundColor: '#e9e7fd'}}>
                                            <div className="project-box-header" key={emp?._id}>
                                                <div className="days-left" style={{color: '#4f3ff0'}}>
                                                    {emp?.nbRating} reviews: {emp?.rating}
                                                </div>
                                                <div className="dropdown">
                                                    <button type="button" className="btn btn-primary dropdown-toggle"
                                                            data-toggle="dropdown">
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <div className="dropdown-item"
                                                             onClick={() => assignEmployee(emp._id)}>
                                                            <i className="fa fa-times" aria-hidden="true"></i> assign
                                                        </div>
                                                        <div className="dropdown-item" ><i className="fa fa-pencil" aria-hidden="true">show profile</i></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="project-box-content-header">
                                                <p className="box-content-header">{emp?.userName}</p>
                                                <p className="box-content-subheader">{emp?.email}</p>
                                            </div>
                                            <div className="project-box-footer">
                                                <div className="participants">
                                                    <p className="box-progress-header ">
                                                       <span>Worked Projects:</span> <span style={{color:"red"}}> {emp?.projectsWorked?.length}</span>
                                                    </p>
                                                </div>
                                                <div className="days-left" style={{color: '#4f3ff0'}}>
                                                   Skills:  {emp?.skills?.map((skill) => {
                                                        return  <strong>{skill},</strong>   })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="app-content">
                        <div className="projects-section">
                            <div className="projects-section-header">
                                <p>According To Skills</p>
                            </div>
                            <div className="project-boxes jsGridView">
                                {employeesSkills?.map((employee, key) => {
                                    return <div className="project-box-wrapper">
                                        <div className="project-box" style={{backgroundColor: '#AAB6FB'}}>
                                            <div className="project-box-header" key={employee?._id}>
                                                <div className="days-left" style={{color: '#4f3ff0'}}>
                                                    {employee?.nbRating} reviews: {employee?.rating}
                                                </div>
                                                <div className="dropdown">
                                                    <button type="button" className="btn btn-primary dropdown-toggle"
                                                            data-toggle="dropdown">
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <div className="dropdown-item"
                                                             onClick={() => assignEmployee(employee._id)}>
                                                            <i className="fa fa-times" aria-hidden="true"></i> assign
                                                        </div>
                                                        <div className="dropdown-item" ><i className="fa fa-pencil" aria-hidden="true">show profile</i></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="project-box-content-header">
                                                <p className="box-content-header">{employee?.userName}</p>
                                                <p className="box-content-subheader">{employee?.email}</p>
                                            </div>
                                            <div className="project-box-footer">
                                                <div className="participants">
                                                    <p className="box-progress-header ">
                                                        <span> Worked projects:  {employee?.projects?.length}</span>
                                                    </p>
                                                </div>
                                                <div className="days-left" style={{color: '#4f3ff0'}}>
                                                    Skills:  {employee?.skills?.map((skill) => {
                                                    return  <strong>{skill},</strong>   })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </main>
    )
}
