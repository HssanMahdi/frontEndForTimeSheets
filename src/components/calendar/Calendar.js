import React, { useState, useEffect } from "react";
import calendarr from "../../assets/clip-1400.png";
import "./Calendar.css";
import { Day } from "../day/Day";
import { CalendarHeader } from "../calendarHeader/CalendarHeader";
import { useDate } from "../hooks/useDate";
import axios from "axios";
import {toast} from 'react-toastify';
import { ToastContainer as ToastContainer2 } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Button, Modal} from "react-bootstrap";
import Feedback from 'react-bootstrap/Feedback'
import { useSelector } from "react-redux";

function Calendar() {
  
  const { EmployeeReducer } = useSelector((state) => state);

const config = {
    headers: {
      Authorization: `Bearer ${EmployeeReducer.token}`,
    },
  };
  const [nav, setNav] = useState(0);
  const [show, setShow] = useState(false);
// console.log("user connected",EmployeeReducer.connectedEmployee)
  const handleClose = () => {
    setShow(false);
    
  }
  const handleShow = () => setShow(true);

  const [listEvents, setlistEvents] = useState ([]);
  const monthReplace=(month)=>{
    if(month.startsWith('0')){
      return  month.split().filter( (c) => c.startsWith('0') ).map( (c) => c.replace('0', "") );
    }
    else return month

  }
  const getEvents = async () => {
    try {
      const { data } = await axios.get('/calendar/events',config);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  var d=""
  var newDate=""
  var time=""
  var e=""
  var newendDate=""
  var time2=""
  // var id=""
  const fetchData = async () => {
    const result = await getEvents();
    setlistEvents(result)
    result?.map((l,index)=>(
       d=l.startDate.replace('T','-').split('-'),
      
        d[1]=d[1].replace('0',''),
        d[2]=monthReplace(d[2]),
       newDate=d[1]+"/"+d[2]+"/"+d[0],
       d[3]= d[3].split(':'),
       time = d[3][0]+":"+d[3][1],

       e=l.endDate.replace('T','-').split('-'),
      
        e[1]=e[1].replace('0',''),
        e[2]=monthReplace(e[2]),
       newendDate=e[1]+"/"+e[2]+"/"+e[0],
       e[3]= e[3].split(':'),
       time2 = e[3][0]+":"+e[3][1],
      setEvents((events) =>[...events,{id:l._id, title:l.eventName,date:newDate,time:time, date2: newendDate,time2: time2}])
  
    ))
  };
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchData(); 
  }, []);


  const [inpval, setINP] = useState({
    eventName:"",
    startDate:"",
    endDate:"",
    eventDescription:""
  });
  const setdata = (e) => {
    const {name,value} = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]:value
      }
    })
  }

  const addinpdata = async(e) => {
    e.preventDefault();
    console.log("config",config)
    await axios.post('/calendar/events',inpval,config)
             .then((response) => {
                 toast.success('Event Added successfully !')
                 console.log(response)
                 fetchData();
                 handleClose();
                 //window.location.reload(false);                
             })
             .catch((e) =>{
                 toast.error('Failed to add Event !')
             })
  }
  

  // const eventForDate = (date) => events.find((e) => e.date === date);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));

  }, [events]);

  const { days, dateDisplay } = useDate(events, nav);

  const [validated, setValidated] = useState(false);

  const handleSubmit2 = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="main__title">
          <img src={calendarr} alt="calendar" />
          <div className="main__greeting">
            <h1>Calendar</h1>
            <p>Please check your tasks for the day ! </p>
          </div>
          <div className="btn-title">
            <button
              className="btn btn-secondary"
              onClick={handleShow}
              style={{ background: "rgb(30, 45, 78)", marginLeft: 650 }}
            >
              <i className="fa fa-plus" style={{ marginRight: 7 }}></i>
              Add event
            </button>
          </div>
        </div>
        <hr></hr>
        <>
          <div className="calendar-container">
            <div id="container">
              <CalendarHeader
                dateDisplay={dateDisplay}
                onNext={() => setNav(nav + 1)}
                onBack={() => setNav(nav - 1)}
              />

              <div id="weekdays">
                <div>Sunday</div>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
              </div>

              <div id="calendar">
                {days.map((d, index) => (
                  <Day
                    key={index}
                    day={d}
                    fetchData={fetchData}
                  />
                ))}
              </div>
            </div>
          </div>
          {
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add an Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit2}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="text" onChange ={setdata} value={inpval.eventName} placeholder="Enter name" name="eventName" />
              <Form.Control.Feedback type="invalid">Name field required!</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Event Start Date</Form.Label>
              <Form.Control type="datetime-local" onChange ={setdata} value={inpval.startDate} name="startDate" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Event End Date</Form.Label>
              <Form.Control type="datetime-local" onChange ={setdata} value={inpval.endDate} name="endDate"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" onChange ={setdata} rows={3} value={inpval.eventDescription} placeholder="Write Something here ..." name="eventDescription" />
            </Form.Group>
          </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="secondary" style={{background: "rgb(30, 45, 78)"}} onClick={addinpdata}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
          }
          
          <ToastContainer2/>
           
        </>
      </div>
    </main>
  );
}

export default Calendar;
