import React, {useState, useReducer} from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import "./AddFile.css";

function AddFile({files, setFiles, getSingleFileslist, config}) {

    const onInputChange = (e) => {
        setFiles(e.target.files[0])
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', files);
        
        axios.post('/file/singleFile', data, config)
             .then((response) => {
                 toast.success('Uploaded successfully !')
                 setFiles(response.data)
                 getSingleFileslist();
                 //console.log(response.data)
             })
             .catch((e) =>{
                 toast.error('Upload Error !')
             })
    }
  return (
    <form method="post" action="#" id="#" onSubmit={onSubmit}>
           
              
              
              
    <div className="form-group files">
      <input type="file" 
             onChange={onInputChange}
             className="form-control" 
             multiple/>
    </div>
    <div className='clear'></div>
    <button className='btn btn-secondary'style={{ background:"rgb(30, 45, 78)",marginLeft: 20,marginBottom: 20}}>
        <i className='bi bi-upload' style={{marginRight: 7}}></i>
        Upload</button>
  
</form>
  )
}

export default AddFile;