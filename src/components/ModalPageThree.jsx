import React, { useState } from "react";
import escudo from "@logos/escudo.jpg";
import { ModalWrong } from "./ModalWrong";
import "../styles/FormLogin.css";
import firebaseApp from "../service/firebaseApp";
import { ModalSucces } from "./ModalSucces";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  addDoc
} from "firebase/firestore";


const db = getFirestore(firebaseApp);

export function ModalPageThree({student, setPageThree,setPageOne }) {
  const [isLoader, setLoader] = useState(false);
  const [isWrong, setWrong] = useState(false);
  const [isSucces, setSucces] = useState(false);
  const [msg, setMsg] = useState("");

  async function hadlePageThree(e) {
    e.preventDefault();
    const dataNewAcudiente = {
      fullName: `${e.target.name.value} ${e.target.last.value}`,
      address: e.target.address.value,
      email: e.target.email.value,
      telephone: e.target.telephone.value,
      parentezco: e.target.parentezco.value,
      profesion: e.target.profesion.value,
    };
    setLoader(true);
    try {
      await setDoc(doc(db, "students",String(student.ni)),{...student});
      await setDoc(
        doc(db, "students", String(student.ni), "acudiente",String(`ac-${student.ni}`)),
        { ...dataNewAcudiente }
      );
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
          <h1 className="form-login-header__title">Registro</h1>
        </header>

        <div className="form-container form-container-page-2">
          {isLoader && <div className="bar2"></div>}
          <form onSubmit={hadlePageThree} className="form-login form-login-page-2">
            <h1 className="form-login__title form-login__title--page-2">Datos Acudiente</h1>
            <div className="wrap-campos">
            <label
              className="form-login__label form-login__label-page-2"
              htmlFor="name"
            >
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
            <label
              className="form-login__label form-login__label-page-2"
              htmlFor="last"
            >
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
            <label
              className="form-login__label form-login__label-page-2"
              htmlFor="parentezco"
            >
              Parentezco
            </label>
            <input
              className="form-login__input form-login__input--page-2"
              type="text"
              id="parentezco"
              name="parentezco"
              required
            />
            </div>
            
            <div className="wrap-campos">
            <label
              className="form-login__label form-login__label-page-2"
              htmlFor="profesion"
            >
              Profesion
            </label>
            <input
              className="form-login__input form-login__input--page-2"
              type="text"
              id="profesion"
              name="profesion"
              required
            />
            </div>
            
            <div className="wrap-campos">
            <label
              className="form-login__label form-login__label-page-2"
              htmlFor="address"
            >
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
            <label
              className="form-login__label form-login__label-page-2"
              htmlFor="telephone"
            >
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
            <label
              className="form-login__label form-login__label-page-2"
              htmlFor="email"
            >
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
                        <button className="btn-add-student btn-add-student__atras" onClick={()=>setPageThree(false)} type="button">Atras</button>
                        <button className="btn-add-student" type="submit">Confirmar</button>
                  </div>
            </section>
          </form>
        </div>
      </div>
      {isWrong && <ModalWrong msg={msg} setWrong={setWrong} />}
      {
          isSucces && <ModalSucces msg="El Registro Fué Creado Satisfactoriamente"  setSucces={setSucces} setPageEnd={setPageOne}/>
      }
    </>
  );
}
