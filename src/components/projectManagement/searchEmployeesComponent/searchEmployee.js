
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
                <div className="app-container-o">
                    <div className="app-header-o">
                        <div className="app-header-left-o">
                            <span className="app-icon-o"/>
                            <p className="app-name-o">Search employees</p>
                            <div className="search-wrapper-o">
                                <input className="search-input-o" type="text" placeholder="Search"/>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none"
                                     stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                     className="feather feather-search" viewBox="0 0 24 24">
                                    <defs/>
                                    <circle cx={11} cy={11} r={8}/>
                                    <path d="M21 21l-4.35-4.35"/>
                                </svg>
                            </div>
                        </div>
                        <div className="app-header-right-o">
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
                    <div className="app-content-o">
                        <div className="projects-section-o">
                            <div className="projects-section-header-o">
                                <p>According To Projects</p>
                            </div>
                            <div className="project-boxes-o jsGridView-o">
                                {workedProjects?.map((emp, key) => {
                                    return <div className="project-box-wrapper-o">
                                        <div className="project-box-o" style={{backgroundColor: '#e9e7fd'}}>
                                            <div className="project-box-header-o" key={emp?._id}>
                                                <div className="days-left" style={{color: '#4f3ff0'}}>
                                                    {emp?.nbRating} reviews: {emp?.rating}
                                                </div>
                                              
                                                    <button type="button" className="btn btn-primary"
                                                              onClick={() => assignEmployee(emp._id)} > assign
                                                    </button>
                                                    
                                              
                                            </div>
                                            <div className="project-box-content-header-o">
                                                <p className="box-content-header-o">{emp?.userName}</p>
                                                <p className="box-content-subheader-o">{emp?.email}</p>
                                            </div>
                                            <div className="project-box-footer-o">
                                                <div className="participants-o">
                                                    <p className="box-progress-header-o ">
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

                    <div className="app-content-o">
                        <div className="projects-section-o">
                            <div className="projects-section-header-o">
                                <p>According To Skills</p>
                            </div>
                            <div className="project-boxes-o jsGridView-o">
                                {employeesSkills?.map((employee, key) => {
                                    return <div className="project-box-wrapper-o">
                                        <div className="project-box-o" style={{backgroundColor: '#AAB6FB'}}>
                                            <div className="project-box-header-o" key={employee?._id}>
                                                <div className="days-left" style={{color: '#4f3ff0'}}>
                                                    {employee?.nbRating} reviews: {employee?.rating}
                                                </div>
                                                <button type="button" className="btn btn-primary"
                                                              onClick={() => assignEmployee(employee._id)} > assign
                                                    </button>
                                            </div>
                                            <div className="project-box-content-header-o">
                                                <p className="box-content-header-o">{employee?.userName}</p>
                                                <p className="box-content-subheader-o">{employee?.email}</p>
                                            </div>
                                            <div className="project-box-footer-o">
                                                <div className="participants-o">
                                                    <p className="box-progress-header-o ">
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
