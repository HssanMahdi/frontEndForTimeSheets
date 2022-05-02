
import React, {useState, useEffect} from 'react'
import axios from "axios";
import IconAvatars from '../addProject/IconAvatars'
import { useLocation } from "react-router-dom";

/*const technologiesData = [
    {name: "Java"}, {name: "NodeJs"}, {name: "ReactJs"}, {name: "Symfony"}, {name: "Angular"},
    {name: "Spring"}, {name: "Python"}, {name: "MongoDb"}, {name: "MySql"}
];*/

export default function UpdateProject(props) {
    const [employees,setEmployees]=useState([])
    const [projectLeader,setProjectLeader]=useState([])
    const [newdate,setNewDate]=useState()
    const [endDate,setEndDate]=useState()

    const [data, setData] = useState({
         projectName:'',
         description:'',
         startDate:'',
         endDate:''
    });
    // const [technologies, setTechnologies] = useState([]);

    const location = useLocation();



    useEffect(async () => {
        var d=""
        var endD=""
        const id = location.state.detail
        // setTechnologies(technologiesData)
        const a = await axios.get("/projects/" + id)
            .then(res => {
                setData(res.data)
                d=res.data.startDate.split("T")
                setNewDate(d[0])
                endD=res.data.endDate.split('T');
                setEndDate(endD[0])

                setEmployees(res.data.employees)
                setProjectLeader(res.data.projectLeader)
            }).catch(err => console.error(err))
    },[]);

    /* const handleChange1 = (e) => {
         const {name, checked} = e.target;
         let tempUser = technologies.map((technologie) =>
             technologie.name === name
                 ? {...technologie, isChecked: checked}
                 : technologie
         );
         setTechnologies(tempUser);
     }*/

async function submit(e) {
    e.preventDefault()
    const id = location.state.detail
    await axios.patch("/projects/" + id, data)
        .then(res => {
            console.log(res.data)
        }).catch(err => console.error(err))


}

    const handle =e=>{
        const { name, value } = e.target;
        setData({ ...data, [name]: value });

    }


        return (
/*
        <Form onSubmit={(e)=>submit(e)} >
            <IconAvatars></IconAvatars>
            <Grid container>

                <Grid item xs={8}>

                    <TextField id="outlined-basic" label="Project Name" variant="outlined"
                               onChange={(e) => {
                                   handle(e)
                               }}/>
                    <TextField id="outlined-basic" label="Project description" variant="outlined"
                               onChange={(e) => {
                                   handle(e)
                               }}/>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            type="date"
                            label="Start Date"
                            inputFormat="MM/dd/yyyy"
                            onChange={(e) => {
                                handle(e)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            type="date"
                            label="End Date"
                            inputFormat="MM/dd/yyyy"
                            onChange={(e) => {
                                handle(e)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                </Grid>
               {/!* <div className="row">
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
*!/}
            </Grid>


           {/!* <div>
                <Controls.Button
                    type="submit"
                    text="Submit"/>
            </div>*!/}
            <button className="btn btn-outline-primary">submit</button>
        </Form>
*/
        <main>
            <div className="main__container-oo">
                <div className="col-lg-12 col-md-10 mx-auto ">
                    <form className="form-signin-oo" onSubmit={submit}>
                        <div className="text-center mb-4">
                            <IconAvatars></IconAvatars>
                            <h4 style={{textDecoration: 'underline'}}> Update project</h4>
                        </div>
                        <div className="form-label-group-oo">
                            <label htmlFor="inputEmail4" className="badge badge-primary">project name</label>
                            <input type="text" id="inputEmail4" className="form-control"   name="projectName"
                                   defaultValue={data.projectName}
                                   onChange={handle}
                            />
                        </div>
                        <div className="form-label-group-oo">
                            <label htmlFor="inputEmail4" className="badge badge-primary">project description</label>
                            <input type="text" id="inputEmail4" className="form-control"
                                   autoFocus
                                   defaultValue={data.description}
                                   onChange={handle}
                            />
                        </div>
                       <div className="form-label-group-oo">
                            <label htmlFor="inputPassword4" className="badge badge-primary">start date</label>
                            <input type="date" id="inputPassword4" className="form-control"
                                   defaultValue={newdate}
                                   onChange={handle}
                            />
                        </div>
                        <div className="form-label-group-oo">
                            <label htmlFor="inputPassword4" className="badge badge-primary">end date</label>
                            <input type="date" id="inputPassword4" className="form-control"
                                   defaultValue={endDate}
                                   onChange={handle}
                            />
                        </div>
                        <div>

                       {/* <div>
                            <div className="col-form-label-sm"><h6 className="badge badge-primary"> choisir technologies</h6> </div>
                            <ul className="checkbox-grid">
                                {technologies.map((t, index) => (
                                    <li>
                                        <label className="form-check-label"> {t.name}
                                            <input type="checkbox"className="checkbox-circle"
                                                   name={t.name}
                                                   checked={t?.isChecked || false}
                                                   onChange={handleChange1}
                                            />
                                        </label>
                                    </li>
                                ))}a
                            </ul>*/}
                           {/* <div className="col-form-label-lg"><h6 className="badge badge-primary"> project leader</h6>
                            </div>
                        <select className="custom-select custom-select-lg mb-3">
                            <option selected>choice project leader</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>*/}
                           {/* <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">First and last name</span>
                                </div>
                                <input type="text" aria-label="First name" className="form-control">
                                    <input type="text" aria-label="Last name" className="form-control">
                            </div>*/}
                        {/*</div>*/}
                        <button className="btn btn-lg btn-primary btn-block" type="submit">register</button>
                        </div>
                    </form>

                </div>


            </div>
        </main>
    )
}
