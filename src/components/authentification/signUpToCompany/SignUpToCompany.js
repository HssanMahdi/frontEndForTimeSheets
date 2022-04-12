import React from "react";
import "../authentification.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { SignUpToCompanyAction } from "../../../redux/actions/EmployeeActions";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
export default function SignUpToCompany(props) {
    const { EmployeeReducer } = useSelector((state) => state);
    const [redirectOrNo, setredirectOrNo] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [connected, setConnected] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const token = props.location.pathname.split("/")[2]
    const [employeeSignUp, setEmployeeSignUp] = useState({
        userName: "",
        email: "",
        password: "",
        company: "",
        confirmPassword: "",
        todaysWorkedHours: 0,
        hourPrice: 0,
        totalWorkedHours: 0,
        hourPrice: 15
    });
    const onChange1 = (e) => {
        setEmployeeSignUp({ ...employeeSignUp, [e.target.name]: e.target.value });
    };

    function signUp() {
        setShowLoader(true);
        dispatch(SignUpToCompanyAction(employeeSignUp, token))

    }
    useEffect(() => {
        if (EmployeeReducer.errSignUp) {
            setShowLoader(false)
        }
        if (EmployeeReducer.token) {
            history.push("/home");
        }
    }, [EmployeeReducer]);
    useEffect(() => () => setShowLoader(false), []);

    return (
        <div className="section-g img-back">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3">
                                <span>Sign Up</span>
                            </h6>
                            <input
                                className="checkbox"
                                type="checkbox"
                                id="reg-log"
                                name="reg-log"
                            />
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
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
                                                {showLoader ? (
                                                    <Spinner> </Spinner>
                                                ) : null
                                                }
                                                <div className="form-group mt-2">
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
            {redirectOrNo ? (
                <Redirect to="/home" />
            ) : null
            }
        </div>
    );
}
const Spinner = () => (
    <Loader viewBox="0 0 50 50">
        <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="2"
        />
    </Loader>
);
const Loader = styled.svg`
  animation: rotate 2s linear infinite;
  align-self: center;
  width: 30px;
  height: 30px;
  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
  `;