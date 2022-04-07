import React, { useState, useRef,useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/FormLogin.css";
import edit from "@icons/edit.svg";
import done from "@icons/done.svg";
import firebaseApp from "../service/firebaseApp";
import {getFirestore, collection,doc,updateDoc,} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export function ToggleUpDate({student,collection,field, valor,tipo }) {
  const { state} = useContext(AppContext);
  const [enable, setEnable] = useState(false);
  const [val, setVal] = useState(valor);
  const refInput = useRef(null);

  async function handleClick() {
    if (!enable) {
      refInput.current.disabled = false;
      refInput.current.classList.add("enable");
    } else {
      refInput.current.disabled = true;
      refInput.current.classList.remove("enable");
      if(collection ==="students"){
        await updateDoc(doc(db, "students",String(student.ni)),{
          [field]:val
        });
      }else if(collection ==="acudiente"){
        await updateDoc(doc(db, "students",String(student.ni),"acudiente",String(`ac-${student.ni}`)),{
          [field]:val
        });
      }
      
    }
    setEnable(!enable);
  }

  function handleChange(e) {
    setVal(e.target.value);
  }

  return (
    <>
    {
      (state.group === state.curso || state.group ==='Coor') &&(
        <button
        onClick={handleClick}
        className="estudent-info__icon estudent-info__icon--edit"
      >
        {!enable ? <img src={edit} alt="" /> : <img src={done} alt="" />}
      </button>
      )
    }
      <input
        ref={refInput}
        onChange={handleChange}
        type={tipo}
        disabled
        value={val}
        className="input-update"
      />
    </>
  );
}
