import React, { useState } from 'react';
import {Form, Button,Modal } from "react-bootstrap";
import axios from 'axios';
import {toast} from 'react-toastify';

export const Day = ({ day, fetchData }) => {
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setShow2(false); 
  }
  const handleShow2 = () => setShow2(true);
  //const [data, setdata] = useState([]);
    const [inpval, setINP] = useState({
        eventName:"",
        startDate:"",
        endDate:"",
        eventDescription:""
      });
      const setdata2 = (e) => {
        const {name,value} = e.target;
        setINP((preval) => {
          return {
            ...preval,
            [name]:value
          }
        })
      }
      
      // const getSingleDataEvent = async (id) => {
      //   const result = await axios.get(`/calendar/events/${id}`)
      //   //console.log(result)
      //    setINP(result)
        
      // }

     
      const editinpdata = async(id) => {
        axios.put(`/calendar/events/${id}`,inpval)
                 .then((response) => {
                     toast.success('Event Updated successfully !')
                     console.log(response)
                     handleClose2()
                    // fetchData()
                     window.location.reload(false);                
                 })
                 .catch((e) =>{
                     toast.error('Failed to update Event !')
                 })
      }
    const deleteEvent = async (id) => {
        //e.preventDefault();
       await  axios.delete(`/calendar/events/${id}`)
        .then(() => {
          toast.success('Event Deleted successfully !')
          handleClose2() 
          //fetchData()
          window.location.reload(false); 
      })
      .catch((e) =>{
        console.log(e)
          toast.error('Failed to Delete Event !')
      })
      }
  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
  return (
    <div  className={className}>
      {day.value === 'padding' ? '' : day.value}

      {day.event &&  <div className='event'>
        <div>
        {day.event.title}
        <br></br>
        <div className='div-time'style={{display: "flex", flexDirection: "row"}}>
          {day.event.time}
          <div>-</div>
          {day.event.time2}
          </div>
          </div>
          <div>
          <button style={{backgroundColor: "#58bae4",color: "white", border: "none", fontSize: 13}} onClick={()=>{handleShow2()}} ><i className='fa fa-ellipsis-v'></i></button>
          </div>
          {
            <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Update an Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="text" onChange ={setdata2} value={inpval.eventName} placeholder="Enter name" name="eventName" />
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Event Start Date</Form.Label>
              <Form.Control type="datetime-local" onChange ={setdata2} value={inpval.startDate} name="startDate" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Event End Date</Form.Label>
              <Form.Control type="datetime-local" onChange ={setdata2} value={inpval.endDate} name="endDate"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" onChange ={setdata2} rows={3} value={inpval.eventDescription} placeholder="Write Something here ..." name="eventDescription" />
            </Form.Group>
          </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={()=>deleteEvent(day.event.id)}>
                <i className="fa fa-trash-o fa-fw"></i>
                Delete
              </Button>
              <Button variant="secondary" style={{background: "rgb(30, 45, 78)"}} onClick={()=>editinpdata(day.event.id)}> 
              <i className="fa fa-pencil fa-fw"></i>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
          }
          </div>}
          
    </div>
  );
};