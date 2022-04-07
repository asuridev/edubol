import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Card.css";
import add from "@icons/add.svg";
import { ModalAnotacion } from "./ModalAnotacion";
// import { ModalDetails } from "../pages/Details";

export function Card({ student }) {
  const [anotacion, setAnotacion] =  useState(false);
  let navigate = useNavigate();
  // const [details, setDetails] =  useState(false)
  let styleCard;
  let styleMark;

  if (student.mark === 0) {
    styleCard = "card-green";
    styleMark = "mark-green";
  } else if (student.mark >= 1 && student.mark <= 2) {
    styleCard = "card-blue";
    styleMark = "mark-blue";
  } else if (student.mark >= 3 && student.mark <= 5) {
    styleCard = "card-orange";
    styleMark = "mark-orange";
  } else if (student.mark > 5) {
    styleCard = "card-red";
    styleMark = "mark-red";
  }

  function handleDetails() {
    navigate(`${student.ni}`);
  }

  function handleAdd() {
    setAnotacion(true);
  }

  return (
    <>
      <article className={`card ${styleCard}`}>
        <div className="card__content">
          <div className={`card__mark ${styleMark}`}>{student.mark} </div>
          <div
            onClick={handleDetails}
            className="card__body"
          >{`${student.last} ${student.name}`}</div>
        </div>

        <div onClick={handleAdd} className="card__add">
          <img width="24" height="24" src={add} alt="" />
        </div>
      </article>
      {
        anotacion && <ModalAnotacion student={student} setAnotacion={setAnotacion}/>
      }
     
    </>
  );
}
