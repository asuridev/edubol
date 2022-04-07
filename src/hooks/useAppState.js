import React,{useState} from 'react'

const initialState = {
    isLogin:false,
    email:'prueba@gmail.com',
    name:'',
    group:'',
    cursos:{},
    curso:'',
    grado:''
};

export function useAppState() {
    const [state,setState]= useState(initialState);

  return {
      state,
      setState
  }
}
