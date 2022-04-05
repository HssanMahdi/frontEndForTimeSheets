import React, {useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from "react-router-dom";

function Overtime_Form() {
    const history = useHistory();

    
    const [hourlyRate, SethourlyRate] = useState("");
    const [name, setName] = useState("");
    const [working_hours_per_day, Setworking_hours_per_day] = useState("");
    function addSalary() {
        let data = { name,hourlyRate,working_hours_per_day}
        fetch("/overtime/add", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }).then((resp)=>{

        })

    }
    return (
        <div>

            <h2 style={{textAlign: "center", color: "#1e90ff"}}>ADD OVERTIME</h2>




            <div>
                <label htmlFor="exampleInputPassword1">Name</label>
                <select type="text" className="form-control" placeholder="NAME" name="name" value={name}
                       onChange={(e) => {
                           setName(e.target.value)
                       }}>
                    <option>---Overtime Day---</option>
                    <option>Normal day</option>
                        <option>Rest day</option>
                    <option>Public holiday</option>

                </select>
            </div>
            <div>
                <label htmlFor="Inputaddition">Hourly Rate *</label>
                <input type="text" className="form-control" placeholder="0,0 x Hour" name="addition" value={hourlyRate}
                       onChange={(e) => {
                           SethourlyRate(e.target.value)
                       }}/>
            </div>
            <div>
                <label htmlFor="Inputaddition">Working hours per day</label>
                <input type="text" className="form-control" placeholder="0,0 Hour" name="working hours" value={working_hours_per_day}
                       onChange={(e) => {
                           Setworking_hours_per_day(e.target.value)
                       }}/>
            </div>

            <button type="button" className="btn btn-primary"
                    style={{marginTop: "10px", marginLeft: "200px", width: "180px"}} onClick={() => {addSalary();history.push('/overtime')}}>Add
            </button>
        </div>
    );
}

export default Overtime_Form;