import React from 'react'
import'./Popup.css'
export default function Popup(props) {
  return (props.trigger) ? (
    <div className="popup-o">
    <div className="popup-inner-o">

<button className="close-btn-o" onClick={()=>props.setTrigger(false)}>  <i className="fa fa-times" aria-hidden="true" ></i>

</button>
{props.children}
    </div>
    
    </div>
  ):"";
}
