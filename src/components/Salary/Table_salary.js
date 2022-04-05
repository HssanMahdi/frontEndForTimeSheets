import * as React from 'react';
import "./datagrid.css";
import {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import delimg from "../../assets/bin-delete.png";
import editimg from "../../assets/reset.png";

export default function SxProp() {
    const [year, setYear] = useState("")
    const [month, setmonth] = useState("")
    const [salarys, setSalarys] = useState([])
    const [employe, setEmp] = useState([])
    const [empName, setEmpName] = useState("")
    const monthNames = [" ","January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    useEffect(() => {
        const url = '/salarys/show';//api url
        fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setSalarys(resp))//setting response to state salaries
    ;refresh()}, [])

    useEffect(() => {getCurYear()},[])

function getCurYear(){
    const today = new Date(),

        curYear = today.getFullYear();
    let curMonth;
    curMonth =today.getMonth()+1;
    setmonth(monthNames[curMonth]);
    setYear(curYear+"");
    };

    function refresh() {
        const url = '/salarys/show';//api url
        fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setSalarys(resp))//setting response to state posts
    }

    function SalaryDelete(id) {
        fetch(`/salarys/delete/${id}`,
            {
                method: 'DELETE'
            }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }



    function resetSalary(id) {
        let data = {
            "month": month,
            "year": year,
            "addition": 0,
            "overtime": 0,
            "deductions": 0,
            "totalSalary": 0
        }
        fetch(`/salarys/update/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }).then((resp) => {
            console.log("resp", resp);
        })
    }



    return (


    <div className="tab-content">


        <div className="tab-pane show active" >

            <br/>




            <div className="payroll-table card">
                <div className="table-responsive">
                    <table className="table table-hover table-radius">
                        <thead>
                        <tr style={{color:"#1E90FFFF"}}>
                            <th>Employee ID</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Additions</th>
                            <th>Overtime</th>
                            <th>Deductions</th>
                            <th>Salary</th>
                            <th className="text-right"><button onClick={refresh}  style={{
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundImage: `url(${editimg})`,
                                border: "none",
                                outline: "none",
                                height: "40px",


                            }}>  Refresh</button> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {salarys.map((item)=>
                            <tr>
                                <th>{item.employees}</th>
                                <td>{item.month}</td>
                                <td>{item.year}</td>
                                <td>{item.addition}</td>
                                <td>{item.overtime}</td>
                                <td>{item.deductions}</td>
                                <td style={{color:"green"}}>{item.totalSalary} $</td>
                                <td className="text-right">
                                    <Button
                                        style={{
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundImage: `url(${editimg})`,
                                            border: "none",
                                            outline: "none",
                                            height: "40px",


                                        }}
                                        onClick={() => {
                                            resetSalary(item._id);
                                            refresh();
                                            refresh();

                                        }
                                        }
                                    >

                                    </Button>
                                    <Button
                                        style={{
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundImage: `url(${delimg})`,
                                            border: "none",
                                            outline: "none",
                                            height: "40px",


                                        }}
                                        onClick={() => {
                                            SalaryDelete(item._id);
                                            refresh();
                                            refresh();

                                        }
                                        }
                                    >

                                    </Button>

                                </td>
                            </tr>

                        )}



                        </tbody>
                    </table>
                </div>
            </div>


        </div>


    </div>
    );

}


