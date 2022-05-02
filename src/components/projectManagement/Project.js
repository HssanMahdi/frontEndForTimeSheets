import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import './Project.css'
import Popup from './Popup'
import AddProject from './addProject/AddProject'
import axios from "axios";
export default function Project(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonPopupUpdate, setButtonPopupUpdate] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const [startD,setStartD]=useState()
    const [endD,setEndD]=useState()
    const [inProgress, setInProgress] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [finished, setFinished] = useState([]);





    useEffect(
        () => {
            getAllProjects();
        }, [])

    const getAllProjects = async () => {
        var startD=""
        var endD=""
        var tab = []
        await axios.get("/projects/").then(
            (response) => {
                setProjectList(response.data.projects)
                setUpcoming(response.data.upcomingFinal)
                setInProgress(response.data.inProgressFinal)
                setFinished(response.data.finishedFinal)
                console.log(response.data.startDate)
                for(let i=0;i<response.data.projects.length;i++){
                    startD=response.data.projects[i].startDate.split("T")
                    setStartD(startD[0])
                    endD=response.data.projects[i].endDate.split('T');
                    setEndD(endD[0])
                }

            });
    }

    let history = useHistory();

    function updateProject(id)
    {
        console.log(id)
        history.push({
            pathname: '/updateProject',
            state: { detail: id }
        })
    }
 function searchEmployees(id){
     console.log("fromProject",id)
     history.push({
         pathname: '/searchEmployees',
         state: { detail: id }
     });
 }
    function detailsProject(id){
        history.push({
            pathname: '/detailsProject',
            state: { detail: id }
        });
    }
    const deleteProject = async (_id) => {
        await axios.delete(
            "/projects/" + _id).then(res => {
            axios.get("projects/").then(
                (response) => {
                    setProjectList(response.data)
                }
            );
        })
            .catch(err => console.log(err))
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
                                             <span className="status-number">{inProgress?.length}</span>
                                        <span className="status-type">In Progress</span>
                                    </div>
                                    <div className="item-status">
                                        <span className="status-number">{upcoming?.length}</span>
                                        <span className="status-type">Upcoming</span>
                                    </div>
                                    <div className="item-status">
                                        <span className="status-number">{finished?.length}</span>
                                        <span className="status-type">Finished</span>
                                    </div>
                                    <div className="item-status">
                                        <span className="status-number">{projectList?.length}</span>
                                        <span className="status-type">Total</span>
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
                                {projectList?.map((proj, key) => {
                                    return <div className="project-box-wrapper">
                                        <div className="project-box" style={{backgroundColor: '#e9e7fd'}}>
                                            <div className="project-box-header" key={proj?._id}>
                                                <div className="days-left" style={{color: '#4f3ff0'}}>
                                                    Start: {startD}
                                                </div>
                                                <div >
                                                   
                                                    <div >
                                                        <div
                                                             onClick={() => deleteProject(proj._id)}>
                                                            <i className="fa fa-times" aria-hidden="true"></i> delete
                                                        </div>
                                                        <div  onClick={() => {
                                                            updateProject(proj._id)
                                                        }}><i className="fa fa-pencil" aria-hidden="true">edit</i></div>
                                                        <div c onClick={() => {
                                                            detailsProject(proj._id)}}>
                                                            <i className="fa fa-arrow-circle-o-right"
                                                                 aria-hidden="true"></i> more details</div>
                                                                  <div onClick={() => {
                                                            searchEmployees(proj._id)}}>
                                                            <i className="fa fa-arrow-circle-o-right"
                                                                 aria-hidden="true"></i> search</div>
                                                       

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="project-box-content-header">
                                                <p className="box-content-header">{proj?.projectName}</p>
                                                <p className="box-content-subheader">{proj?.description}</p>
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
                                                    <p className="box-progress-header ">{proj?.projectLeader === null ? (
                                                    <span style={{color:"red"}}> add one</span>
                                                ) : (
                                                    <span style={{color:"green"}}>  {proj?.projectLeader?.userName}</span>

                                                )}
                                                </p>
                                                </div>
                                                <div className="days-left" style={{color: '#4f3ff0'}}>
                                                    End : {endD}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <AddProject></AddProject>
                    </Popup>
                

                </div>

            </div>
        </main>

    )
}
