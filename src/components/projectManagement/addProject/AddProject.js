import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";
import IconAvatars from './IconAvatars'


const technologiesData = [
    {name: "Java"}, {name: "NodeJs"}, {name: "ReactJs"}, {name: "Symfony"}, {name: "Angular"},
    {name: "Spring"}, {name: "Python"}, {name: "MongoDb"}, {name: "MySql"}
];


export default function AddProject() {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null)
    const [technologies, setTechnologies] = useState([]);

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
    }

    let history = useHistory();

    const handleSubmit = async e => {
        const tab = []
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
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-7 mx-auto">
                    <form className="form-signin" onSubmit={handleSubmit}>
                        <div className="text-center mb-4">
                            <IconAvatars></IconAvatars>
                            <h4 style={{textDecoration: 'underline'}}> add new project</h4>
                        </div>
                        <div className="form-label-group">
                            <label htmlFor="inputEmail4" className="badge badge-primary">project name</label>

                            <input type="text" id="inputEmail4" className="form-control" placeholder="project name" required
                                   autoFocus
                                   value={projectName}
                                   onChange={(event) => {
                                       setProjectName(event.target.value)

                                   }}
                            />
                        </div>
                        <div className="form-label-group">
                            <label htmlFor="inputEmail4" className="badge badge-primary">project description</label>

                            <input type="text" id="inputEmail4" className="form-control" placeholder="description" required
                                   autoFocus
                                   value={description}
                                   onChange={(event) => {
                                       setDescription(event.target.value)

                                   }}/>
                        </div>
                        <div className="form-label-group">
                            <label htmlFor="inputPassword4" className="badge badge-primary">start date</label>
                            <input type="date" id="inputPassword4" className="form-control" placeholder="Password"
                                   required
                                   value={startDate}
                                   onChange={(event) => {
                                       setStartDate(event.target.value)
                                   }}/>
                        </div>
                        <div className="form-label-group">
                            <label htmlFor="inputPassword4" className="badge badge-primary">end date</label>

                            <input type="date" id="inputPassword4" className="form-control" placeholder="Password"
                                   required
                                   value={endDate}
                                   onChange={(event) => {
                                       setEndDate(event.target.value)
                                   }}/>
                        </div>
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
                                ))}
                            </ul>

                        <button className="btn btn-lg btn-primary btn-block" type="submit">register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}