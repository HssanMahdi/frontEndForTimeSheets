import React from "react";
import "./Profile.css";
import hello from "../../assets/edit.svg";
export default function Profile() {
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
                  <h3 className="my-3">Mahdi Hssan</h3>
                  <h5>Web Designer & Developer</h5>
                </td>
                <td>
                  <ul className="classs">
                    <li className="classProfile">
                      <i
                        style={{ color: "#252d57" }}
                        className="bi bi-person-circle mx-2"
                      ></i>
                      <b>Mahdi</b>
                      <i
                        className="fa fa-edit faa"
                        id="edit1"
                        //   onclick="document.getElementById('fname').style.pointerEvents='auto';document.getElementById('fname').focus();this.style.display='none'; document.getElementById('check1').style.display='inline-block';"
                      ></i>
                      <i
                        className="fa faa fa-check"
                        style={{ display: "none" }}
                        id="check1"
                        //   onclick="document.getElementById('edit1').style.display='inline-block';this.style.display='none';document.getElementById('fname').style.pointerEvents='none';"
                      ></i>
                    </li>
                    <li className="classProfile">
                      <i
                        style={{ color: "#252d57" }}
                        className="bi bi-envelope-fill mx-2"
                      ></i>
                      <b>Mahdi@gmail.com</b>
                    </li>
                    <li className="classProfile">
                      <i
                        style={{ color: "#252d57" }}
                        className="bi bi-telephone mx-2"
                      ></i>
                      <b>Contact number</b>
                      <i
                        className="fa faafa-edit"
                        id="edit2"
                        //   onclick="document.getElementById('mobile').style.pointerEvents='auto';document.getElementById('mobile').focus();this.style.display='none'; document.getElementById('check2').style.display='inline-block';"
                      ></i>
                      <i
                        className="fa faa fa-check"
                        style={{ display: "none" }}
                        id="check2"
                        //   onclick="document.getElementById('edit2').style.display='inline-block';document.getElementById('mobile').style.pointerEvents='none';this.style.display='none';"
                      ></i>
                    </li>
                    <li className="classProfile">
                      <i
                        style={{ color: "#252d57" }}
                        className="bi bi-mailbox2 mx-2"
                      ></i>
                      <b>Address</b>
                      <i
                        className="fa faa  fa-edit"
                        id="edit3"
                        //   onclick="document.getElementById('address').style.pointerEvents='auto';document.getElementById('address').focus();this.style.display='none'; document.getElementById('check3').style.display='inline-block';"
                      ></i>
                      <i
                        className="fa faa  fa-check"
                        style={{ display: "none" }}
                        id="check3"
                        //   onclick="document.getElementById('edit3').style.display='inline-block';document.getElementById('address').style.pointerEvents='none';this.style.display='none';"
                      ></i>
                    </li>
                  </ul>
                </td>
              </tr>
              {/* <tr>
                <td className="section2">
                  <h2 style={{ textAlign: "left" }}>My Projects</h2>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
