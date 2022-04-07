import React from "react";
import "../styles/ModalMsg.css";
import { Loader } from "./Loader";


export function ModalLoader() {
  return (
    <div className="modal-container modal-container--loader">
     <Loader/>
    </div>
  );
}