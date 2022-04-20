import axios from "axios";
import React, { useRef } from "react";
import "../authentification.css";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import * as faceapi from "@vladmandic/face-api";
import Webcam from "react-webcam"
import { useDispatch } from "react-redux";

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};

export default function ForgetPassword(props) {
  const [showLoader, setShowLoader] = useState(false);
  const [time, SetTime] = useState(10);
  const [redirectOrNo, setredirectOrNo] = useState(false);
  const [stream, setStream] = useState();
  const myVideo = useRef();
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const webcamRef = useRef(null);
  const dispatch = useDispatch();

  const redirectToNormalLogin = () => {
    setTimeout(() => {
      setredirectOrNo(true)
    }, 4000);
  }

  useEffect(async () => {
    let { data } = await axios.post(`/employee/employeeimage`, { email: props.location.state.email });
    if (data.images === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
      setMessage("Please upload an image first, redirecting to normal login ...")
      redirectToNormalLogin();
    } else {
      // Promise.all([
      //   faceapi.nets.tinyFaceDetector.loadFromUri("/model"),
      //   faceapi.nets.faceLandmark68Net.loadFromUri("/model"),
      //   faceapi.nets.faceRecognitionNet.loadFromUri("/model"),
      //   faceapi.nets.faceExpressionNet.loadFromUri("/model")
      // ]).then(
      //   checkVideo(),
      //   capture(),
      //   faceRecog(data.images)
      // )
      checkVideo();
      capture();
      faceRecog(data.images)
    }
    return () => {
      console.log('Do some cleanup');
    }
  }, [])


  const capture = async () => {
    setTimeout(() => {
      setImage(webcamRef.current.getScreenshot());
      // faceRecog();
    }, 10000)
    let x = 10;
    let interv = setInterval(() => {
      x -= 1;
      SetTime(x)
      if (x === 0) {
        clearInterval(interv)
        setShowLoader(true)
      }
    }, 1000)
  }

  const faceRecog = async (employeeImage) => {
    setTimeout(async () => {
      let detections = await faceapi
        .detectSingleFace(myVideo.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor()
      if (detections) {
        let faceMatcher = new faceapi.FaceMatcher(detections)
        let img = await faceapi.fetchImage(employeeImage)
        let detections1 = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor()
        if (detections1) {
          const match = faceMatcher.findBestMatch(detections1.descriptor)
          if (match.distance < 0.6) {
            setMessage("Face id successed now redirecting")
            await axios
              .post("/employee/faceidlogin", { email: props.location.state.email })
              .then((result) => {
                const time = new Date(Date.now());
                dispatch({
                  type: "LOGIN",
                  payload: result.data,
                  status: result.status,
                  timeLogin: time
                });
              })
            setTimeout(() => {
              setredirectOrNo(true)
            }, 1000);
          } else {
            setMessage("The face supplied is not the same saved in our system redirecting...")
            redirectToNormalLogin();
          }

        } else {
          setMessage("Please use normal login and update your image redirecting ...")
          redirectToNormalLogin();
        }
      } else {
        setMessage("Sorry no face detected, redirecting to normal login ...")
        redirectToNormalLogin();
      }
    }, 10000);
  }
  function checkVideo() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
  }
  return (
    <div className="section-g img-back" >
      <div className="container" >
        <div className="row full-height justify-content-center" >
          <div className="col-12 text-center align-self-center py-5" >
            <div className="section pb-5 pt-5 pt-sm-2 text-center" >
              <h6 className="mb-0 pb-3" >
                <span > FACE RECOGNITION </span>
              </h6 >
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper" >
                  <div className="card-front" >
                    <div className="center-wrap" >
                      <div className="section text-center" >
                        <label>
                          <h4 className="mb-4 pb-3" > FACE RECOGNITION </h4>
                          <small>Your photo will be takin in {time} ( Please make your face visible )</small>
                        </label>
                        <video
                          crossOrigin="anonymous"
                          playsInline
                          muted
                          ref={myVideo}
                          width={"70"}
                          height={"35"}
                          style={{ visibility: "hidden" }}
                          autoPlay
                        />
                        <div className="form-group" >
                          <i className="input-icon uil uil-at" > </i>
                          <div className="webcam-container">
                            <div className="webcam-img">
                              {image == '' ? <Webcam
                                audio={false}
                                height={200}
                                ref={webcamRef}
                                screenshotFormat="image/jpg"
                                width={220}
                                videoConstraints={videoConstraints}
                              /> : <img src={image} />}
                            </div>
                          </div>
                          {showLoader ? (
                            <Spinner> </Spinner>
                          ) : null
                          }
                        </div>
                        <small className="mb-0 mt-4 text-center">
                          {message}
                        </small>
                      </div >
                    </div> </div>
                </div>
              </div > </div> </div > </div>

      </div >
      {redirectOrNo ? (<
        Redirect to="/" />
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