import React, {useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from "react-router-dom";

function Addition_Form() {
    const history = useHistory();

    const [date, setDate] = useState("");
    const [amountOfAddition, setAddition] = useState("");
    const [name, setName] = useState("");

    function addSalary() {
        let data = { name,amountOfAddition,date}
        fetch("/additions/add", {
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

            <h2 style={{textAlign: "center", color: "#1e90ff"}}>ADD ADDITION</h2>




            <div>
                <label htmlFor="exampleInputPassword1">Name</label>
                <input type="text" className="form-control" placeholder="NAME" name="name" value={name}
                       onChange={(e) => {
                           setName(e.target.value)
                       }}/>
            </div>
            <div>
                <label htmlFor="Inputaddition">Ammount</label>
                <input type="text" className="form-control" placeholder="0,0$" name="addition" value={amountOfAddition}
                       onChange={(e) => {
                           setAddition(e.target.value)
                       }}/>
            </div>
            <div>
                <label htmlFor="Inputovertime"> Date of addition</label>
                <input type="date" className="form-control"  name="date" value={date}
                       onChange={(e) => {
                           setDate(e.target.value)
                       }}/>
            </div>

            <button type="button" className="btn btn-primary"
                    style={{marginTop: "10px", marginLeft: "200px", width: "180px"}} onClick={() => {addSalary();history.push('/payroll_items')}}>Add
            </button>
        </div>
    );
}

export default Addition_Form;