import React, {useEffect, useState} from 'react';
import background from "../../assets/workspace2.png";
import {Link, useHistory} from "react-router-dom";
import delimg from "../../assets/bin-delete.png";
import {Button} from "@mui/material";

function PayrollItems() {
    const [additions, setAdditions] = useState([])
    const history = useHistory();
    function refresh() {
        const url = '/additions/show';//api url
        fetch(url).then(resp => resp.json())//calling url by method GET
            .then(resp => setAdditions(resp))//setting response to state additions
    }
    useEffect(()=>{refresh();refresh()},[]);

    function Delete(id) {
        fetch(`/additions/delete/${id}`,
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
                                    <Link to={"payroll_items"} className="nav-link active">Additions</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"overtime"} className="nav-link">Overtime</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"deductions"} className="nav-link">Deductions</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="tab-content">


                    <div className="tab-pane show active" >

<br/>
                        <div className="text-right mb-4 clearfix">
                            <button className="btn btn-primary add-btn" type="button" onClick={()=>history.push('/add_addition')}><i className="fa fa-plus"></i> Add Addition
                            </button>
                        </div>



                        <div className="payroll-table card">
                            <div className="table-responsive">
                                <table className="table table-hover table-radius">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Ammount $</th>
                                        <th>Date Of Payment</th>
                                        <th className="text-right">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {additions.map((item)=>
                                        <tr>
                                            <th>{item.name}</th>
                                            <td>{item.amountOfAddition}</td>
                                            <td>{item.date.slice(0,10)}</td>
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