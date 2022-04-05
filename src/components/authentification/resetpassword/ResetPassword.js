import axios from "axios";
import React from "react";
import "../authentification.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

export default function ResetPassword(props) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [redirectOrNo, setredirectOrNo] = useState(false);
    const token = props.location.pathname.split("/")[2]

    async function resetPassword () {
        if(password!==confirmPassword){
            return 
        }
        setShowLoader(true)
        
        const dataToSend = {
            "password": password
          }
        const data = await axios.post(`/employee/resetpassword/${token}`, dataToSend)
        .then((result) => {
            setShowLoader(false)
            setMessage("Password changed successfully, now Redirecting to login ...")
            setTimeout(() => {
                setredirectOrNo(true)
            }, 2000);
        })
        .catch(()=>{
            setShowLoader(false)
            setMessage("Ooops something went wrong , please try again")
        });
    }
    return (
        <div className="section-g img-back">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3">
                                <span>Reset Password</span>
                            </h6>
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Reset Password</h4>
                                                <div className="form-group">
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            className="form-style"
                                                            placeholder="Your Password"
                                                            id="password"
                                                            onChange={(e) => setPassword(e.target.value)}
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
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                        />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    {password !== confirmPassword ? <div> Password must match confirm password </div> : null}
                                                    {showLoader ? (
                                                        <Spinner></Spinner>
                                                    ) : null
                                                    }
                                                </div>
                                                <button className="btn-a mt-4" onClick={resetPassword}>
                                                    submit
                                                </button>
                                                <p className="mb-0 mt-4 text-center">
                                                    {message}
                                                </p>
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
                <Redirect to="/" />
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
