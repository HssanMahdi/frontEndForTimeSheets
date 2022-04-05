import React from 'react';
import Add_Popup from "./Add_Popup";

import background from "../../assets/workspace2.png";
import Overtime_Form from "./Forms/overtime_Form";


function Add_overtime() {
    return (
        <main style={{ backgroundImage: `url(${background})`}}>

            <div className="main__container" >
                <h1   style={{color: "#1e90ff",fontSize:"25px"}}><strong style={{color: "#1e90ff",fontSize:"30px"}}>Payroll Items /</strong> Overtime</h1>
                <Add_Popup  >
                    <Overtime_Form/>
                </Add_Popup>
            </div>
        </main>
    );
}

export default Add_overtime;