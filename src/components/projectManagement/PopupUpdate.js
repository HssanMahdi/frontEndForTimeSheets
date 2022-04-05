import React from 'react'
import'./Popup.css'
export default function PopupUpdate(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">

                <button className="close-btn" onClick={()=>props.setTrigger(false)}>  <i className="fa fa-times" aria-hidden="true" ></i>

                </button>
                {props.children}
            </div>

        </div>
    ):"";
}
