import React, { useContext, useState,useEffect } from "react";
import { AppContext } from "../context/AppContext";
import '../styles/Main.css';
import addPerson from '@icons/person_add.svg';
import { ModalLoader } from "../components/ModalLoader";
import { ModalPageOne } from "../components/ModalPageOne";
import firebaseApp from "../service/firebaseApp";
import {getFirestore, collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { Card } from "../components/Card";
import { ModalWrong } from "../components/ModalWrong";


const db = getFirestore(firebaseApp);

export function Main() {
  const { state,setState } = useContext(AppContext);
  const [cursos, setCursos] = useState([]);
  const [isWrong, setWrong] = useState(false);
  const [isLoader,setLoader] = useState(false);
  const [isDirGroup,setDirGroup] = useState(false);
  const [pageOne,setPageOne] = useState(false);
  const [students, setStudents] = useState([]);
  const [msg, setMsg] = useState('');


  useEffect(()=>{
    if(state.grado !== ''){
      setCursos(state.cursos[state.grado]);
    }
  },[state.grado]);

  useEffect(()=>{
    if(state.grado !== ''){
      setLoader(true);
      if(state.group === state.curso || state.group ==='Coor'){
        setDirGroup(true);
      }else{
        setDirGroup(false);
      }
      const ref = collection(db, "students");
      const q = query(ref, where("curso", "==", state.curso),  orderBy("mark","desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
        setStudents(data);
        setLoader(false);
      });
      return ()=>{
        unsubscribe();
      };
    }
  },[state.curso, state.isLogin]);
  
  

  function handleGrado(e) {
    const grado = e.target.value;
    if(grado !== ""){
      setState({
        ...state,
        grado:grado
      });
    } 
  }

  function handleCurso(e) {
    const curso = e.target.value;
    if(curso !== ""){
      setState({
        ...state,
        curso:curso
      });
    }
  }

  return (
    <>
      <div className="cursos-container">

        <select className="cursos--select" value={state.grado} onChange={handleGrado} id="grado">
          <option value="" >Seleccionar Grado</option>
          <option value="Sexto">Sexto</option>
          <option value="Septimo">Septimo</option>
          <option value="Octavo">Octavo</option>
          <option value="Noveno">Noveno</option>
          <option value="Decimo">Decimo</option>
          <option value="Undecimo">Undecimo</option>
        </select>
      
        <select className="cursos--select" value={state.curso} onChange={handleCurso} id="curso">
          <option value="">Seleccionar Curso</option>
          {cursos.map((curso) => (
            <option key={curso} value={curso}>
              {curso}
            </option>
          ))}
        </select>

      </div>

      <section className="card-container">
            {
              students.map(student => <Card key={student.ni} student={student} />)
            }
      </section>
      {isWrong && <ModalWrong msg={msg} setWrong={setWrong} />}

      {
        isLoader&& <ModalLoader/>
      }
      {
        isDirGroup&&(
          <button onClick={()=> setPageOne(true)} className="btn-add-user">
            <img width="24" height="24" src={addPerson} alt="" />
          </button>
        )
      }
      {
         pageOne&& <ModalPageOne setPageOne={setPageOne} />
      }
    </>
  );
}
