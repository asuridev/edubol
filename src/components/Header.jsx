import React, { useContext,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import escudo from "@logos/escudo.jpg";
import home from "@icons/home.svg";
import logout from "@icons/logout.svg";
import password from "@icons/password.svg";
import "../styles/Header.css";
import { AppContext } from "../context/AppContext";
import firebaseApp from "../service/firebaseApp";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebaseApp);

export function Header() {
  const { state, setState } = useContext(AppContext);
  const [inicio, setInicio] = useState(false);
  const [cambioPass, setCambioPass] = useState(false);

  let navigate = useNavigate();

  function ActiveInicio(){
    setInicio(true);
    setCambioPass(false);
  }
  function ActivePassword(){
    setInicio(false);
    setCambioPass(true);
  }

  
  async function handleSalir(e) {
    e.preventDefault();
    try {
      await signOut(auth);
      navigate("/");
      setState({
        ...state,
        isLogin: false,
        email: "",
        grado:"",
        curso:""
      });
    } catch (error) {
      //mostrar mensaje de error
    }
  }

  return (
    <>
      <nav className="nav-mobile">
        <Link onClick={()=>ActiveInicio()} className={`nav-mobile__btn ${inicio && "isActive"}`} to="/" >
            <img width="24" height="24" src={home} alt="home" />
            <p className="nav-mobile__btn__text">Inicio</p>
        </Link>
        <Link onClick={()=>ActivePassword()} className={`nav-mobile__btn ${cambioPass && "isActive"}`} to="changepassword">
            <img width="24" height="24" src={password} alt="password" />
            <p className="nav-mobile__btn__text">Cambiar</p>
        </Link>
        <a className="nav-mobile__btn" onClick={handleSalir} href="#">
            <img width="24" height="24" src={logout} alt="logout" />
            <p className="nav-mobile__btn__text">Salir</p>
        </a>
      </nav>

      <header className="main-header">
        <img width="50" height="50" src={escudo} alt="escudo" />
        <nav className="main-nav">
          <Link className="main-nav__link" to="/">
            Inicio
          </Link>
          <section>
            <label className="main-nav__link main-nav__link--email" href="#">
              {state.name}
            </label>
            <Link className="main-nav__link" to="changepassword">
              CambiarClave
            </Link>
            <a className="main-nav__link" onClick={handleSalir} href="#">
              Salir
            </a>
          </section>
        </nav>
      </header>
    </>
  );
}
