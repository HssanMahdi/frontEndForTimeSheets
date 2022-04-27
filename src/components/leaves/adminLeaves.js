import React, {useEffect, useState} from 'react';
import background from "../../assets/workspace4.png";
import {Button} from "@mui/material";
import delimg from "../../assets/bin-delete.png";
import approvimg from "../../assets/approve.png";
import rejectimg from "../../assets/reject.png";
import {useHistory} from "react-router-dom";
import resimg from "../../assets/reset.png";
import approvimg2 from "../../assets/approve2.png";
function AdminLeaves() {
    const history = useHistory();
    const [leaves, setLeaves] = useState([]);
    const [pendingleaves, setPendingleaves] = useState([]);
    const [todayleaves, setTodayleaves] = useState([]);
    const [allemployees, setAllemployees] = useState([]);
    const [Ml, setMl] = useState(18);
    async function countPending() {
        const url = '/leaves/pending';//api url
        await fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setPendingleaves(resp))//setting response to state overtime

    }

    async function countTodayleaves() {
        const url = '/leaves/plannedToday';//api url
        await fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setTodayleaves(resp))//setting response to state overtime

    }

    function refresh() {
        const url = '/leaves/show';//api url
        fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setLeaves(resp))//setting response to state overtime
    }



    useEffect(() => {
        const url = '/salarys/showEmp';//api url
        fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setAllemployees(resp))//setting response to state employees
    }, []);

    useEffect(() => {
        refresh()
    }, []);
    useEffect(() => {
        countPending()
    }, []);

    useEffect(() => {
        countTodayleaves()
    }, []);

    function Delete(id) {
        fetch(`/leaves/delete/${id}`,
            {
                method: 'DELETE'
            }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }

    function DeleteAll() {
        fetch(`/leaves/deleteAll`
            ).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }

    function ResetMaxLeaves(Ml) {
        fetch(`/leaves/resetLeaves/${Ml}`
           ).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }

    function updateStatus(id, status) {
        const url = `/leaves/updateStatus/${id}/${status}`;//api url
        fetch(url).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })

    }


    function paidLeave(userName, noDays) {
        const url = `/leaves/paidLeave/${userName}/${noDays}`;//api url
        fetch(url).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })

    }

    function updateTaken(userName,nbdays) {
        const url = `/leaves/updateTaken/${userName}/${nbdays}`;//api url
        fetch(url).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }

    return (
        <main style={{backgroundImage: `url(${background})`}}>

            <div className="main__container">

                <h1 style={{color: "#1e90ff", fontSize: "25px"}}><strong style={{color: "#1e90ff", fontSize: "30px"}}>Dashboard
                    /</strong> Leaves</h1>


                <div style={{marginTop: "170px"}}>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="stats-info110">
                                <h6> Today Presents </h6>
                                <h4>{allemployees.length-todayleaves.length}/{allemployees.length}</h4>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="stats-info110">
                                <h6> Planned Leaves </h6>
                                <h4>{todayleaves.length}<small>Today</small></h4>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="stats-info110">
                                <h6> Pending Requests </h6>
                                <h4>{pendingleaves.length}</h4>
                            </div>
                        </div>

                    </div>

                    <div className="payroll-table card">
                        <div className="table-responsive">
                            <table className="table table-hover table-radius">
                                <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Reason</th>
                                    <th> From</th>
                                    <th> Return on</th>
                                    <th>No of Days</th>
                                    <th>Status</th>
                                    <th className="text-right">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {leaves.map((item) =>
                                    <tr>
                                        <th>{item.userName}</th>
                                        <th>{item.reason}</th>
                                        <td>{item.leaveStart.slice(0, 10)}</td>
                                        <td>{item.leaveEnd.slice(0, 10)}</td>
                                        <th>{item.numberOfdays}</th>
                                        <th style={item.status === "Rejected" ? {color: "red"} : item.status === "Approved" ? {color: "green"} : {color: "darkorange"}}>{item.status}</th>
                                        <td className="text-right">

                                            <Button
                                                title={" Accept paid leave"}
                                                style={{
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundImage: `url(${approvimg})`,
                                                    border: "none",
                                                    outline: "none",
                                                    height: "40px",


                                                }}
                                                onClick={() => {
                                                    updateStatus(item._id, "Approved");
                                                    refresh();
                                                    refresh();
                                                    countPending();
                                                    countTodayleaves();
                                                    updateTaken(item.userName,item.numberOfdays);
                                                    paidLeave(item.userName,item.numberOfdays);
                                                }
                                                }
                                                hidden={item.status=== "Approved"}
                                            >

                                            </Button>

                                            <Button
                                                title={" Accept unpaid leave"}
                                                style={{
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundImage: `url(${approvimg2})`,
                                                    border: "none",
                                                    outline: "none",
                                                    height: "40px",


                                                }}
                                                onClick={() => {
                                                    updateStatus(item._id, "Approved");
                                                    refresh();
                                                    refresh();
                                                    countPending();
                                                    countTodayleaves();
                                                    updateTaken(item.userName,item.numberOfdays);
                                                }
                                                }
                                                hidden={item.status=== "Approved"}
                                            >

                                            </Button>

                                            <Button
                                                style={{
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundImage: `url(${rejectimg})`,
                                                    border: "none",
                                                    outline: "none",
                                                    height: "40px",


                                                }}
                                                onClick={() => {
                                                    updateStatus(item._id, "Rejected");
                                                    refresh();
                                                    refresh();
                                                    countPending();
                                                    countTodayleaves();
                                                }
                                                }
                                                hidden={item.status=== "Approved"}
                                            >

                                            </Button>

                                            <Button
                                                style={{
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundImage: `url(${delimg})`,
                                                    border: "none",
                                                    outline: "none",
                                                    height: "40px",


                                                }}
                                                onClick={() => {
                                                    Delete(item._id);
                                                    refresh();
                                                    refresh();
                                                    countPending();
                                                    countTodayleaves();
                                                }
                                                }
                                                hidden={item.status=== "Approved"}
                                            >

                                            </Button>
                                        </td>
                                    </tr>
                                )}


                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div style={{marginTop:"20px",marginBottom:"20px",marginLeft:"950px"}}>
                        <input type={"number"} placeholder={"Total leaves "} height={"40px"} style={{borderColor:"indianred",width:"100px"}} value={Ml}
                               onChange={(e) => {
                                   setMl(e.target.value)
                               }}/>
                        <button className={"btn btn-danger"} onClick={() => { if (window.confirm('Are you sure you wish to reset all leaves ?')) {ResetMaxLeaves(Ml);DeleteAll();countTodayleaves();refresh();refresh() } } }
                               title={"reset all leaves"}
                                style={{

                                    marginLeft:"10px",
                                    fontSize:"12px"

                                }}
                        > Reset</button>


                    </div>
                </div>


            </div>

        </main>
    );
}

export default AdminLeaves;