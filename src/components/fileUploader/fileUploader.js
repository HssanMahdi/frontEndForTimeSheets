import React, { useEffect, useState } from 'react'
import hello from "../../assets/file-downloading-1.png";
import AddFile from '../addFile/AddFile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./fileUploader.css";
import axios from 'axios';
import './fileUploader.scss';
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";

const FileUploader = () => {

  const { EmployeeReducer } = useSelector((state) => state);

const config = {
    headers: {
      Authorization: `Bearer ${EmployeeReducer.token}`,
    },
  };

    const [files, setFiles] = useState([]);
    const getSingleFiles = async () => {
      try {
          const {data} = await axios.get('/file/getSingleFiles',config);
          return data;
      } catch (error) {
          throw(error)
      }
  }
    const [singleFiles, setSingleFiles] = useState([]);
    const getSingleFileslist = async () => {
      try {
        const fileslist = await getSingleFiles();
        setSingleFiles(fileslist);
        //console.log("getting list::",fileslist);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      getSingleFileslist();
    }, [])
    const deleteFile = async (id) => {
      //e.preventDefault();
     await  axios.delete(`/file/deleteSingleFile/${id}`)
      .then(() => {
        toast.success('File Deleted successfully !')
        getSingleFileslist();
    })
    .catch((e) =>{
        toast.error('Delete Error !')
    })
    }

    const openInNewTab = (url) => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
  }

  return (
    <main>
        <div className="container-fluid">
        <div className="main__title ">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Your files</h1>
            <p>Upload a file</p>
          </div>
        </div>
        <hr></hr>
        <AddFile files = {files} setFiles={setFiles} getSingleFileslist={getSingleFileslist} config={config} />
        {singleFiles.map((file,index)=> {
          return(
            <ul className="file-list" style={{width: 400}} key={index}>
          <li className="list-item">
          <i className="fa fa-file" aria-hidden="true"></i>
          <p onClick={() => {openInNewTab("http://localhost:3001/"+file.filePath)}} >{file.fileName}</p>
          <div className="actions">
          <i className="fa fa-trash-o" onClick={()=>deleteFile(file._id)} aria-hidden="true"></i>
          </div>
        
         </li>
         </ul>
          )
          
        })}
        
        <ToastContainer/> 
</div>
</main>
  )
};

export default FileUploader;
