import React, { useEffect, useState } from "react";
import styles from "./employees.css"
import hello from "../../assets/employees-group.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import Swal from "sweetalert2";
import { NotificationTwoTone, getTwoToneColor, setTwoToneColor } from "@ant-design/icons";
import { Checkbox, useCheckboxState } from "pretty-checkbox-react";
import Icon from "@ant-design/icons/lib/components/AntdIcon";
setTwoToneColor('#17A2B8');
getTwoToneColor('#D7EFEF');
export default function Employees() {
    const { EmployeeReducer } = useSelector((state) => state);
    const [employeesList, setEmployeesList] = useState([]);
    const [employeeSelected, setEmployeeSelected] = useState("");
    const [employeeSelectedSkills, setEmployeeSelectedSkills] = useState([]);
    const [showUpdatedForm, setShowUpdatedForm] = useState(false);
    const checkbox = useCheckboxState({ state: [] });
    const [technologies, setTechnologies] = useState([]);
    const [technologiesData, setTechnologiesData] = useState([
        { name: "Java" }, { name: "NodeJs" }, { name: "ReactJs" }, { name: "Symfony" }, { name: "Angular" },
        { name: "Spring" }, { name: "Python" }, { name: "MongoDb" }, { name: "MySql" }
    ]);
    const config = {
        headers: {
            Authorization: `Bearer ${EmployeeReducer.token}`,
        },
    };
    const fetchEmployeesList = async () => {
        const { data } = await axios.get('/employee/', config);
        setEmployeesList(data);
    }
    useEffect(() => {
        fetchEmployeesList();
    }, [])
    useEffect(() => {
        if (employeeSelected !== "") {
            setShowUpdatedForm(true)
            setEmployeeSelectedSkills(employeeSelected.skills)
        } else {
            setShowUpdatedForm(false)
        }
    }, [employeeSelected])
    const changeState = async (idEmployee, state) => {
        let data = {
            isManager: state
        };
        await axios.put(`/employee/changeemployeestate/${idEmployee}`, data, config)
            .then(fetchEmployeesList())
            .catch((err) => console.log(err))
    }
    const handleChange1 = (e) => {
        if(e.target.checked){
            let x = employeeSelectedSkills
            x.push(e.target.name)
            setEmployeeSelectedSkills(x)
        }else{
            let x = employeeSelectedSkills
            x.splice(x.indexOf(e.target.name),1)
            setEmployeeSelectedSkills(x)
        }
    }
    const deleteEmployee = async (idEmployee) => {
        await axios.delete(`/employee/${idEmployee}`, config)
            .then(fetchEmployeesList())
            .catch((err) => console.log(err))
    }
    function sweetAlert(employee) {
        if (employee.notifications.length > 0) {
            let txt = "<ul>"
            employee.notifications?.map((notif, key) => (
                txt += `<li><span>${notif}</span></li>`
            ))
            txt += "</ul>"

            Swal.fire({
                icon: 'error',
                title: `${employee.notifications.length} issues`,
                html: txt,
            })
        } else {
            Swal.fire(
                `No issues`,
                `${employee.userName} is doing a good job`,
                'success'
            )
        }
    }
    const checkEmployeeSkill = (skill) => {
        let a = employeeSelected.skills.filter((x) => x == skill)
        if (a.length > 0) {
            return true
        }
        return false
    }
    async function updateEmployeeSkills (){
        let data={
            skills:employeeSelectedSkills
          }
          await axios
          .put(`/employee/updateemployee/${employeeSelected._id}`, data, config)
          .then((result) => {
            Swal.fire({
              icon: "success",
              title: `${result.data.userName} skills updated`,
              showConfirmButton: false,
              timer: 1500,
            })
            setShowUpdatedForm(false)
            setEmployeeSelected("")
          })

    }
    return (
        <main>
            <div className="main__container">
                <div className="main__title ">
                    <img src={hello} alt="hello" />
                    <div className="main__greeting">
                        <h1>Company's employees</h1>
                        <p>List</p>
                    </div>
                </div>
                <hr></hr>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-margin">
                                <div className="card-body">
                                    <h3 style={{ color: "#3984E6" }}>{employeesList.length} employees</h3>
                                    <div className="row search-body">
                                        <div className="col-lg-12">
                                            <div className="search-result">
                                                <div className="result-header">
                                                </div>
                                                <div className="result-body">
                                                    <div className="table-responsive">
                                                        <table className="table widget-26">
                                                            <tbody>
                                                                {employeesList?.map((employee, key) => (
                                                                    <tr key={key}>
                                                                        <td>
                                                                            <div className="widget-26-job-emp-img">
                                                                                <img src={employee.images} alt="Company" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="widget-26-job-title ">
                                                                                <span >{employee.userName}</span>
                                                                                <p className="m-0"><a href="#" className="employer-name">Joined the : </a><span className="text-muted time"><Moment format=" DD-MM-YYYY ">{employee.createdAt}</Moment></span></p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="widget-26-job-info">
                                                                                <p className="type m-0">Email :</p>
                                                                                <p className="text-muted m-0">in <span className="location">{employee.email}</span></p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="widget-26-job-salary">$ {employee.hourPrice}/hr</div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="widget-26-job-category bg-soft-info">
                                                                                <i className="indicator bg-info"></i>
                                                                                {employee.isManager ? (
                                                                                    <span>Manager</span>
                                                                                ) :
                                                                                    <span>Employee</span>
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            {employee.isManager ? (
                                                                                <button className="button-29" role="button" onClick={() => changeState(employee._id, false)}>Change to employee</button>
                                                                            ) :
                                                                                <button className="button-29" role="button" onClick={() => changeState(employee._id, true)}>Change to manager</button>
                                                                            }
                                                                        </td>
                                                                        <td style={{ display: 'flex' }}>
                                                                            <NotificationTwoTone style={{ fontSize: '27px', marginTop: "2px" }} onClick={() => sweetAlert(employee)} />
                                                                            <div className="icon-trash" onClick={() => deleteEmployee(employee._id)}>
                                                                                <div className="trash-lid" style={{ backgroundColor: "#02A7D7" }}></div>
                                                                                <div className="trash-container" style={{ backgroundColor: "#02A7D7" }}></div>
                                                                                <div className="trash-line-1"></div>
                                                                                <div className="trash-line-2"></div>
                                                                                <div className="trash-line-3"></div>
                                                                            </div>
                                                                        </td>

                                                                        <td>
                                                                            <div className="widget-26-job-starred">
                                                                                <a href="#">
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        width="24"
                                                                                        height="24"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="none"
                                                                                        stroke="currentColor"
                                                                                        strokeWidth="2"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        className="feather feather-star starred"
                                                                                        onClick={() => setEmployeeSelected(employee)}
                                                                                    >
                                                                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                                    </svg>
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {showUpdatedForm ? (
                                        <div className="container">
                                            <h3 style={{ color: "#3984E6" }}>Update {employeeSelected.userName} skills :</h3>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-7 mx-auto">
                                                    <div className="form-group1">
                                                        <div className="row">
                                                            {technologiesData.map((t, index) => (
                                                                <li key={index} style={{ listStyleType: 'none', marginRight: '22px' }}>
                                                                    {checkEmployeeSkill(t.name) ? (
                                                                        <>
                                                                            <input
                                                                                id={t.name}
                                                                                type="checkbox"
                                                                                name={t.name}
                                                                                checked={true}
                                                                                onChange={(e)=>handleChange1(e)}
                                                                            />
                                                                            <label htmlFor={t.name}> {t.name}</label>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <input
                                                                                id={t.name}
                                                                                type="checkbox"
                                                                                name={t.name}
                                                                                onChange={(e)=>handleChange1(e)}
                                                                            />
                                                                            <label htmlFor={t.name}> {t.name}</label>
                                                                        </>
                                                                    )}
                                                                </li>
                                                            ))}
                                                            <button className="button-29" role="button" onClick={updateEmployeeSkills}> Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
