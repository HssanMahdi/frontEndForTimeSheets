import * as React from 'react';
import "./datagrid.css";
import {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import delimg from "../../assets/bin-delete.png";
import editimg from "../../assets/reset.png";
import hourimg from "../../assets/hour.png";
import payimg from "../../assets/payadd.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const notify = () => toast.success('Salary Assigned', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
export default function SxProp() {
    const [year, setYear] = useState("")
    const [month, setmonth] = useState("")
    const [salarys, setSalarys] = useState([])
    const [emps, setemps] = useState([])
    const [hourPrice, setHourPrice] = useState("")
    const monthNames = [" ","January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    useEffect(() => {
        const url = '/salarys/show';//api url
        fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setSalarys(resp))//setting response to state salaries
    ;refresh()}, [])

    useEffect(() => {
        const url = '/salarys/showEmp';//api url
        fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setemps(resp))//setting response to state salaries
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
   async function affectSalaryAndSetHours(id,salid,hPrice) {
        const url = `/salarys/affectSalary/${id}/${salid}/${hPrice}`;//api url
       await fetch(url).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
       notify();
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

        <div className="tab-pane show active" >

            <br/>




            <div className="payroll-table card">
                <div className="table-responsive">
                    <table className="table table-hover table-radius">
                        <thead>
                        <tr style={{color:"#1E90FFFF"}}>
                            <th>Employee </th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>This month Additions</th>
                            <th>This month Overtime</th>
                            <th>Today worked Hours</th>
                            <th>This Month Salary</th>
                            <th className="text-right"><button onClick={refresh}  style={{
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundImage: `url(${editimg})`,
                                border: "none",
                                outline: "none",
                                height: "40px",
                                width:"40px"

                            }}>  </button> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {salarys.map((item)=>
                            <tr>
                                <th>{item.userName} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                <td>{item.month}</td>
                                <td>{item.year}</td>
                                <td>{item.addition}</td>
                                <td>{item.overtime}</td>
                                {emps.map((eitem)=>
                                <td hidden={eitem.userName!==item.userName}>{eitem.todaysWorkedHours}</td>) }
                                <td style={{color:"green"}}>{item.totalSalary} $</td>
                                <td className="text-right">
                                    <Button
                                        title={"Pay Salary"}
                                        style={{
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundImage: `url(${payimg})`,
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
                                        title={"Delete Salary"}
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

                                    <Button
                                        title={"Set Hour Price"}
                                        style={{
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundImage: `url(${hourimg})`,
                                            border: "none",
                                            outline: "none",
                                            height: "40px",


                                        }}
                                        onClick={() => {
                                          affectSalaryAndSetHours(item.employees,item._id,hourPrice);


                                        }
                                        }
                                    >

                                    </Button>
                                    <input type="number" className="form-control" placeholder="0,0$" name="addition" value={hourPrice} style={{width:"60px",marginLeft:"310px"}}
                                           onChange={(e) => {
                                               setHourPrice(e.target.value)
                                           }}/>
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


