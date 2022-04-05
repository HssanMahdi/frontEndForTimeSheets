import React, {useState, useEffect} from 'react'
import {Grid, TextField,} from '@material-ui/core';
import Controls from "./controls";
import {Form} from './useForm';
import axios from "axios";
import IconAvatars from './IconAvatars'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Checkbox from "@mui/material/Checkbox";
import {blue} from "@mui/material/colors";


const label = {inputProps: 'aria-label'};

const technologiesData = [
    {name: "Java"}, {name: "NodeJs"}, {name: "ReactJs"}, {name: "Symfony"}, {name: "Angular"},
    {name: "Spring"}, {name: "Python"}, {name: "MongoDb"}, {name: "MySql"}
];


export default function ProjectForm() {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null)
    const [technologies, setTechnologies] = useState([]);
    const [tech, setTech] = useState([]);


    useEffect(() => {
        setTechnologies(technologiesData);
    }, []);


    const handleChange1 = (e) => {
        const {name, checked} = e.target;
        let tempUser = technologies.map((technologie) =>
            technologie.name === name
                ? {...technologie, isChecked: checked}
                : technologie
        );
        setTechnologies(tempUser);
    };


    /*const handleChange2= (startDate) =>{
        console.log('dateee',startDate)
        setStartDate(startDate);
    };*/
    const handleSubmit = async e => {
        console.log('hellooooooooooooooooo')
        const tab = [];
        for (let i = 0; i < technologies.length; i++) {
            if (technologies[i].isChecked && technologies[i].name != null) {
                tab.push(technologies[i].name);
            }
        }
        e.preventDefault()
        const res = await axios.post("/projects/", {
            projectName: projectName,
            description: description,
            startDate: startDate,
            endDate: endDate,
            technologies: tab

        })
    }

    return (

        <Form onSubmit={handleSubmit}>
            <IconAvatars></IconAvatars>
            <Grid container>
                <Grid item xs={8}>

                    <TextField id="outlined-basic" label="Project Name" variant="outlined"
                               value={projectName}
                               onChange={(event) => {
                                   setProjectName(event.target.value)

                               }}/>
                    <TextField id="outlined-basic" label="Project Description" variant="outlined"
                               value={description}
                               onChange={(event) => {
                                   setDescription(event.target.value)

                               }}/>


                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            type="date"
                            label="Start Date"
                            inputFormat="MM/dd/yyyy"
                            value={startDate}
                            onChange={(event) => {
                                setStartDate(event)

                            }} renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            type="date"
                            label="End Date"
                            inputFormat="MM/dd/yyyy"
                            value={endDate}
                            onChange={(event) => {
                                setEndDate(event)
                            }} renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                </Grid>
                <div className="row">
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
                                          sx={{
                                              color: blue[500],
                                              "&.Mui-checked": {
                                                  color: blue[500]
                                              }
                                          }}/>

                            </div>
                        ))}

                    </div>

                </div>

            </Grid>


            <div>
                <Controls.Button
                    type="submit"
                    text="Submit"/>
            </div>
        </Form>
    )
}