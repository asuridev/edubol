import React, { useState,useContext } from "react";
import { AppContext } from "../context/AppContext";
import escudo from '@logos/escudo.jpg';
import {ModalPageThree} from './ModalPageThree';
import "../styles/FormLogin.css";
import firebaseApp from "../service/firebaseApp";
import {getFirestore, Timestamp } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export function ModalPageTwo({ ni, setPageTwo,setPageOne }) {
  const { state } = useContext(AppContext);
  const [pageThree,setPageThree] = useState(false);
  const [student, setStudent] = useState({});

  async function hadlePageTwo(e){
    e.preventDefault();
    const dataNewStudent = {
      ni : Number(e.target.id.value),
      mark:0,
      name:e.target.name.value,
      address:e.target.address.value,
      last:e.target.last.value,
      email:e.target.email.value,
      birth:Timestamp.fromDate(new Date(e.target.birth.value)),
      telephone:e.target.telephone.value,
      grado:state.grado,
      curso:state.curso,
      url:'',
    };
    setStudent(dataNewStudent);
    setPageThree(true);  
 }
    return (
      <>
        <div className="modal-add-estudent">

          <header className="form-login-header">
            <img width="50" src={escudo} alt="" />
            <h1 className="form-login-header__title">Registro</h1>
          </header>

          <div className="form-container form-container-page-2">
        
            <form onSubmit={hadlePageTwo} className="form-login form-login-page-2">
              <h1 className="form-login__title form-login__title--page-2">Datos Basicos</h1>
              <div className="wrap-campos">
              <label className="form-login__label form-login__label-page-2" htmlFor="id">
                Numero de Documento
              </label>
              <input
                className="form-login__input form-login__input--page-2 form-login__input--id-page-2"
                type="number"
                id="id" 
                name="id"
                value={ni}
                required
                disabled
              />
              </div>
              
              <div className="wrap-campos">
              <label className="form-login__label form-login__label-page-2" htmlFor="name">
                Nombre
              </label>
              <input
                className="form-login__input form-login__input--page-2"
                type="text"
                id="name" 
                name="name"
                required
              />
              </div>
               
               <div className="wrap-campos">
               <label className="form-login__label form-login__label-page-2" htmlFor="last">
                Apellidos
              </label>
              <input
                className="form-login__input form-login__input--page-2"
                type="text"
                id="last" 
                name="last"
                required
              />
               </div>

              <div className="wrap-campos">
              <label className="form-login__label form-login__label-page-2" htmlFor="birth">
                Fecha De Nacimiento
              </label>
              <input
                className="form-login__input form-login__input--page-2"
                type="text"
                id="birth" 
                name="birth"
                required
                placeholder="MM/DD/YYYY"
                pattern="^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$"
                title="El Formato de Fecha debe ser MM/DD/YYYY"
              />
              </div>
              
              <div className="wrap-campos">
                <label className="form-login__label form-login__label-page-2" htmlFor="address">
                    Direccion
                </label>
                <input
                className="form-login__input form-login__input--page-2"
                type="text"
                id="address" 
                name="address"
                required
                />
              </div>

              <div className="wrap-campos">
              <label className="form-login__label form-login__label-page-2" htmlFor="telephone">
                Telefono
              </label>
              <input
                className="form-login__input form-login__input--page-2"
                type="number"
                id="telephone" 
                name="telephone"
                required
              />
              </div>

              <div className="wrap-campos">
              <label className="form-login__label form-login__label-page-2" htmlFor="email">
                Correo Electronico
              </label>
              <input
                className="form-login__input form-login__input--page-2"
                type="email"
                id="email" 
                name="email"
                required
              />
              </div>
             
              <section className="btn-add-student-container btn-add-student-container--page2">
              <button className="btn-add-student btn-add-student__cancelar btn-add-student__cancelar--page2" onClick={()=>setPageOne(false)} type="button">Cancelar</button>
                  <div>
                        <button className="btn-add-student btn-add-student__atras" onClick={()=>setPageTwo(false)} type="button">Atras</button>
                        <button className="btn-add-student" type="submit">Siguiente</button>
                  </div>
              </section>
              
            </form>
          </div>
        </div>
        {
            pageThree&& <ModalPageThree student={student} setPageThree={setPageThree} setPageOne={setPageOne} />
        }
      </>
    );
  }