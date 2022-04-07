import React,{useEffect,useState, useRef,useContext} from "react";
import {useParams} from "react-router-dom";
import { AppContext } from "../context/AppContext";
import dummy from "@logos/dummy.png";
import phone from "@icons/phone.svg";
import email from "@icons/email.svg";
import addwhite from "@icons/addwhite.svg";
import addphoto from "@icons/addphoto.svg";
import "../styles/FormLogin.css";
import { Accordion } from "../components/Accordion";
import { ModalLoader } from "../components/ModalLoader";
import { ModalAnotacion } from "../components/ModalAnotacion";
import { ToggleUpDate } from "../components/ToggleUpDate";
import firebaseApp from "../service/firebaseApp";
import { getFirestore, doc,updateDoc, getDoc, collection, getDocs,query,orderBy,onSnapshot} from "firebase/firestore";
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { ModalWrong } from "../components/ModalWrong";


const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export function Details() {
  const { state} = useContext(AppContext);
  let { studentId} = useParams();
  const [loader,setLoader] = useState(false);
  const [student,setStudent] = useState({});
  const [acudiente,setAcudiente] = useState({});
  const [anotaciones,setAnotaciones] = useState([]);
  const [edad, setEdad] = useState(0);
  const [anotacion, setAnotacion] = useState(false);
  const refInputFile = useRef(null)
  
  const [isWrong, setWrong] = useState(false);
  const [isSucces, setSucces] = useState(false);
  const [msg, setMsg]= useState('');
  

  function calcularEdad({seconds}){
    const hoy = new Date().getTime()/1000;
    const edadCalculada = Math.floor((((hoy - seconds)/3600)/24)/365.25);
    setEdad(edadCalculada);
  }

//efecto de datos del estudiante
  useEffect(()=>{
    setLoader(true);
    const docRefStudent = doc(db, "students", studentId);
    const unsubscribe = onSnapshot(docRefStudent, (querySnapshot) => {
      const studentData = querySnapshot.data();
      calcularEdad(studentData.birth);
      setStudent(studentData);
    });
    return ()=>{
      unsubscribe();
    }
  },[studentId]);
  
//efectos datos del acudiente
  useEffect(()=>{
    const collRefAcudiente = collection(db,"students",studentId,"acudiente");
    const unsubscribe = onSnapshot(collRefAcudiente, (querySnapshot) => {
      const acudienteData = querySnapshot.docs.map(doc => ({...doc.data()}));
      setAcudiente(acudienteData[0]);
    });
    return ()=>{
      unsubscribe();
    }
  },[studentId]);

//efecto datos de las anotaciones
  useEffect(()=>{
    const collRefAnotaciones = collection(db,"students",studentId,"anotaciones");
    const q = query(collRefAnotaciones, orderBy("date","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const anotacionesData = querySnapshot.docs.map(doc => ({...doc.data()}));
      setAnotaciones(anotacionesData);
      setLoader(false);
    });
    return ()=>{
      unsubscribe();
    }
  },[studentId]);

 
  async function handleUpLoadFile(e){
    const file = e.target.files[0];
    const photoRef = ref(storage, String(`photos/${student.ni}.jpg`));
    try {
      const response = await uploadBytes(photoRef, file);
      const url = await getDownloadURL(photoRef);
      await updateDoc(doc(db, "students",String(student.ni)),{url:url});
    } catch (error) {
      setMsg('Error al cargar La imagen.');
      setWrong(true);
    }
    
  }

  return (
    <>
      <div className="">
        <div className="details-container">
          <div className="estudent-info">
            <section className="section-photo">
              {
                student.url==="" ?(<img className="photo-student" width="140" height="140" src={dummy} alt="" />):(<img className="photo-student" width="140" height="140" src={student.url} alt="" />)
              }
              
              <h2 className="section-photo__name">
                {
                  `${student.name} ${student.last}`
                }
              </h2>
              <p>{student.curso}</p>
              {
                (state.group === state.curso || state.group ==='Coor')&&(
                  <button onClick={(e)=> refInputFile.current.click()} className="estudent-info__icon estudent-info__icon--photo">
                    <img src={addphoto} alt="" />
                  </button>
                )
              }
              <input ref={refInputFile} accept=".jpg,.png,.jpeg" type="file" style={{display:'none'}}  onChange={handleUpLoadFile} />
            </section>
            <h2 className="section__name">Datos Estudiante</h2>

            <div className="campo-container">
              <p className="estudent-info__property">Edad:</p>
              <p className="estudent-info__value estudent-info__value__edad">
                {edad}
              </p>
            </div>

            <div className="campo-container">
              <p className="estudent-info__property">Dirección:</p>
              {
                student.address && <ToggleUpDate student={student} collection="students" field="address" valor={student.address} tipo="text"/>
              } 
            </div>

            <div className="campo-container">
              <p className="estudent-info__property">Telefono:</p>
              {
                student.telephone && <ToggleUpDate student={student} collection="students" field="telephone"  valor={student.telephone} tipo="number"/>
              } 
              <a className="estudent-info__icon" href={`tel:${student.telephone}`}>
                <img width="24" height="24" src={phone} alt="" />
              </a>
            </div>
            <div className="campo-container">
              <p className="estudent-info__property">Email:</p>
                {
                  student.email && <ToggleUpDate student={student} collection="students" field="email" valor={student.email} tipo="email"/>
                } 
              <a className="estudent-info__icon" href={`mailto:${student.email}`}>
                <img width="24" height="24" src={email} alt="" />
              </a>
            </div>

            <h2 className="section__name">Datos Acudiente</h2>
            <div className="campo-container">
              <p className="estudent-info__property">Nombre:</p>
                {
                  acudiente.fullName && <ToggleUpDate student={student} collection="acudiente" field="fullName" valor={acudiente.fullName} tipo="text"/>
                } 
            </div>
            <div className="campo-container">
              <p className="estudent-info__property">Parentezco</p>
                {
                  acudiente.parentezco && <ToggleUpDate student={student} collection="acudiente" field="parentezco" valor={acudiente.parentezco} tipo="text"/>
                } 
            </div>
            <div className="campo-container">
              <p className="estudent-info__property">Profesion</p>
                {
                  acudiente.profesion && <ToggleUpDate student={student} collection="acudiente" field="profesion" valor={acudiente.profesion} tipo="text"/>
                } 
            </div>
            <div className="campo-container">
              <p className="estudent-info__property">Dirección:</p>
                {
                  acudiente.address && <ToggleUpDate student={student} collection="acudiente" field="address" valor={acudiente.address} tipo="text"/>
                } 
            </div>
            <div className="campo-container">
              <p className="estudent-info__property">Telefono:</p>
                {
                  acudiente.telephone && <ToggleUpDate student={student} collection="acudiente" field="telephone" valor={acudiente.telephone} tipo="number"/>
                } 
              <a className="estudent-info__icon" href={`tel:${acudiente.telephone}`}>
                <img width="24" height="24" src={phone} alt="" />
              </a>
            </div>
            <div className="campo-container">
              <p className="estudent-info__property">Email:</p>
                {
                  acudiente.email && <ToggleUpDate student={student} collection="acudiente" field="email" valor={acudiente.email} tipo="email"/>
                } 
              <a className="estudent-info__icon" href={`mailto:${acudiente.email}`}>
                <img width="24" height="24" src={email} alt="" />
              </a>
            </div>

          </div>

          <div className="anotaciones-info">
           <div className="anotaciones-info__head">
             <h1>
                {
                  `${student.name} ${student.last}`
                }
             </h1>
             <p>{student.curso}</p>
           </div>
           <div className="container__mark">
              <h2 className="section__name section__name--mark">Historial De Anotaciones</h2>
              <p className="estudent-info__value estudent-info__value__edad estudent-info__value__mark">
                {
                  anotaciones.length
                }
              </p>
           </div>
           {
             anotaciones.map(anotacion => <Accordion key={anotacion.date.seconds} anotacion={anotacion}/>)
           }
          </div>
        </div>
      </div>
      <button onClick={()=> setAnotacion(true)} className="btn-add-anotacion">
            <img width="24" height="24" src={addwhite} alt="" />
      </button>
      {
        loader && <ModalLoader/>
      }
      {
        anotacion && <ModalAnotacion student={student} setAnotacion={setAnotacion}/>
      }
      {
        isWrong &&<ModalWrong msg={msg} setWrong={setWrong}/> 
      }
    </>
  );
}
