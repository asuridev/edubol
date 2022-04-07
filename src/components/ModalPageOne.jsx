import React, { useState} from "react";
import escudo from '@logos/escudo.jpg';
import {ModalWrong} from '../components/ModalWrong';
import "../styles/FormLogin.css";
import firebaseApp from "../service/firebaseApp";
import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";
import { ModalPageTwo } from "./ModalPageTwo";

const db = getFirestore(firebaseApp);

export function ModalPageOne({ setPageOne }) {
  const [pageTwo, setPageTwo] = useState(false);
  const [ni, setNi] = useState(0);
  const [isLoader, setLoader] = useState(false);
  const [isWrong, setWrong] = useState(false);
  const [msg, setMsg] = useState('');

  async function handlePageOne(e){
    e.preventDefault();
    const ni = Number(e.target.id.value);
    try {
      setLoader(true);
      const q = query(collection(db, "students"), where("ni", "==", ni));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
      setLoader(false);
      if(data.length > 0){
        setMsg("El Estudiante Se Encuentra Registrado.");
        setWrong(true);
      }else{
        setNi(ni);
        setPageTwo(true);
      }
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
            <h1 className="form-login-header__title">Registro</h1>
          </header>

          <div className="form-container">
          {
            isLoader&& (<div className="bar2"></div>)
          }
            <form onSubmit={handlePageOne} className="form-login">
              <h2 className="form-login__title">Validar Documento</h2>
              <label className="form-login__label" htmlFor="id">
                Numero de Documento
              </label>
              <input
                className="form-login__input"
                type="number"
                id="id" 
                name="id"
                required
              />
              <section className="btn-add-student-container">
                <button className="btn-add-student btn-add-student__cancelar" onClick={()=>setPageOne(false)} type="button">Cancelar</button>
                <button className="btn-add-student" type="submit">Siguiente</button>
              </section>
              
            </form>
          </div>
        </div>
        {
            pageTwo &&<ModalPageTwo ni={ni} setPageTwo={setPageTwo} setPageOne={setPageOne} />
        }
        {
          isWrong &&<ModalWrong msg={msg} setWrong={setWrong}/> 
        }
      </>
    );
  }