import React, {useEffect, useState } from "react";
import axios from "axios";
import "./File.css";

const File = ({files, setFiles, removeFile}) => {
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        file.isUploading = true;
        setFiles([...files, file])

        //upload file
        const formData = new FormData();
        formData.append(
            file.name,
            file,
            //file.name
        )
        // axios.post('http://localhost:3001/file/upload',formData)
        // .then((res) => {
        //     file.isUploading = false;
        //     setFiles([...files, file])    
        // })
        // .catch((err) => {
        //     //inform the user
        //     console.error(err)
        //     removeFile(file.name)
        // })

    }
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //   getMultipleFiles();
    // }, []);
    
    // const getMultipleFiles = async () => {
    //   const response = await axios.get("http://localhost:3001/file/getMultipleFiles");
    //   if (response.status === 200) {
    //     setData(response.data);
    //   }
    // }
   

  return (
    <main>
      <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <div className="panel panel-dark-outline tabs-panel">
                <div className="panel-heading">
                  {/* <ul className="nav nav-tabs pull-left type-document">
                    <li className="active">
                      <a
                        data-toggle="tab"
                        href=".documents-panel"
                        aria-expanded="true"
                        style={{textDecoration:"none"}}
                      >
                        {" "}
                        <i className="fa fa-file"></i> Documents
                      </a>
                    </li>
                    <li className="">
                      <a
                        data-toggle="tab"
                        href=".images-panel"
                        aria-expanded="false"
                        style={{textDecoration:"none"}}
                      >
                        <i className="fa fa-file-image-o"></i> Images{" "}
                      </a>
                    </li>
                  </ul> */}
                  <div className="clear"></div>
                </div>
                <div className="panel-body tab-content">
                  <div className="tab-pane active documents-panel">
                    {/* <a className="label label-success" href="#">
                      Excel
                    </a>
                    <a className="label label-info" href="#">
                      Word
                    </a>
                    <a className="label label-warning" href="#">
                      Powerpoint
                    </a>
                    <a className="label label-danger" href="#">
                      PDF
                    </a>
                    <a className="label label-dark" href="#">
                      Video
                    </a> */}
                    <div className="clear"></div>
                    
                    <div className="v-spacing-xs"></div>
                    <h4 className="no-margin-top"> Folders</h4>
                    <ul className="folders list-unstyled">
                      <li>
                        <a href="#">
                          <i className="fa fa-folder"></i> Web projects
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-folder"></i> Presentation files
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-folder"></i> Books
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-folder"></i> Contest
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-folder"></i> Our Projects
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-folder"></i> Our Music
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-folder"></i> Messenger sounds
                        </a>
                      </li>
                    </ul>
                    <div className="v-spacing-xs"></div>
                    <div className="file-inputs">
                    <input type="file" onChange={uploadHandler}/>
                    <button>
                    <i className="fa fa-plus"> </i>
                    Update
                    </button>
                    </div>
                  </div>
                  <div className="tab-pane images-panel">
                    <h4 className="no-margin-top"> Folders</h4>
                    <ul className="folders list-unstyled">
                      <li>
                        <a href="#">
                          <i className="fa fa-folder"></i> April meeting
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-folder"></i> Application presentation
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-folder"></i> Staff profile pictures
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-folder"></i> Trip to Yosemite
                        </a>
                      </li>
                    </ul>
                    <div className="v-spacing-xs"></div>
                    <div className="file-inputs">
                    <input type="file" onChange={uploadHandler}/>
                    <button>
                    <i className="fa fa-plus"> </i>
                    Update
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-8 tab-content no-bg no-border">
              <div className="tab-pane active documents documents-panel">
                <div className="document success">    
                <i className="fa fa-download" style={{marginLeft: 190,marginTop: 8,color: "lightgray",fontSize: 20 }}></i>
                  <div className="document-body">
                    <i className="fa fa-file-excel-o text-success"></i>
                  </div>
                  <div className="document-footer">
                      <div className="document-name-desc">
                    <span className="document-name"> Excel database 2017 </span>
                    <span className="document-description"> 1.2 MB </span>
                    </div>
                    <div className="document-btn-delete">
                          <i className="fa fa-trash-o" style={{color: "lightgray",fontSize: 18 }}></i>
                    </div>
                  </div>
                </div>
                <div className="document">
                <i href="#" className="fa fa-download" style={{marginLeft: 190,marginTop: 8,color: "lightgray",fontSize: 20 }}></i>
                  <div className="document-body">
                    <i className="fa fa-file-excel-o text-success"></i>
                  </div>
                  <div className="document-footer">
                  <div className="document-name-desc">
                    <span className="document-name"> Excel database 2016 </span>
                    <span className="document-description"> 1.1 MB </span>
                    </div>
                    <div className="document-btn-delete">
                          <i className="fa fa-trash-o" style={{color: "lightgray",fontSize: 18 }}></i>
                    </div>
                  </div>
                </div>
                <div className="document info">
                <i href="#" className="fa fa-download" style={{marginLeft: 190,marginTop: 8,color: "lightgray",fontSize: 20 }}></i>
                  <div className="document-body">
                    <i className="fa fa-file-word-o text-info"></i>
                  </div>
                  <div className="document-footer">
                  <div className="document-name-desc">
                    <span className="document-name"> Word file 2017 </span>
                    <span className="document-description"> 932 KB </span>
                    </div>
                    <div className="document-btn-delete">
                          <i className="fa fa-trash-o" style={{color: "lightgray",fontSize: 18 }}></i>
                    </div>
                  </div>
                </div>
                <div className="document">
                <i href="#" className="fa fa-download" style={{marginLeft: 190,marginTop: 8,color: "lightgray",fontSize: 20 }}></i>
                  <div className="document-body">
                    <i className="fa fa-file-word-o text-info"></i>
                  </div>
                  <div className="document-footer">
                  <div className="document-name-desc">
                    <span className="document-name"> Word file 2016 </span>
                    <span className="document-description"> 426 MB </span>
                    </div>
                    <div className="document-btn-delete">
                          <i className="fa fa-trash-o" style={{color: "lightgray",fontSize: 18 }}></i>
                    </div>
                  </div>
                </div>
                <div className="document warning">
                <i href="#" className="fa fa-download" style={{marginLeft: 190,marginTop: 8,color: "lightgray",fontSize: 20 }}></i>
                  <div className="document-body">
                    <i className="fa fa-file-powerpoint-o text-warning"></i>
                  </div>
                  <div className="document-footer">
                  <div className="document-name-desc">
                    <span className="document-name"> Presentation 2017 </span>
                    <span className="document-description"> 2.7 MB </span>
                    </div>
                    <div className="document-btn-delete">
                          <i className="fa fa-trash-o" style={{color: "lightgray",fontSize: 18 }}></i>
                    </div>
                  </div>
                </div>
                <div className="document">
                <i href="#" className="fa fa-download" style={{marginLeft: 190,marginTop: 8,color: "lightgray",fontSize: 20 }}></i>
                  <div className="document-body">
                    <i className="fa fa-file-powerpoint-o text-warning"></i>
                  </div>
                  <div className="document-footer">
                  <div className="document-name-desc">
                    <span className="document-name"> Presentation 2016 </span>
                    <span className="document-description"> 1.9 MB </span>
                    </div>
                    <div className="document-btn-delete">
                          <i className="fa fa-trash-o" style={{color: "lightgray",fontSize: 18 }}></i>
                    </div>
                  </div>
                </div>
                <div className="document danger">
                <i href="#" className="fa fa-download" style={{marginLeft: 190,marginTop: 8,color: "lightgray",fontSize: 20 }}></i>
                  <div className="document-body">
                    <i className="fa fa-file-pdf-o text-danger"></i>
                  </div>
                  <div className="document-footer">
                  <div className="document-name-desc">
                    <span className="document-name"> PDF file 2017 </span>
                    <span className="document-description"> 5.3 MB </span>
                    </div>
                    <div className="document-btn-delete">
                          <i className="fa fa-trash-o" style={{color: "lightgray",fontSize: 18 }}></i>
                    </div>
                  </div>
                </div>
                <div className="document">
                <i href="#" className="fa fa-download" style={{marginLeft: 190,marginTop: 8,color: "lightgray",fontSize: 20 }}></i>
                  <div className="document-body">
                    <i className="fa fa-file-pdf-o text-danger"></i>
                  </div>
                  <div className="document-footer">
                  <div className="document-name-desc">
                    <span className="document-name"> PDF file 2016 </span>
                    <span className="document-description"> 4.4 MB </span>
                    </div>
                    <div className="document-btn-delete">
                          <i className="fa fa-trash-o" style={{color: "lightgray",fontSize: 18 }}></i>
                    </div>
                  </div>
                </div>
                <div className="document dark">
                <i href="#" className="fa fa-download" style={{marginLeft: 190,marginTop: 8,color: "lightgray",fontSize: 20 }}></i>
                  <div className="document-body">
                    <i className="fa fa-file-video-o text-dark"></i>
                  </div>
                  <div className="document-footer">
                  <div className="document-name-desc">
                    <span className="document-name text-dark">
                      {" "}
                      Video file 2017{" "}
                    </span>
                    <span className="document-description"> 18.2 MB </span>
                    </div>
                    <div className="document-btn-delete">
                          <i className="fa fa-trash-o" style={{color: "lightgray",fontSize: 18 }}></i>
                    </div>
                  </div>
                </div>
                <div className="document">
                <i href="#" className="fa fa-download" style={{marginLeft: 190,marginTop: 8,color: "lightgray",fontSize: 20 }}></i>
                  <div className="document-body">
                    <i className="fa fa-file-video-o text-dark"></i>
                  </div>
                  <div className="document-footer">
                  <div className="document-name-desc">
                    <span className="document-name"> Video file 2016 </span>
                    <span className="document-description"> 23.7 MB </span>
                    </div>
                    <div className="document-btn-delete">
                          <i className="fa fa-trash-o" style={{color: "lightgray",fontSize: 18 }}></i>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="tab-pane documents images-panel">
              {data.map((fileData, index) => {
                return(
                  <div className="document" key={index}>
                <div className="document-body">
                  <img src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                </div>
                <div className="document-footer">
                {fileData.files.map((file, index2) =>
                  <div className="document-name-desc" key={index2}>
                  <span className="document-name"> {file.fileName}</span>
                  <span className="document-description"> {file.sizeName} </span>
                  </div>
                  )}
                  <div className="document-btn-delete">
                        <i className="fa fa-trash-o" style={{color: "lightgray",fontSize: 18 }}></i>
                  </div>
                </div>
              </div>
                )
              })}
              </div> */}
            </div>
          </div>
      </div>
    </main>
  );
};

export default File;
