import React,{useContext,useState} from "react";
import {useNavigate  } from "react-router-dom";
import "../styles/FormLogin.css";
import escudo from '@logos/escudo.jpg';
import {ModalWrong} from '../components/ModalWrong';
import { AppContext } from '../context/AppContext';
import firebaseApp from "../service/firebaseApp";
import { ModalLoader } from "./ModalLoader";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";




const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export function FormLogin() {
    let navigate = useNavigate();
    const {state,setState} = useContext(AppContext);
    const [isWrong, setWrong] = useState(false);
    const [isLoader, setLoader] = useState(false);
    const [msg, setMsg] = useState('');

   async function handlesubmit(e){
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            setLoader(true);
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            const docRef = doc(db, "users", email);
            const docSnap = await getDoc(docRef);
            const docRefCurso = doc(db,'cursos', 'bachillerato');
            const docCursos = await getDoc(docRefCurso);
            setLoader(false);
            if (docSnap.exists()) {
              navigate('/'); // me aseguro que siempre inicie en el home
              const userData = docSnap.data();
              const cursosData = docCursos.data();
              setState({
                ...state,
                isLogin:true,
                email:userCredential.user.email,
                name:userData.name,
                group:userData.group,
                cursos:cursosData
              });
            } else {
              setLoader(false);
              setMsg('El Usuario No Se Encuentra Autorizado');
              setWrong(true);
            }
            
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoader(false);
            setMsg(errorCode);
            setWrong(true);
        }  
    }


  return (
    <>
    <header className="form-login-header">
        <img width="50"  src={escudo} alt="" />
    </header>

      <div className="form-container">
        <form onSubmit={handlesubmit} className="form-login">
          <h1 className="form-login__title">Log in</h1>
          <label className="form-login__label" htmlFor="email">
            Correo
          </label>
          <input
            className="form-login__input"
            type="email"
            id="email"
            name="email"
            required
          />
          <label className="form-login__label" htmlFor="password">
            Contraseña
          </label>
          <input
            className="form-login__input"
            type="password"
            id="password"
            name="password"
            required
          />
          <input className="form-login__submit" type="submit" value="Log in" />
        </form>
      </div>
      {
      isWrong &&<ModalWrong msg={msg} setWrong={setWrong}/> 
      }
      {
        isLoader&& <ModalLoader/>
      }
    </>
  );
}
