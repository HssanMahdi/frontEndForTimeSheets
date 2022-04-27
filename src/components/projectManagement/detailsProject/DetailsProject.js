import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import './DetailsProject.css'
import axios from "axios";

export default function DetailsProject(props) {
    const [emp, setEmp] = useState();
    const [empForProject, setEmpForProject] = useState();
    const [taskList, setTaskList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [projectLeader, setProjectLeader] = useState([])
    const [allEmployeeList, setAllEmployeeList] = useState([]);
    const [startD, setStartD] = useState()
    const [endD, setEndD] = useState()
    const location = useLocation();
    const [idTask, setIdTask] = useState();
    const [taskName, setTaskName] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [description, setDescription] = useState();
    const [editTask, setEditTask] = useState()
    const [idProjectLeader, setIdProjectLeader] = useState();
        const [idEmp, setIdEmp] = useState({
        taskNamee: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    const affiche = (id) => {
        setIdTask(id);
    }

    const afficheTask = (task) => {
        setEditTask(task)
    }

    const afficheEmp = (id) => {
        setIdEmp(id);
    }
    const afficheProjectLeader = (id) => {
        setIdProjectLeader(id);
        console.log(idProjectLeader)
    }
    const idProject = location.state.detail

    useEffect(
        async () => {
            var startD = ""
            var endD = ""
            await axios.get("/projects/" + idProject).then(
                (response) => {
                    setTaskList(response.data.tasks)
                    setEmployeeList(response.data.employees)
                    setProjectLeader(response.data.projectLeader)
                    for (let i = 0; i < response.data.tasks.length; i++) {
                        startD = response.data.tasks[i].startDate.split("T")
                        setStartD(startD[0])
                        endD = response.data.tasks[i].endDate.split('T');
                        setEndD(endD[0])
                    }
                }
            );
        },
        []
    )
    useEffect(
        async () => {
            await axios.get("/projects/allEmployees").then(
                (res) => {
                    setAllEmployeeList(res.data)
                }
            );
        }, []
    )
    // delete task from project
    const deleteTask = async (_id) => {
        await axios.delete(
            "/projects/deleteTask/" + _id).then(res => {
            axios.get("/projects/" + idProject).then(
                (response) => {
                    setTaskList(response.data.tasks)
                    setEmployeeList(response.data.employees)
                    setProjectLeader(response.data.projectLeader)
                });
        })
            .catch(err => console.log(err))
    };
    // delete employee from project
    const deleteEmployee = async () => {
        await axios.delete("/projects/deleteEmployeeFromProject/" + idProject + "/" + idEmp)
            .then(res => {
            axios.get("/projects/" + idProject)
                .then(
                (response) => {
                    setTaskList(response.data.tasks)
                    setEmployeeList(response.data.employees)
                    setProjectLeader(response.data.projectLeader)
                }
            );
        })
            .catch(err => console.log(err))
    };

    //delete project Leader from project
    const deleteProjectLeader= async()=>{
        await axios.delete("/projects/deleteProjectLeaderFromProject/" + idProject)
            .then(res => {
                axios.get("/projects/" + idProject)
                    .then(
                        (response) => {
                            setTaskList(response.data.tasks)
                            setEmployeeList(response.data.employees)
                            setProjectLeader(response.data.projectLeader)
                        }
                    );
            })
            .catch(err => console.log(err))
    }
    /* assign employee to task*/
    const AssignEmployee = async () => {
        await axios.put("/projects/assignEmployeeToTask/" + idTask + "/" + emp)
            .then(res => {
                axios.get("/projects/" + idProject).then(
                    (response) => {
                        setTaskList(response.data.tasks)
                        setEmployeeList(response.data.employees)
                        setProjectLeader(response.data.projectLeader)
                    });
            });
    }
    /* add new task*/
    const handleSubmit = async e => {
        e.preventDefault()
        const res = await axios.post("/projects/addTask/" + idProject, {
            taskName: taskName,
            description: description,
            startDate: startDate,
            endDate: endDate,
        }).then(res => {
            axios.get("/projects/" + idProject).then(
                (response) => {
                    setTaskList(response.data.tasks)
                    setEmployeeList(response.data.employees)
                    setProjectLeader(response.data.projectLeader)
                });
        })
    }

    /* edit task */
    async function submit(e) {
        e.preventDefault()
        const id = editTask._id
        console.log("hhhh", editTask)
        await axios.patch("/projects/updateTask/" + id, editTask)
            .then(res => {
                axios.get("/projects/allEmployees").then(
                        (res) => {
                            setAllEmployeeList(res.data)
                        }
                    );
                     }).catch(err => console.error(err))
    }

    const handle = e => {
        const {name, value} = e.target;
        setEditTask({...editTask, [name]: value});
    }
    /*add employee to project*/
    const AddEmployeeToProject = async () => {
        console.log("id", idProject)
        console.log("emp", empForProject)
        await axios.put("/projects/assignEmployeeToProject/" + idProject + "/" + empForProject)
            .then(res => {
            axios.get("/projects/" + idProject).then(
                (response) => {
                    setTaskList(response.data.tasks)
                    setEmployeeList(response.data.employees)
                    setProjectLeader(response.data.projectLeader)
                });
        });
    }
/* Add Project Leader to Project*/
    const addProjectLeader=async()=> {
        await axios.put("/projects/assignProjectLeaderToProject/" + idProject + "/" + emp)
            .then(res => {
                axios.get("/projects/" + idProject).then(
                    (response) => {
                        setTaskList(response.data.tasks)
                        setEmployeeList(response.data.employees)
                        setProjectLeader(response.data.projectLeader)
                    });
            });
    }
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
                                         stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                         strokeWidth={2}
                                         className="feather feather-search" viewBox="0 0 24 24">
                                        <defs/>
                                        <circle cx={11} cy={11} r={8}/>
                                        <path d="M21 21l-4.35-4.35"/>
                                    </svg>


                                </div>
                            </div>
                            <div className="app-header-right">

                                <a href="#newTaskModal" data-toggle="modal">
                                    <button className="add-btn" title="Add New Task">
                                        <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width={16}
                                             height={16}
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
                                             strokeLinecap="round" strokeLinejoin="round">
                                            <line x1={12} y1={5} x2={12} y2={19}/>
                                            <line x1={5} y1={12} x2={19} y2={12}/>
                                        </svg>
                                    </button>
                                </a>

                            </div>
                        </div>

                        <div className="row">
                            <div className="row">
                                {taskList.map((task, key) => {
                                    return <div className="col-md-6" key={task?._id}>
                                        <div className="CriticalActions-o">
                                            <div className="commitment-task-card-o">
                                                <div className="commitment-task-card-header-o">
                                                    <h4 className="commitment-task-card-title-o">
                                                        <span className="commitment-task-type-o"></span>
                                                        {task?.taskName}
                                                    </h4>
                                                    <p className="commitment-task-due-date-o">Start: {startD}</p>
                                                    <p className="commitment-task-due-date-o">End: {endD}</p>
                                                </div>
                                                <div className="commitment-task-card-body-o">{task?.description}
                                                </div>
                                                <div className="commitment-task-card-footer-o">
                                                    {task?.employee === null ? (
                                                        <a href="#addEmployeeModal"
                                                           onClick={() => affiche(task._id)}
                                                           data-toggle="modal"> <i className="fa fa-user"></i>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={12}
                                                                 height={12}
                                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                 strokeWidth={3} strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                                 className="feather feather-plus">
                                                                <path d="M12 5v14M5 12h14"/>
                                                            </svg>
                                                        </a>
                                                    ) : (
                                                        <a href="#addEmployeeModal" className="btn btn-link commitment-help-link-o"
                                                           onClick={() => affiche(task._id)}
                                                           data-toggle="modal">
                                                            {task?.employee?.userName}  </a>
                                                    )}
                                                    <span span
                                                          className="btn btn-default btn-xs">{task?.taskType}</span>
                                                    <a href="#editTaskModal" data-toggle="modal"
                                                       onClick={() => afficheTask(task)}>
                                                        <i className='fa fa-edit' style={{color: 'blue'}}></i></a>
                                                    <i className="fa fa-times" style={{color: 'red'}} aria-hidden="true"
                                                       onClick={() => deleteTask(task._id)}></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                            {/*new task modal*/}
                            <div id="newTaskModal" className="modal fade">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <form onSubmit={handleSubmit}>
                                            <div className="modal-header">
                                                <h4 className="modal-title">Add Task</h4>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-hidden="true">×
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-group">
                                                    <label>task Name</label>
                                                    <input type="text" className="form-control" required
                                                           value={taskName}
                                                           onChange={(event) => {
                                                               setTaskName(event.target.value)
                                                           }}/>
                                                </div>
                                                <div className="form-group">
                                                    <label>description</label>
                                                    <input type="text" className="form-control" required
                                                           value={description}
                                                           onChange={(event) => {
                                                               setDescription(event.target.value)
                                                           }}/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Start Date</label>
                                                    <input type="date" className="form-control" required
                                                           value={startDate}
                                                           onChange={(event) => {
                                                               setStartDate(event.target.value)
                                                           }}/>
                                                </div>
                                                <div className="form-group">
                                                    <label>End Date</label>
                                                    <input type="date" className="form-control" required
                                                           value={endDate}
                                                           onChange={(event) => {
                                                               setEndDate(event.target.value)
                                                           }}/>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <input type="button" className="btn btn-default" data-dismiss="modal"
                                                       defaultValue="Cancel"/>
                                                <input type="submit" className="btn btn-success" defaultValue="Add"/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/*Edit Modal task*/}
                            <div id="editTaskModal" className="modal fade">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <form onSubmit={submit}>
                                            <div className="modal-header">
                                                <h4 className="modal-title">Edit Task</h4>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-hidden="true">×
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-group">
                                                    <label> Task Name</label>
                                                    <input type="text" className="form-control" required
                                                           defaultValue={editTask?.taskName} name="taskName"
                                                           onChange={handle}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Description</label>
                                                    <input type="text" className="form-control" required
                                                           name="description"
                                                           defaultValue={editTask?.description}
                                                           onChange={handle}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>startDate</label>
                                                    <input type="text" className="form-control" required
                                                           defaultValue={editTask?.startDate}
                                                           onChange={handle}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>End Date</label>
                                                    <input type="text" className="form-control" required
                                                           defaultValue={editTask?.endDate}
                                                           onChange={handle}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <input type="button" className="btn btn-default" data-dismiss="modal"
                                                       defaultValue="Cancel"/>
                                                <button type="submit" className="btn btn-success" defaultValue="Add"> submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div id="addEmployeeModal" className="modal fade">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <form>
                                            <div className="modal-header">
                                                <h4 className="modal-title">Add Employee To Task</h4>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-hidden="true">×
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="container p-5">
                                                    <select
                                                        className="custom-select"
                                                        value={emp}
                                                        onChange={(e) => {
                                                            const selectedemp = e.target.value;
                                                            setEmp(selectedemp);
                                                        }}
                                                    >
                                                        <option>select employee</option>
                                                        {employeeList.map((employee, key) => {
                                                            return <option
                                                                value={employee._id}> {employee.userName}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <input type="button" className="btn btn-default"
                                                       data-dismiss="modal" defaultValue="Cancel"/>
                                                <input type="button" className="btn btn-success" value="add"
                                                       onClick={() => AssignEmployee()}/>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/*Edit Modal HTML*/}
                            <div id="editEmployeeModal" className="modal fade">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <form>
                                            <div className="modal-header">
                                                <h4 className="modal-title">Add New Employee To Project </h4>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-hidden="true">×
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="container p-5">
                                                    <select
                                                        className="custom-select"
                                                        value={empForProject}
                                                        onChange={(e) => {
                                                            const selectedemployee = e.target.value;
                                                            console.log(e.target.value)
                                                            setEmpForProject(selectedemployee);
                                                        }}
                                                    >
                                                        {allEmployeeList?.map((employee, key) => {
                                                            return <option
                                                                value={employee._id}> {employee.userName}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <input type="button" className="btn btn-default"
                                                       data-dismiss="modal" defaultValue="Cancel"/>
                                                <input type="button" className="btn btn-info" defaultValue="Save"
                                                       onClick={() => AddEmployeeToProject()}/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/*  Delete Modal HTML*/}
                            <div id="deleteEmployeeModal" className="modal fade">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <form>
                                            <div className="modal-header">
                                                <h4 className="modal-title">Delete Employee</h4>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-hidden="true">×
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Are you sure you want to delete these Records?</p>
                                                <p className="text-warning"><small>This action cannot be
                                                    undone.</small></p>
                                            </div>
                                            <div className="modal-footer">
                                                <input type="button" className="btn btn-default"
                                                       data-dismiss="modal" defaultValue="Cancel"/>
                                                <input type="button" className="btn btn-danger"
                                                       onClick={() => deleteEmployee()}
                                                       defaultValue="Delete"/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table-wrapper">
                            <div className="table-title">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h2>Employees <b>Management</b></h2>
                                    </div>
                                    <div className="col-sm-6">
                                        <a href="#editEmployeeModal" className="btn btn-success" style={{backgroundColor:'#007bff'}}
                                           data-toggle="modal"><i className="material-icons"></i> <span>Add New Employee</span></a>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th>
                    <span className="custom-checkbox">
                      <input type="checkbox" id="selectAll"/>
                      <label htmlFor="selectAll"/>
                    </span>
                                    </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>designation</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                    <span className="custom-checkbox">
                      <input type="checkbox" id="checkbox1" name="options[]" defaultValue={1}/>
                      <label htmlFor="checkbox1"/>
                    </span>
                                    </td>
                                    <td>{projectLeader?.userName}</td>
                                    <td>{projectLeader?.email}</td>
                                    <td>project leader</td>
                                    <td>
                                        <i className='fa fa-eye'></i>
                                        {projectLeader === null ? (
                                            <a href="#addProjectLeaderModal"
                                               data-toggle="modal"> <i className="fa fa-user"></i>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={12}
                                                     height={12}
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     strokeWidth={3} strokeLinecap="round"
                                                     strokeLinejoin="round"
                                                     className="feather feather-plus">
                                                    <path d="M12 5v14M5 12h14"/>
                                                </svg>
                                            </a>
                                        ) : (
                                        <a href="#deleteProjectLeaderModal" className="delete"
                                           onClick={() => afficheProjectLeader(projectLeader?._id)}
                                           data-toggle="modal">
                                            <i className="fa fa-times" style={{color: 'red'}} aria-hidden="true"></i></a>
                                        )}
                                    </td>
                                </tr>
                                {employeeList.map((emp, key) => {
                                    return <tr>
                                        <td>
                    <span className="custom-checkbox">
                      <input type="checkbox" id="checkbox1" name="options[]" defaultValue={1}/>
                      <label htmlFor="checkbox1"/>
                    </span>
                                        </td>
                                        <td>{emp.userName}</td>
                                        <td>{emp.email}</td>
                                        <td>developper</td>
                                        <td>
                                            <i className='fa fa-eye'></i>
                                            <a href="#deleteEmployeeModal" className="delete"
                                               onClick={() => afficheEmp(emp._id)}
                                               data-toggle="modal">
                                                <i className="fa fa-times" style={{color: 'red'}}
                                                   aria-hidden="true"></i></a>
                                        </td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
                {/*  Delete Project Leader Modal HTML*/}
                <div id="deleteProjectLeaderModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form>
                                <div className="modal-header">
                                    <h4 className="modal-title">Delete project Leader</h4>
                                    <button type="button" className="close" data-dismiss="modal"
                                            aria-hidden="true">×
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete these Records?</p>
                                    <p className="text-warning"><small>This action cannot be
                                        undone.</small></p>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default"
                                           data-dismiss="modal" defaultValue="Cancel"/>
                                    <input type="button" className="btn btn-danger"
                                           onClick={() => deleteProjectLeader()}
                                           defaultValue="Delete"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*  Add Project Leader Modal HTML*/}
                <div id="addProjectLeaderModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form>
                                <div className="modal-header">
                                    <h4 className="modal-title">Add Project Leader To Project</h4>
                                    <button type="button" className="close" data-dismiss="modal"
                                            aria-hidden="true">×
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="container p-5">
                                        <select
                                            className="custom-select"
                                            value={emp}
                                            onChange={(e) => {
                                                const selectedemp = e.target.value;
                                                console.log("selectedEmp", e.target.value)
                                                console.log("selected", selectedemp)
                                                setEmp(selectedemp);
                                            }}
                                        >
                                            <option>select employee</option>
                                            {employeeList.map((employee, key) => {
                                                return <option
                                                    value={employee._id}> {employee.userName}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default"
                                           data-dismiss="modal" defaultValue="Cancel"/>
                                    <input type="button" className="btn btn-success" value="add"
                                           onClick={() => addProjectLeader()}/>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </main>
    )

}