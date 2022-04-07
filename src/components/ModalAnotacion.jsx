import React, { useState,useContext} from "react";
import { AppContext } from "../context/AppContext";
import escudo from '@logos/escudo.jpg';
import {ModalWrong} from './ModalWrong';
import "../styles/FormLogin.css";
import firebaseApp from "../service/firebaseApp";
import {getFirestore, collection,doc, getDocs,addDoc,setDoc,updateDoc,Timestamp} from "firebase/firestore";
import { ModalSucces } from "./ModalSucces";
import { ModalLoader } from "./ModalLoader";


const db = getFirestore(firebaseApp);

export function ModalAnotacion({student, setAnotacion}) {
  const { state } = useContext(AppContext);
  const [isLoader, setLoader] = useState(false);
  const [isSucces, setSucces] = useState(false);
  const [isWrong, setWrong] = useState(false);
  const [msg, setMsg] = useState('');

  async function handleAnotacion(e){
    e.preventDefault();
    const anotacion = {
      title:e.target.title.value,
      description:e.target.description.value,
      date:Timestamp.fromDate(new Date()),
      docente:state.name
    }
    try {
      setLoader(true);
      await addDoc(
        collection(db, "students", String(student.ni), "anotaciones"),
        { ...anotacion }
      );
      const currentAnotaciones = await getDocs(collection(db, "students", String(student.ni), "anotaciones"));
      const dataMark = currentAnotaciones.docs.map(doc => ({ ...doc.data()}));
      
      await updateDoc(doc(db, "students",String(student.ni)),{
        mark:dataMark.length
      });
     
      setLoader(false);
      setSucces(true);
    } catch (error) {
      const errorCode = error.code;
      setLoader(false);
      setMsg(errorCode);
      setWrong(true);
    }
   
  }
    return (
      <>
        <div className="modal-add-estudent">

          <header className="form-login-header">
            <img width="50" src={escudo} alt="" />
            <h1 className="form-login-header__title">Anotación</h1>
          </header>

          <div className="form-container form-container__anotacion">
            <form onSubmit={handleAnotacion} className="form-login">
              <h2 className="form-login__title">{`${student.last} ${student.name}`}</h2>
              <h3 className="form-login__title form__curso-anotacion">{`(${student.curso})`}</h3>
              <label className="form-login__label form-login__label--anotacion" htmlFor="title">
                Titulo
              </label>
              <input
                className="form-login__input"
                type="text"
                id="title" 
                name="title"
                required
              />
               <label className="form-login__label form-login__label--anotacion" htmlFor="description">
                Descripción
              </label>
              <textarea required resize="none" className="form-login__input" name="description" id="description" cols="30" rows="10"></textarea>
              <section className="btn-add-student-container">
                <button className="btn-add-student btn-add-student__cancelar" onClick={()=>setAnotacion(false)} type="button">Cancelar</button>
                <button className="btn-add-student" type="submit">Aceptar</button>
              </section>
              
            </form>
          </div>
        </div>
        {isWrong && <ModalWrong msg={msg} setWrong={setWrong} />}
        {
          isSucces && <ModalSucces msg="El Registro Fué Agregado Satisfactoriamente"  setSucces={setSucces} setPageEnd={setAnotacion}/>
        }
        {
          isLoader && <ModalLoader/>
        }
      </>
    );
  }