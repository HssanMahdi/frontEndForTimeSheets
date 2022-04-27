import React, {useEffect, useState} from 'react';
import background from "../../assets/workspace4.png";
import payLogo from "../../assets/req.png";
import {useHistory} from "react-router-dom";
import "../Salary/datagrid.css"
import {Button} from "@mui/material";
import delimg from "../../assets/bin-delete.png";
import {useSelector} from "react-redux";

function EmpLeaves() {
    const history = useHistory();
    const { EmployeeReducer } = useSelector((state) => state);
    const leavesTaken = EmployeeReducer.connectedEmployee.leavesTaken;

    const userName = EmployeeReducer.connectedEmployee.userName;
    const [leaves,setLeaves] = useState([]);
    const [emp, setEmp] = useState([]);
    function refresh(userName) {
        const url = `/leaves/showByName/${userName}`;//api url
        fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setLeaves(resp))//setting response to state overtime
    }

    function findEmp(idE) {
        const url = `/salarys/findEmp/${idE}`;//api url
        fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setEmp(resp))//setting response to state overtime
    }

    useEffect(()=>{refresh(userName)},[]);
    useEffect(()=>{findEmp(EmployeeReducer.connectedEmployee._id)},[]);
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
    return (
        <main style={{ backgroundImage: `url(${background})`}}>

            <div className="main__container" >

                <h1   style={{color: "#1e90ff",fontSize:"25px"}}><strong style={{color: "#1e90ff",fontSize:"30px"}}>Dashboard /</strong> Leaves</h1>



                <div style={{marginTop:"170px"}}>
                    {emp.map((item)=>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="stats-info110">
                                <h6> Total Leaves </h6>
                                <h4>{item.leavesLeft}</h4>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="stats-info110">
                                <h6> Leaves Taken </h6>
                                <h4>{item.leavesTaken}</h4>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="stats-info110">
                                <h6> Leave Left </h6>
                                <h4>{item.leavesLeft-item.leavesTaken}</h4>
                            </div>
                        </div>

                    </div>
                    ) }

                    <div className="payroll-table card">
                        <div className="table-responsive">
                            <table className="table table-hover table-radius">
                                <thead>
                                <tr>
                                    <th>Reason</th>
                                    <th>From</th>
                                    <th>Return on</th>
                                    <th>No of Days</th>
                                    <th>Status</th>
                                    <th className="text-right">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {leaves.map((item)=>

                                    <tr >
                                        <th>{item.reason}</th>
                                        <td>{item.leaveStart.slice(0, 10)}</td>
                                        <td>{item.leaveEnd.slice(0, 10)}</td>
                                        <th>{item.numberOfdays}</th>
                                        <th style={item.status === "Rejected"? {color:"red"}: item.status === "Approved"? {color:"green"}: {color:"darkorange"}}>{item.status}</th>
                                        <td className="text-right">
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
                                                    refresh(userName);
                                                    refresh(userName);
                                                }
                                                }
                                        hidden={item.status=== "Approved"}    >

                                            </Button>
                                        </td>
                                    </tr>
                                )}



                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>



            </div>
            {emp.map((item)=>
            <div  style={{marginLeft:"1000px",marginTop:"30x",marginBottom:"15px"}}>
                <button disabled={item.leavesTaken===item.leavesLeft} type="button" className="btn btn-outline-primary" onClick={()=>history.push('/add_leaves')}><img src={payLogo} alt="BigCo Inc. logo" width={25} height={25} /> New Request</button>

            </div>
                )}
        </main>

    );

}

export default EmpLeaves;