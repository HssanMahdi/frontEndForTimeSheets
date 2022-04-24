import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import hello from "../../assets/edit.svg";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { UpdateEmployee } from "../../redux/actions/EmployeeActions";
import axios from "axios";
export default function Profile() {
  const { EmployeeReducer } = useSelector((state) => state);
  const hiddenFileInput = useRef();
  const dispatch = useDispatch();
  const config = {
    headers: {
      Authorization: `Bearer ${EmployeeReducer.token}`,
    },
  };

  function edit() {
    Swal.fire({
      title: 'Update form',
      html: `<input type="text" id="userName" class="swal2-input" value="${EmployeeReducer.connectedEmployee.userName}" />
      <input type="text" id="email" class="swal2-input" value="${EmployeeReducer.connectedEmployee.email}" />
      `,
      confirmButtonText: 'Update',
      focusConfirm: false,
      preConfirm: () => {
        const userName = Swal.getPopup().querySelector('#userName').value
        const email = Swal.getPopup().querySelector('#email').value
        let data = {
          userName: userName,
          email: email
        }
        return data
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .put("/employee/updateemployee", result.value, config)
          .then((result) => {
            dispatch({
              type: "UPDATE_EMPLOYEE",
              payload: result.data
            });
            Swal.fire({
              icon: "success",
              title: "Informations Updated",
              showConfirmButton: false,
              timer: 1500,
            })
          })
      }
    })
  }
  const uploadImage = async (e) => {
    if (e !== undefined) {
      const form = new FormData();
      form.append("file", e.target.files[0]);
      form.append("upload_preset", "onTime-app");
      await fetch("https://api.cloudinary.com/v1_1/espritt/image/upload", {
        method: "post",
        body: form,
      })
        .then((res) => res.json())
        .then(async (result) => {
          let data={
            images:result.secure_url
          }
          await axios
          .put("/employee/updateemployee", data, config)
          .then((result) => {
            dispatch({
              type: "UPDATE_EMPLOYEE",
              payload: result.data
            });
            Swal.fire({
              icon: "success",
              title: "Image updated",
              showConfirmButton: false,
              timer: 1500,
            })
          })
        });
    }
  };
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
                        accept="image/png, image/jpeg"
                        ref={hiddenFileInput}
                        style={{ visibility: "hidden" }}
                        onChange={(e) => uploadImage(e)}
                      />
                    </label>
                    <img
                      src={EmployeeReducer.connectedEmployee.images}
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
                  </ul>
                  <button className="button-29" onClick={edit}>Edit Profile</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
