import React from "react";
import "./authentification.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Login, SignUp } from "../../redux/actions/EmployeeActions";
import { Link } from "react-router-dom";

export default function Authentification() {
  const { EmployeeReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [connected, setConnected] = useState(false);
  const [employeeSignUp, setEmployeeSignUp] = useState({
    userName: "",
    email: "",
    password: "",
    company: "",
    confirmPassword: "",
    isManager: true
  });
  const [employeeLogin, setEmployeeLogin] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setEmployeeLogin({ ...employeeLogin, [e.target.name]: e.target.value });
  };
  const onChange1 = (e) => {
    setEmployeeSignUp({ ...employeeSignUp, [e.target.name]: e.target.value });
  };

  function login() {
    dispatch(Login(employeeLogin));
  }
  function signUp() {
    dispatch(SignUp(employeeSignUp))
  }
  useEffect(() => {
    if (EmployeeReducer.token) {
      history.push("/home");
    }
  }, [EmployeeReducer]);

  return (
    <div className="section-g img-back">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            className="form-style"
                            placeholder="Your Email"
                            id="emailLogin"
                            onChange={(e) => onChange(e)}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="password"
                            className="form-style"
                            placeholder="Your Password"
                            id="passwordLogin"
                            onChange={(e) => onChange(e)}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        {EmployeeReducer.errLogin ? (
                          <div>Invalid Email or Password</div>
                        ) : null}
                        <button className="btn-a mt-4" onClick={login}>
                          submit
                        </button>
                        <p className="mb-0 mt-4 text-center">
                        <Link to={"/forgetpassword"}>Forgot your password?</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="userName"
                            className="form-style"
                            placeholder="Your Full Name"
                            id="userName"
                            onChange={(e) => onChange1(e)}
                          />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="email"
                            className="form-style"
                            placeholder="Your Email"
                            id="email"
                            onChange={(e) => onChange1(e)}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="password"
                            className="form-style"
                            placeholder="Your Password"
                            id="password"
                            onChange={(e) => onChange1(e)}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-style"
                            placeholder="Confirm Password"
                            id="confirmPassword"
                            onChange={(e) => onChange1(e)}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="text"
                            name="company"
                            className="form-style"
                            placeholder="your Company's Name"
                            id="company"
                            onChange={(e) => onChange1(e)}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                          {employeeSignUp.password !== employeeSignUp.confirmPassword ? <div> Password must match  </div> : null}
                          {EmployeeReducer.errSignUp ? (
                          <div>Email already exist</div>
                        ) : null}
                          <button className="btn-a mt-4" onClick={signUp}>
                            submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
