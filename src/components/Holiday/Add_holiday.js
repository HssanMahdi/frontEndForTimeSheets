import React from 'react';
import background from "../../assets/workspace3.png";
import Add_Popup from "../Salary/Add_Popup";
import Addition_Form from "../Salary/Forms/Addition_Form";
import Holiday_Form from "./Forms/Holiday_Form";

function AddHoliday(props) {
    return (
        <main style={{ backgroundImage: `url(${background})`}}>

            <div className="main__container" >
                <h1   style={{color: "#1e90ff",fontSize:"25px"}}><strong style={{color: "#1e90ff",fontSize:"30px"}}>Dashboard /</strong> Holidays</h1>
                <Add_Popup  >
                    <Holiday_Form/>
                </Add_Popup>
            </div>
        </main>
    );
}

export default AddHoliday;