import React, {useState} from 'react';
import Table_salary from "./Table_salary";
import payLogo from '../../assets/paylogo.png';
import background from "../../assets/workspace1.png";
import {useHistory} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function calculate_salarys()
{
    await fetch(`/calculSalary/calculateSalary`,
        {
            method: 'GET'
        }).then((result) => {
        result.json().then((resp) => {
            console.warn(resp)

        })
    })
notify();
}
const notify = () => toast.success('Salary Calculated', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
function Salary() {
    const history = useHistory();



    return (

        <main style={{ backgroundImage: `url(${background})`}}>

            <div className="main__container" >
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <h1   style={{color: "#1e90ff",fontSize:"25px"}}><strong style={{color: "#1e90ff",fontSize:"30px"}}>Dashboard /</strong> Employee Salary</h1>

                <div  style={{marginLeft:"1000px",marginTop:"180px"}}>
                    <button type="button" className="btn btn-outline-primary" onClick={()=>history.push('/add_salary')}><img src={payLogo} alt="BigCo Inc. logo" width={25} height={25} /> Add  Salary</button>

                </div>

                <div>
                    <Table_salary/>

                </div>
                <div  style={{marginLeft:"950px",marginTop:"10px"}}>
                    <button type="button" className="btn btn-outline-primary" onClick={calculate_salarys}><img src={payLogo} alt="BigCo Inc. logo" width={25} height={25} /> Calculate All Salaries</button>

                </div>


        </div>
        </main>
    );
}

export default Salary;