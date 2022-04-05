import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

function HolidayForm() {
    const history = useHistory();

    const [holidayDate, setholidayDate] = useState("");
    const [holidayName, setholidayName] = useState("");

    function addSalary() {
        let data = {holidayName,holidayDate}
        fetch("/holidays/add", {
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
                <input type="text" className="form-control" placeholder="HOLIDAY NAME" name="name" value={holidayName}
                       onChange={(e) => {
                           setholidayName(e.target.value)
                       }}/>
            </div>

            <div>
                <label htmlFor="Inputovertime">Date</label>
                <input type="Date" className="form-control"  name="holidayDate" value={holidayDate}
                       onChange={(e) => {
                           setholidayDate(e.target.value)
                       }}/>
            </div>

            <button type="button" className="btn btn-primary"
                    style={{marginTop: "10px", marginLeft: "200px", width: "180px"}} onClick={() => {addSalary();history.push('/holidays')}}>Add
            </button>
        </div>
    );
}

export default HolidayForm;