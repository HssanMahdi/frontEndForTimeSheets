import React from 'react';
import Add_Popup from "./Add_Popup";
import FormAdd from "./FormAdd";
import background from "../../assets/workspace2.png";
import Addition_Form from "./Forms/Addition_Form";
import Deductions_Form from "./Forms/deductions_Form";

function AddSalary() {
    return (
        <main style={{ backgroundImage: `url(${background})`}}>

            <div className="main__container" >
                <h1   style={{color: "#1e90ff",fontSize:"25px"}}><strong style={{color: "#1e90ff",fontSize:"30px"}}>Payroll Items /</strong> Deductions</h1>
                <Add_Popup  >
                    <Deductions_Form/>
                </Add_Popup>
            </div>
        </main>
    );
}

export default AddSalary;