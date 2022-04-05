import React, {useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from "react-router-dom";

function Deductions_Form() {
    const history = useHistory();


    const [deductedAmount, SetdeductedAmount] = useState("");
    const [name, setName] = useState("");

    function addSalary() {
        let data = { name,deductedAmount}
        fetch("/deductions/add", {
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

            <h2 style={{textAlign: "center", color: "#1e90ff"}}>ADD DEDUCTION</h2>




            <div>
                <label htmlFor="exampleInputPassword1">Name</label>
                <input type="text" className="form-control" placeholder="NAME" name="name" value={name}
                       onChange={(e) => {
                           setName(e.target.value)
                       }}/>
            </div>
            <div>
                <label htmlFor="Inputaddition">Ammount</label>
                <input type="text" className="form-control" placeholder="0,0$" name="addition" value={deductedAmount}
                       onChange={(e) => {
                           SetdeductedAmount(e.target.value)
                       }}/>
            </div>


            <button type="button" className="btn btn-primary"
                    style={{marginTop: "10px", marginLeft: "200px", width: "180px"}} onClick={() => {addSalary();history.push('/deductions')}}>Add
            </button>
        </div>
    );
}
export default Deductions_Form;