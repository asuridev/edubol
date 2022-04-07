import React,{useContext,useState} from "react";
import "../styles/FormLogin.css";
import {ModalWrong} from '../components/ModalWrong';
import { AppContext } from '../context/AppContext';
import {ModalSucces} from '../components/ModalSucces';
import firebaseApp from "../service/firebaseApp";
import { getAuth, updatePassword  } from "firebase/auth";
import { ModalLoader } from "../components/ModalLoader";

const auth = getAuth(firebaseApp);

export function ChangePassword() {

    const {state,setState} = useContext(AppContext);
    const [isWrong, setWrong] = useState(false);
    const [isSucces, setSucces] = useState(false);
    const [msg, setMsg]= useState('');
    const [isLoader, setLoader]= useState(false);

   async function handlesubmit(e){
        e.preventDefault();
        const newPassword = e.target.newpassword.value;
        e.target.newpassword.value='';
        const confirmPassword = e.target.confirmpassword.value;
        e.target.confirmpassword.value ='';
        
        if(newPassword !== confirmPassword){
          setMsg('Las contraseñas Ingresadas NO coinciden');
          setWrong(true);
        }else{
          const user = auth.currentUser;
          if(user){
            try {
             setLoader(true);
             await updatePassword(user, newPassword);
             setLoader(false);
             setSucces(true);
            } catch (error) {
              setLoader(false);
              setMsg('No Fué Posible Cambiar la contraseña, Debe Iniciar Sesión Nuevamente.');
              setWrong(true);
            }
          }
        }
     }


  return (
    <>
      <div className="form-container form-container--change">
        <form onSubmit={handlesubmit} className="form-login">
          <h1 className="form-login__title">Change Password</h1>
          <label className="form-login__label" htmlFor="newpassword">
            Nueva Contraseña
          </label>
          <input
            className="form-login__input"
            type="password"
            id="newpassword"
            name="newpassword"
            required
          />
          <label className="form-login__label" htmlFor="confirmpassword">
            Confirmar Contraseña
          </label>
          <input
            className="form-login__input"
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            required
          />
          <input className="form-login__submit" type="submit" value="Change" />
        </form>
      </div>
      {
        isLoader && <ModalLoader/>
      }
      {
        isWrong &&<ModalWrong msg={msg} setWrong={setWrong}/> 
      }
      {
        isSucces && <ModalSucces msg="La Contraseña fué Cambiada Satisfactoriamente"setSucces={setSucces}/>
      }
    </>
  );
}
