import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import './Project.css'
// import ProjectForm from './addProject/ProjectForm'
// import UpdateProject from './updateProject/UpdateProject'
// import Popup from './Popup'
// import PopupUpdate from './PopupUpdate'

import axios from "axios";
export default function Project(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null)
    const [technologies, setTechnologies] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonPopupUpdate, setButtonPopupUpdate] = useState(false);
    const [projectList, setProjectList] = useState([]);


    useEffect(
        () => {
            getAllProjects();
        }, [])

    const getAllProjects = async () => {
        await axios.get("/projects/").then(
            (response) => {
                setProjectList(response.data)
                //setName(response[0].name)
            }
        );
    }

    let history = useHistory();

    function updateProject(id)
    {

        console.log(id)
        /*history.push({
            pathname: '/updateProject',
            state: { detail: id }*/
        //});
        // props.history.push('/updateProject/'+id)
    }

    function detailsProject(id){
        history.push({
            pathname: '/detailsProject',
            state: { detail: id }
        });
        console.log("from project",id)
    }
    const deleteProject = async (_id) => {
        await axios.delete(
            "/projects/" + _id).then(res => {
            axios.get("projects/").then(
                (response) => {
                    setProjectList(response.data)
                }
            );
            console.log("deleted")
        })
            .catch(err => console.log(err))


        console.log(_id)
    };


    // current day
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


    return (
        <main>
            <div className="main__container">

                <div className="app-container">
                    <div className="app-header">
                        <div className="app-header-left">
                            <span className="app-icon"/>
                            <p className="app-name">Project Management</p>
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
                            {/* <button className="mode-switch" title="Switch Theme">
            </button> */}

                            <button className="add-btn" title="Add New Project" onClick={() => setButtonPopup(true)}>
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
                                <p>Projects</p>
                                <p className="time">Current date: {date}</p>
                            </div>
                            <div className="projects-section-line">
                                <div className="projects-status">
                                    <div className="item-status">
                                        <span className="status-number">45</span>
                                        <span className="status-type">In Progress</span>
                                    </div>
                                    <div className="item-status">
                                        <span className="status-number">24</span>
                                        <span className="status-type">Upcoming</span>
                                    </div>
                                    <div className="item-status">
                                        <span className="status-number">62</span>
                                        <span className="status-type">Total Projects</span>
                                    </div>
                                </div>
                                <div className="view-actions">
                                    {/*<button  className="add-btn"    onClick={() => setButtonPopup(true)}> </button>*/}

                                    <button className="view-btn list-view" title="List View">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="feather feather-list">
                                            <line x1={8} y1={6} x2={21} y2={6}/>
                                            <line x1={8} y1={12} x2={21} y2={12}/>
                                            <line x1={8} y1={18} x2={21} y2={18}/>
                                            <line x1={3} y1={6} x2="3.01" y2={6}/>
                                            <line x1={3} y1={12} x2="3.01" y2={12}/>
                                            <line x1={3} y1={18} x2="3.01" y2={18}/>
                                        </svg>
                                    </button>
                                    <button className="view-btn grid-view active" title="Grid View">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20}
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="feather feather-grid">
                                            <rect x={3} y={3} width={7} height={7}/>
                                            <rect x={14} y={3} width={7} height={7}/>
                                            <rect x={14} y={14} width={7} height={7}/>
                                            <rect x={3} y={14} width={7} height={7}/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="project-boxes jsGridView">
                                {projectList.map((proj, key) => {
                                    return <div className="project-box-wrapper">
                                        <div className="project-box" style={{backgroundColor: '#e9e7fd'}}>
                                            <div className="project-box-header" key={proj._id}>
                                                <div className="days-left" style={{color: '#4f3ff0'}}>
                                                    Start: {proj.startDate}
                                                </div>
                                                <button onClick={() => {
                                                            detailsProject(proj._id)
                                                        }}> details</button>
                                                {/* <div className="dropdown">
                                                    <button type="button" className="btn btn-primary dropdown-toggle"
                                                            data-toggle="dropdown">
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <div className="dropdown-item"
                                                             onClick={() => deleteProject(proj._id)}>
                                                            <i className="fa fa-times" aria-hidden="true"></i> delete
                                                        </div>
                                                        <div className="dropdown-item" ><i className="fa fa-pencil" aria-hidden="true">edit</i></div>
                                                        <div className="dropdown-item" onClick={() => {
                                                            detailsProject(proj._id)
                                                        }}>   <i className="fa fa-arrow-circle-o-right"
                                                                 aria-hidden="true"></i> more details</div>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="project-box-content-header">
                                                <p className="box-content-header">{proj.projectName}</p>
                                                <p className="box-content-subheader">{proj.description}</p>
                                            </div>
                                            <div className="row">
                                                <p className="box-progress-header ">Project leader:{proj?.projectLeader === null ? (
                                                    <button className="add-participant " style={{color: '#4f3ff0'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12}
                                                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                             strokeWidth={3} strokeLinecap="round"
                                                             strokeLinejoin="round" className="feather feather-plus">
                                                            <path d="M12 5v14M5 12h14"/>
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    proj?.projectLeader
                                                )}
                                                </p>
                                            </div>


                                            <div className="box-progress-wrapper">
                                                <p className="box-progress-header">Progress</p>
                                                <div className="box-progress-bar">
                                                    <span className="box-progress"
                                                          style={{width: '50%', backgroundColor: '#4f3ff0'}}/>
                                                </div>
                                                <p className="box-progress-percentage">50%</p>
                                            </div>
                                            <div className="project-box-footer">
                                                <div className="participants">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80"
                                                        alt="participant"/>
                                                    <img
                                                        src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80"
                                                        alt="participant"/>
                                                    <button className="add-participant" style={{color: '#4f3ff0'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12}
                                                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                             strokeWidth={3} strokeLinecap="round"
                                                             strokeLinejoin="round" className="feather feather-plus">
                                                            <path d="M12 5v14M5 12h14"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="days-left" style={{color: '#4f3ff0'}}>
                                                    End : {proj.endDate}
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
