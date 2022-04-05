import React from 'react';
import "./popup.css"
import close from "../../assets/close.png";
import {useHistory} from "react-router-dom";
function AddPopup(props) {
    const history = useHistory();
    return (
        <div className="popup">
            <div className="popup-inner">
        <button style={{
            backgroundImage: `url(${close})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }} className="close-btn" onClick={()=>history.goBack()}>X</button>
                {props.children}
            </div>
        </div>
    );
}

export default AddPopup;