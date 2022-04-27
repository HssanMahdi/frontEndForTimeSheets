import React from 'react';
import background from "../../../assets/workspace4.png";
import Add_Popup from "../../Salary/Add_Popup";
import Leaves_Form from "./Leaves_Form";


function AddLeave() {

    return (
        <main style={{ backgroundImage: `url(${background})`}}>

            <div className="main__container" >
                <h1   style={{color: "#1e90ff",fontSize:"25px"}}><strong style={{color: "#1e90ff",fontSize:"30px"}}>Dashboard /</strong> Leaves</h1>
                <Add_Popup  >
                    <Leaves_Form/>
                </Add_Popup>
            </div>
        </main>
    );
}

export default AddLeave;