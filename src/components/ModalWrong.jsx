import React from "react";
import "../styles/ModalMsg.css";
import iconError from "@icons/error.svg";
export function ModalWrong({ msg,setWrong }) {
  return (
    <div className="modal-container">
      <article className="modal-card">
        <img width="36" height="36" src={iconError} alt="icono de error" />
        <h2 className="madal-card__title">Error</h2>
        <p>{msg}</p>
        <button onClick={()=>setWrong(false)} className="modal-card__btn">Ok</button>
      </article>
    </div>
  );
}
