import React, { useCallback, useEffect, useState, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./FileEdit.css";
import "../navbar/Navbar.js";
import "../sidebar/Sidebar.js";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import {sendMail} from './helper/Mail'
import axios from "axios";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";


const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function FileEdit() {
  const { EmployeeReducer } = useSelector((state) => state);
const [employeesList, setEmployeesList] = useState([]);
const [suggestions,setSuggestions] = useState([])
const [text,setText] = useState('');


  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [show, setShow] = useState(false);
  // console.log("user connected",EmployeeReducer.connectedEmployee)
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  //console.log(documentId);
  useEffect(() => {
    const s = io("http://localhost:3002");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-message", delta);
    };
    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);


const [values,setValues] = useState({
  //userEmail: "",
  subject: "",
  message: window.location.href,
  status: false
})
const {subject,message,status}=values;
const handleChange=name=>event=>{
  setValues({...values,[name]:event.target.value})
}

const handleSubmit=event=>{
  event.preventDefault();
  //console.log("values email", userEmail);
  console.log("values subject", subject);
  console.log("values message",mailEmp);
  sendMail({mailEmp,subject,message}).then(data=>{
    if(data.err){
      console.log("err",data.err)
    }else{
      console.log("Success",data);
      setValues({...values,status:true})
      handleClose()
    }
  }).catch(console.log("error in send mail"))
}


const config = {
    headers: {
        Authorization: `Bearer ${EmployeeReducer.token}`,
    },
};
const fetchEmployeesList = async () => {
  const { data } = await axios.get('/employee/',config);
  setEmployeesList(data);
}
useEffect(() => {
  fetchEmployeesList();
}, [])
//console.log(employeesList)
const onChangeHandler = (text) => {
  let matches = []
  if (text.length>0){
    matches = employeesList.filter(usr => {
      const regex = new RegExp(`${text}`,"gi");
      return usr.email.match(regex)
    })
  }
  console.log('matches',matches)
  setSuggestions(matches)
  setText(text)
}
const[mailEmp,setMailEmp]=useState()
const onSuggestHandler = (mail) => {
  setText(mail);
  setMailEmp(mail)
  setSuggestions([])
}
// console.log("mail:",mailEmp)
//console.log("userMail:",userEmail)

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <main>
      <div className="NavigationBar">
        <div className="div-btn" style={{display: "flex",flexDirection: "row"}}>
        <div>
        <button className="btn btn-secondary" onClick={handlePrint} style={{ background: "rgb(30, 45, 78)"}} >
        <i className="fas fa-file-pdf" style={{ marginRight: 7 }}></i>
        Download
        </button>
        </div>
          <button
            className="btn btn-secondary"
            onClick={handleShow}
            style={{ background: "rgb(30, 45, 78)"}}
          >
            <i className="fas fa-share" style={{ marginRight: 7 }}></i>
            Share
          </button>
          {
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Share File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>To:</Form.Label>
            <Form.Control type="email" placeholder="search employee email" value={text} 
            onChange={e =>{onChangeHandler(e.target.value)}} name="to" required />
            <div className="dataResult">
            {suggestions?.map((employee, key) => {
              return <div key={key} className="suggestion col-md-12 justify-content-md-center"
              onClick={()=>onSuggestHandler(employee.email)}>{employee.email}</div>
            })}
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text"  name="subject" placeholder="Write Something here ..." value={subject} onChange={handleChange("subject")} required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea"  rows={3} value={message} onChange={handleChange("message")}  placeholder="Write Something here ..." name="message" readOnly />
          </Form.Group>
        </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="secondary" style={{background: "rgb(30, 45, 78)"}} onClick={handleSubmit} >
              <i className="fa fa-paper-plane" style={{marginRight: 7}}></i>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
          }
        </div>
      </div>
      <div ref={componentRef}>
      <div className="page__container" ref={wrapperRef}></div>
      </div>
    </main>
  );
}
