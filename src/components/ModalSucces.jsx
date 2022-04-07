import React from "react";
import "../styles/ModalMsg.css";
import iconSucces from "@icons/succes.svg";

export function ModalSucces({ msg,setSucces,setPageEnd = ()=>{} }) {
  function handleClick(){
    setSucces(false);
    setPageEnd(false);
  }
  return (
    <div className="modal-container">
      <article className="modal-card modal-card--succes">
        <img width="36" height="36" src={iconSucces} alt="icono de error" />
        <h2 className="madal-card__title">Proceso Exitoso</h2>
        <p>{msg}</p>
        <button onClick={handleClick} className="modal-card__btn modal-card__btn--succes">Ok</button>
      </article>
    </div>
  );
}
