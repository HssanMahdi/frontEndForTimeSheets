import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import { useSelector } from "react-redux";

function Leaves_Form() {
    const { EmployeeReducer } = useSelector((state) => state);
    const history = useHistory();
    const [userName, setUserName] = useState(EmployeeReducer.connectedEmployee.userName);
    const [leaveStart, setLeaveStart] = useState("");
    const [numberOfdays, setNumberOfdays] = useState(1);
    const [leaveEnd, setLeaveEnd] = useState("");
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("Pending");
    const [emp, setEmp] = useState([]);
    function addLeaves() {
        let data = { userName,leaveStart,leaveEnd,numberOfdays,reason,status}
        fetch("/leaves/add ", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((resp)=>{})
    }

    function findEmp(idE) {
        const url = `/salarys/findEmp/${idE}`;//api url
        fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setEmp(resp))//setting response to state overtime
    }
    useEffect(()=>{findEmp(EmployeeReducer.connectedEmployee._id)},[]);
    return (
        <div>
            <h2 style={{textAlign: "center", color: "#1e90ff"}}>New Leave Request</h2>




            <div>
                <label htmlFor="exampleInputPassword1">Type</label>
                <select type="text" className="form-control" placeholder="HOLIDAY NAME" name="name" value={reason}
                       onChange={(e) => {
                           setReason(e.target.value)
                       }}>
                    <option value=" ">-------------------------------------- Select TYPE--------------------------------------</option>
                    <option value="Casual Leave ">Casual Leave </option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Earned Leave">Earned Leave</option>

                </select>
            </div>
            {emp.map((item)=>
<div>
    <label htmlFor="Inputovertime">No of Days</label>
    <input type="number" className="form-control"  name="nofdays" value={numberOfdays}  min={0}
           onChange={(e) => {
               setNumberOfdays(e.target.value)
           }}/>
</div>
                )}
            <div>
                <label htmlFor="Inputovertime">From</label>
                <input type="Date" className="form-control"  name="holidayDate" value={leaveStart}
                       onChange={(e) => {
                           setLeaveStart(e.target.value)
                       }}/>
            </div>

            <div>
                <label htmlFor="Inputovertime">Return date</label>
                <input type="Date" className="form-control"  name="holidayDate" value={leaveEnd}
                       onChange={(e) => {
                           setLeaveEnd(e.target.value)
                       }}/>
            </div>
            <button type="button" className="btn btn-primary"
                    style={{marginTop: "10px", marginLeft: "200px", width: "180px"}} onClick={() => {addLeaves();history.push('home/emp_leaves')}}>send request
            </button>
        </div>
    );
}

export default Leaves_Form;