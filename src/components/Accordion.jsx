import React, { useRef,useState } from "react";
import expand from "@icons/expand.svg";
import "../styles/Accordion.css";

export function Accordion({ anotacion }) {
  const refPanel = useRef(null);
  const refButton = useRef(null);
  const refIcon = useRef(null);

  function formatFecha(ms){
    const fecha = new Date();
    fecha.setTime(ms*1000);
    return (fecha.toLocaleDateString());
  }

  function handleClick(e) {
    refButton.current.classList.toggle("active");
    if (refPanel.current.style.maxHeight) {
      refPanel.current.style.maxHeight = null;
      refIcon.current.classList.remove('is-active');
    } else {
      refPanel.current.style.maxHeight = refPanel.current.scrollHeight + "px";
      refIcon.current.classList.add('is-active');
    }
  }

  return (
    <>
      <button ref={refButton} onClick={handleClick} className="accordion">
        <p className="acorddion__title">
          {
            `${formatFecha(anotacion.date.seconds)}, ${anotacion.title} (${anotacion.docente})`
          }
        </p>
        <img ref={refIcon} className="acorddion__icon" height="24" width="24" src={expand} alt="" />
      </button>
      <div ref={refPanel} className="panel">
        <p className="acorddion__body">
          {
            anotacion.description
          }
        </p>
      </div>
    </>
  );
}
