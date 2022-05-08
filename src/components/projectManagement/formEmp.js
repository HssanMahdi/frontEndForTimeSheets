import React, {useState, useEffect} from 'react'
import axios from "axios";



const technologiesData = [
    {name: "Java"}, {name: "NodeJs"}, {name: "ReactJs"}, {name: "Symfony"}, {name: "Angular"},
    {name: "Spring"}, {name: "Python"}, {name: "MongoDb"}, {name: "MySql"}
];


export default function FormEmp() {
    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        setTechnologies(technologiesData);
    }, []);

    const handleChange1 = (e) => {
        const {name, checked} = e.target;
        let temptech = technologies.map((technologie) =>
            technologie.name === name
                ? {...technologie, isChecked: checked}
                : technologie
        );
        setTechnologies(temptech);
    }
    const id="624b80150c7510d0d6d07260"
    const handleSubmit = async e => {
        const tab = []
        for (let i = 0; i < technologies.length; i++) {
            if (technologies[i].isChecked && technologies[i].name != null) {
                tab.push(technologies[i].name);
            }
        }
        e.preventDefault()
        const res = await axios.put("/projects/updateEmp/"+id , {
            skills: tab
        })
        console.log(tab)
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-7 mx-auto">
                    <form className="form-signin" onSubmit={handleSubmit}>
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