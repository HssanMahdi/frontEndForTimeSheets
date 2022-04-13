import React, { useEffect, useState } from "react";
import "./Profile.css";
import hello from "../../assets/edit.svg";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
export default function Profile() {
  const { EmployeeReducer } = useSelector((state) => state);
  const [employeeModif, setEmployeeModif] = useState({
    userName: "",
    email: "",
    phone: "",
    adress:""
  });
  const config = {
    headers: {
      Authorization: `Bearer ${EmployeeReducer.token}`,
    },
  };
  const onChange = (e) => {
    setEmployeeModif({ ...employeeModif, [e.target.name]: e.target.value });
  };
  function edit (){
    Swal.fire({
      title: 'Submit your Github username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })
      }
    })  
  }
  return (
    <main>
      <div className="main__container">
        <div className="main__title ">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>My Profile</h1>
            <p>Edit Profile</p>
          </div>
        </div>
        <div className="container-prof ">
          <table>
            <tbody>
              <tr>
                <td
                  style={{
                    height: "509px",
                    width: "610px",
                  }}
                >
                  <section>
                    <label>
                      <i className="fa fa-camera faa"></i>
                      <input
                        className="classProfile"
                        type="file"
                        id="fileToUpload"
                        style={{ visibility: "hidden" }}
                        name="fileToUpload"
                      />
                    </label>
                    <img
                      src="https://i.ibb.co/yNGW4gg/avatar.png"
                      id="blah"
                      alt="Avatar"
                    />
                  </section>
                  <h3 className="my-3" >{EmployeeReducer.connectedEmployee.userName}</h3>
                  {EmployeeReducer.connectedEmployee.isManager ? (
                    <h5>Role : Manager</h5>
                  ) : (
                    <h5>Role : Employee</h5>
                  )
                  }
                </td>
                <td>
                  <ul className="classs">
                    <li className="classProfile">
                      <i
                        style={{ color: "#252d57" }}
                        className="bi bi-person-circle mx-2"
                      />
                      <b>{EmployeeReducer.connectedEmployee.userName}</b>
                      {/* <i  
                        className="fa faa fa-check"
                        style={{ display: "none" }}
                        id="check1"
                      /> */}
                    </li>
                    <li className="classProfile">
                      <i
                        style={{ color: "#252d57" }}
                        className="bi bi-envelope-fill mx-2"
                      />
                      <b >{EmployeeReducer.connectedEmployee.email}</b>
                      
                    </li>
                    <li className="classProfile">
                      <i
                        style={{ color: "#252d57" }}
                        className="bi bi-telephone mx-2"
                      />
                      <b name="phone" >{EmployeeReducer.connectedEmployee.phone}</b>
                      {/* <i
                        className="fa faa fa-check"
                        style={{ display: "none" }}
                        id="check2"
                      /> */}
                    </li>
                    <li className="classProfile">
                      <i
                        style={{ color: "#252d57" }}
                        className="bi bi-mailbox2 mx-2"
                      />
                      <b >{EmployeeReducer.connectedEmployee.address}</b>
                      {/* <i
                        className="fa faa  fa-check"
                        style={{ display: "none" }}
                        id="check3"
                      /> */}
                    </li>
                  </ul>
                  <button className="button-29" >Edit Profile</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
