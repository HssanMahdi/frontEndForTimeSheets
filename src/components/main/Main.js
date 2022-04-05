import "./Main.css";
import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import startIcon from "../../assets/startIcon.svg";
import stopIcon from "../../assets/stopIcon.svg";

export default function Main () {
    const { EmployeeReducer } = useSelector(state => state);
    const dispatch = useDispatch();
    const workingOn = (task) => {
        let payload={
            task:task,
            timeStart:new Date(Date.now())
        }
        dispatch({
            type: "TASKNOW",
            payload: payload
          });
    }
    return(
        <main>
            <div className="main__container">
                <div className="main__title">
                    <img src={hello} alt="hello"/>
                    <div className="main__greeting">
                        <h1>Hello {EmployeeReducer.connectedEmployee.userName}</h1>
                        <p>Welcome to your dashboard</p>
                    </div>
                </div>
                <div className="main__cards">
                    <div className="card ">
                        <img style={{
                            position: "absolute",
                            top: "8px",
                            right: "15px",
                        }} height="30" src={startIcon} onClick={()=>workingOn}></img>
                        <i className="fa fa-user fa-2x text-lightblue my-1"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of Subscribers</p>
                            <span className="font-bold text-title">578</span>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fa fa-calendar fa-2x text-red my-1"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Times of Watching</p>
                            <span className="font-bold text-title">2467</span>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fa fa-video-camera fa-2x text-yellow"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of Videos</p>
                            <span className="font-bold text-title">340</span>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fa fa-thumbs-up fa-2x text-green"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of Likes</p>
                            <span className="font-bold text-title">645</span>
                        </div>
                    </div>
                </div>

              <div className="charts">
                  <div className="charts__left">
                      <div className="charts__left__title">
                          <div>
                              <h1>Daily Reports</h1>
                              <p>Cupertino,California,USA</p>
                          </div>
                          <i className="fa fa-usd"></i>
                      </div>
                      <Chart />
                  </div>

                  <div className="charts__right">
                      <div className="charts__right__title">
                          <div>
                              <h1>Stats Reports</h1>
                              <p>Cupertino,California,USA</p>
                          </div>
                          <i className="fa fa-usd"></i>
                      </div>

                      <div className="charts--right--cards">
                          <div className="card1">
                              <h1>Income</h1>
                              <p>$75,300</p>
                          </div>

                          <div className="card2">
                              <h1>Sales</h1>
                              <p>$124,200</p>
                          </div>

                          <div className="card3">
                              <h1>Users</h1>
                              <p>3900</p>
                          </div>

                          <div className="card4">
                              <h1>Orders</h1>
                              <p>1881</p>
                          </div> 
                      </div>
                  </div>
              </div>  
            </div>
        </main>
    )
}

