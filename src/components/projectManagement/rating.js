import React, {useState, useEffect} from 'react'
import axios from "axios";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import './rating.css'
import man from "../../assets/man.png";

export default function Rating() {
    const [number, setNumber] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);
    const [allEmployeeList, setAllEmployeeList] = useState([]);
    const [idE, setIdE] = useState();



    const afficheModal = (id) => {
        setIdE(id);
    }
    useEffect(
        async () => {
            await axios.get("/projects/allEmployees").then(
                (res) => {
                    setAllEmployeeList(res.data)
                }
            );
        }, []
    )
    const handleText = () => {
        switch (number || hoverStar) {
            case 0:
                return "Evaluate";
            case 1:
                return "Dissatifation";
            case 2:
                return "Unsatisfied";
            case 3:
                return "Normal";
            case 4:
                return "Satisfied";
            case 5:
                return "Very Satisfied";
            default:
                return "Evaluate";
        }
    };

    const handleSubmit = async  () =>{
        const res = await axios.put("/projects/ratingEmployee/"+idE, {
           rating:number

        })
        console.log(number)    }
    return (
        <main>
            <div className="main__container">
        <div className="App">
            <div className="project-boxes jsGridView">
            {allEmployeeList.map((emp, key) => {
                return <div className="project-box-wrapper">
                    <div className="project-box">
                 <div className="container">
                {/*<h1>Employee Flip Card using CSS Animations</h1>*/}
                <div className="flip-card" key={emp._id}>
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <div className="employee-image-container" id="john-smith" ><img src={man} style={ {width:50,height:50}}/></div>
                            <h2 className="employee-title">{emp?.userName} </h2>
                            <p className="employee-description">Developer, OnTime</p>
                        </div>
                        <div className="flip-card-back">
                            <div className="info-row-container">
                                <div className="info-row">
                                    <span className="icon"><i className="fa fa-envelope"></i>
                                    </span>
                                    <span className="info"><a href="#">{emp?.email}</a></span>
                                </div>
                                <div className="info-row">
                                    <span className="icon"><i className='fa fa-folder-open'></i>
</span>
                                    <span className="info"> Worked Projects:{emp?.projects.length}</span>
                                </div>
                                <div className="info-row">
                                    <span className="icon"><i className='fa fa-star'></i>

</span>
                                    <span className="info"> reviews: {emp?.nbRating}</span>
                                </div>
                                <div className="info" style={{color: '#4f3ff0'}}>
                                    <strong>Skills: </strong> {emp?.skills?.map((skill) => {
                                    return  <strong>{skill},</strong>   })}
                                </div>

                            </div>
                        </div>
                    </div>
                    <a href="#newModal"   onClick={() => afficheModal(emp?._id)}  data-toggle="modal">add review
                    </a>
                    {/*<button className={` ${!number && "disabled"} `}  onClick={() => handleSubmit(emp._id)}>Submit</button>*/}
                    <div></div>
                </div>
            </div>
                </div>
                </div>
            })}
            </div>
        </div>

                {/*new  modal*/}
                <div id="newModal" className="modal fade" >
                    <div className="modal-dialog">
                        <div className="modal-content" >
                            <div>
                                <h1>{handleText()}</h1>
                                {Array(5)
                                    .fill()
                                    .map((_, index) =>
                                        number >= index + 1 || hoverStar >= index + 1 ? (
                                            <AiFillStar
                                                onMouseOver={() => !number && setHoverStar(index + 1)}
                                                onMouseLeave={() => setHoverStar(undefined)}
                                                style={{ color: "orange" }}
                                                onClick={() => setNumber(index + 1)}
                                            />
                                        ) : (
                                            <AiOutlineStar
                                                onMouseOver={() => !number && setHoverStar(index + 1)}
                                                onMouseLeave={() => setHoverStar(undefined)}
                                                style={{ color: "orange" }}
                                                onClick={() => setNumber(index + 1)}
                                            />
                                        )
                                    )}
                            </div>
                            <button className={` ${!number && "disabled"} `}  onClick={() => handleSubmit()}>Submit</button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}





