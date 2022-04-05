import React from 'react';
import Add_Popup from "./Add_Popup";
import FormAdd from "./FormAdd";
import background from "../../assets/workspace1.png";

function AddSalary() {
    return (
        <main style={{ backgroundImage: `url(${background})`}}>

            <div className="main__container" >
                <h1   style={{color: "#1e90ff",fontSize:"25px"}}><strong style={{color: "#1e90ff",fontSize:"30px"}}>Employee Salary /</strong> Add</h1>
            <Add_Popup  >
                <FormAdd/>
            </Add_Popup>
        </div>
        </main>
    );
}

export default AddSalary;