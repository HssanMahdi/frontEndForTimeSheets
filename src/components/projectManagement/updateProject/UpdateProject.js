
import React, {useState, useEffect} from 'react'
import {Grid, TextField,} from '@material-ui/core';
import axios from "axios";
import IconAvatars from '../addProject/IconAvatars'
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {Form} from "../addProject/useForm";
import { useLocation } from "react-router-dom";




export default function UpdateProject(props) {

    const [data, setData] = useState({
        projectName:'',
       description:'',
       startDate:'',
       endDate:''
    });
    const location = useLocation();


    useEffect(async () => {
        const id = location.state.detail
        console.log(id)
        const a = await axios.get("/projects/" + id)
            .then(res => {
                setData(res.data)
            }).catch(err => console.error(err))

    },[]);

function submit(e){
    e.preventDefault()
    const id= location.state.detail
    axios.put("http://localhost:3001/projects/"+ id, data)
        .then(res=>{
            console.log(res.data)
        }).catch(err=>console.error(err))


}
function handle(e,value){
    const newData={...data}
    newData[e.target.id]=e.target
    setData(newData)
}
    return (

        <Form onSubmit={(e)=>submit(e)} >
            <IconAvatars></IconAvatars>
            <Grid container>

                <Grid item xs={8}>

                    <TextField id="outlined-basic" label="Project Name" variant="outlined"
                               value={data?.projectName}
                               onChange={(e) => {
                                   handle(e)
                               }}/>
                    <TextField id="outlined-basic" label="Project description" variant="outlined"
                               value={data?.description}
                               onChange={(e) => {
                                   handle(e)
                               }}/>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            type="date"
                            label="Start Date"
                            inputFormat="MM/dd/yyyy"
                            value={data?.startDate}
                            onChange={(e) => {
                                handle(e)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            type="date"
                            label="End Date"
                            inputFormat="MM/dd/yyyy"
                            value={data?.endDate}
                            onChange={(e) => {
                                handle(e)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                </Grid>
               {/* <div className="row">
                    <div className="col-form-label-sm"><h6 className="badge badge-primary"> choisir technologies</h6>
                    </div>
                    <div className="row">
                        {technologies.map((t, index) => (
                            <div className="form-check" key={index}>
                                <label className="form-check-label ms-2">{t.name}</label>
                                <Checkbox className="form-check-input"
                                          name={t.name}
                                          checked={t?.isChecked || false}
                                          onChange={handleChange1}
                                          defaultChecked
                                          sx={{
                                              color: blue[500],
                                              "&.Mui-checked": {
                                                  color: blue[500]
                                              }
                                          }}/>

                                 <input
                                type="checkbox"
                                className="form-check-input"
                                name={t.name}
                                checked={t?.isChecked || false}
                                onChange={handleChange1}
                            />
                            <label className="form-check-label ms-2">{t.name}</label>
                            </div>
                        ))}

                    </div>

                </div>
*/}
            </Grid>


           {/* <div>
                <Controls.Button
                    type="submit"
                    text="Submit"/>
            </div>*/}
            <button className="btn btn-outline-primary">submit</button>
        </Form>
    )
}
