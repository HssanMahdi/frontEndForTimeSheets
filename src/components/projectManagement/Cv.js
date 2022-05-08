import React, {useEffect, useState,} from 'react'
import axios from "axios";


export default   function Cv() {
     const [cvDisplayed, setCvDisplayed] = useState([]);
     const [videos, setVideos] = useState();

     useEffect(
        async () => {
        await axios.get("/cv/allCvs").then(
            (response) => {
                setCvDisplayed(response.data)
                console.log("cvvv",cvDisplayed)
            })}, [])


    const hadleSubmit = async (e) => {
        e.preventDefault()
        let formdata = new FormData();
        for (let key in videos) {
            formdata.append("videos", videos[key]);
        }
        //formdata.append("name", name);
        await axios.post("/cv/create", formdata)
            .then(async (success) => {
                //getAllMedias();
                alert("Submitted successfully");
                 await axios.get("/cv/allCvs").then(
                     (response) => {
                         setCvDisplayed(response.data)
                         console.log(response.data)
                     })
            })
            .catch((error) => {
                console.log(error);
                alert("Error happened!");
            });
    };

    return (
        <div className="container">
            <form onSubmit={hadleSubmit}>
                {/* <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>*/}
                <div className="form-group">
                    <label htmlFor="videos">Upload cv</label>
                    <input
                        type="file"
                        name="videos"
                        id="videos"
                        multiple
                        className="form-control"
                        accept=".mp4, .mkv"
                        onChange={(e) => {
                            setVideos(e.target.files);
                        }}
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-2">
                    Submit
                </button>
            </form>
            {/* listdisplay*/}
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th width="200">Name</th>
                            <th>Videos</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cvDisplayed && cvDisplayed?.map((cv) => {
                            return (
                                <tr>
                                    <td>{cv?._id}</td>
                                    <td>
                                        {cv?.videos?.map((video) => {
                                            return (
                                                <video
                                                    preload="auto"
                                                    width="320"
                                                    height="240"
                                                    controls
                                                >
                                                    <source src={`${video}`}/>
                                                    ;Your browser does not support the video tag.
                                                </video>
                                            );
                                        })}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}