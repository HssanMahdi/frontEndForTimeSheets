import React, {useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from "react-router-dom";

function FormAdd() {
    const history = useHistory();
    const notify = () => toast.success('Salary Created', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });;
    const [employees, setEmployees] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [addition, setAddition] = useState("");
    const [overtime, setOvertime] = useState("");
    const [deductions, setDeductions] = useState("");
    const [totalSalary, setTotalSalary] = useState("");
    const [userName, setUserName] = useState("");
    const [allemployees,setAllemployees]=useState([]);
    function addSalary() {
        let data = {employees, month, year, addition, overtime, deductions, totalSalary,userName}
        fetch("/salarys/add", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }).then((resp)=>{
            console.log("resp",resp);
            console.log("emp",employees)
        })

    }
    useEffect(()=>{
        const url='/salarys/showEmp';//api url
        fetch(url).then(resp=>resp.json())//calling url by method GET
            .then(resp=>setAllemployees(resp))//setting response to state employees
    },[])
    return (
        <div>
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
            <h2 style={{textAlign: "center", color: "#1e90ff"}}>ADD SALARY</h2>
            <div>
                <label htmlFor="Inputemployee">Employee ID</label>
                <select type="text" className="form-control" placeholder="Employee ID" name="employee" value={employees}
                       onChange={(e) => {
                           setEmployees(e.target.value)
                       }}>
                    <option>--Select Employee ID--</option>
                    {   allemployees.map(emp=>
                        <option value={emp._id}>{emp._id}:({emp.userName})</option>
                    )
                    }
                </select>
            </div>

            <div>
                <label htmlFor="Inputemployname">Employee </label>
                <select type="text" className="form-control" placeholder="Employee " name="employeee" value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}>
                    <option>--Select Employee--</option>
                    {   allemployees.map(emp=>
                        <option value={emp.userName}>{emp.userName}</option>
                    )
                    }
                </select>
            </div>


            <div>
                <label htmlFor="InputMonth">Month</label>
                <select name="month" className="form-control" value={month} onChange={(e) => {
                    setMonth(e.target.value)
                }}>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March" selected>March</option>
                    <option value=" April"> April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July" selected>July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value=" November" selected> November</option>
                    <option value="December">December</option>
                </select>
            </div>

            <div>
                <label htmlFor="exampleInputPassword1">Year</label>
                <input type="text" className="form-control" placeholder="YEAR" name="year" value={year}
                       onChange={(e) => {
                           setYear(e.target.value)
                       }}/>
            </div>
            <div>
                <label htmlFor="Inputaddition">Additions</label>
                <input type="text" className="form-control" placeholder="0,0$" name="addition" value={addition}
                       onChange={(e) => {
                           setAddition(e.target.value)
                       }}/>
            </div>
            <div>
                <label htmlFor="Inputovertime"> Overtime</label>
                <input type="text" className="form-control" placeholder="0,0$" name="overtime" value={overtime}
                       onChange={(e) => {
                           setOvertime(e.target.value)
                       }}/>
            </div>
            <div>
                <label htmlFor="Inputdeductions">Deductions</label>
                <input type="text" className="form-control" placeholder="0,0$" name="deductions" value={deductions}
                       onChange={(e) => {
                           setDeductions(e.target.value)
                       }}/>
            </div>
            <div>
                <label htmlFor="Inputdeductions">Total Salary</label>
                <input type="text" className="form-control" placeholder="0,0$" name="salary" value={totalSalary}
                       onChange={(e) => {
                           setTotalSalary(e.target.value)
                       }}/>
            </div>
            <button type="button" className="btn btn-primary"
                    style={{marginTop: "10px", marginLeft: "200px", width: "180px"}} onClick={() => {addSalary();history.push('home/employee_salary')}}>Add
            </button>
        </div>
    );
}

export default FormAdd;