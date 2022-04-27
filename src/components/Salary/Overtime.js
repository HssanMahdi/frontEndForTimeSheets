import React, {useEffect, useState} from 'react';
import background from "../../assets/workspace2.png";
import {Link, useHistory} from "react-router-dom";
import delimg from "../../assets/bin-delete.png";
import {Button} from "@mui/material";

function PayrollItems() {
    const [overtime, setAdditions] = useState([])
    const history = useHistory();
    function refresh() {
        const url = '/overtime/show';//api url
        fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setAdditions(resp))//setting response to state overtime
    }
    useEffect(()=>{refresh();refresh()},[]);

    function Delete(id) {
        fetch(`/overtime/delete/${id}`,
            {
                method: 'DELETE'
            }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }

    return (
        <main style={{ backgroundImage: `url(${background})`}}>

            <div className="main__container" >

                <h1   style={{color: "#1e90ff",fontSize:"25px"}}><strong style={{color: "#1e90ff",fontSize:"30px"}}>Dashboard /</strong> Payroll Items</h1>
                <br/><br/><br/><br/><br/><br/>
                <div className="page-menu">
                    <div className="row">
                        <div className="col-sm-12">
                            <ul className="nav nav-tabs nav-tabs-bottom">
                                <li className="nav-item">
                                    <Link to={"/home/payroll_items"} className="nav-link">Additions</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/home/overtime"} className="nav-link active">Overtime</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/home/deductions"} className="nav-link">Deductions</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="tab-content">


                    <div className="tab-pane show active" >

                        <br/>
                        <div className="text-right mb-4 clearfix">
                            <button className="btn btn-primary add-btn" type="button" onClick={()=>history.push('/add_overtime')}><i className="fa fa-plus"></i> Add Overtime
                            </button>
                        </div>



                        <div className="payroll-table card">
                            <div className="table-responsive">
                                <table className="table table-hover table-radius">
                                    <thead>
                                    <tr>
                                        <th>Type of work day</th>
                                        <th>Over Time hours price</th>
                                        <th>Normal working hours per day</th>
                                        <th className="text-right">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {overtime.map((item)=>
                                        <tr>
                                            <th>{item.name}</th>
                                            <td>Employee hour price x {item.hourlyRate}</td>
                                            <td>{item.working_hours_per_day} Hour</td>
                                            <td className="text-right">
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
                                                        Delete(item._id);
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

            </div>

        </main>
    );
}

export default PayrollItems;