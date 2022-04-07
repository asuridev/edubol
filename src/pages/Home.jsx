import {Routes,Route, Outlet} from 'react-router-dom'
import React,{useContext} from 'react';
import { FormLogin } from '../components/FormLogin';
import { AppContext } from '../context/AppContext';
import { Layout } from '../container/Layout';
import { Main} from './Main';
import { ChangePassword } from './ChangePassword';
import {Details} from './Details';

export function Home() {
 const {state} = useContext(AppContext);

  if(!state.isLogin){
    return(
     <FormLogin/>
      // <Details/>
    );
  }else{
    return(
      <Routes>
        <Route path='/' element={<Layout Outlet={Outlet}/>}>
         <Route index element={<Main/>}/>
         <Route path='changepassword' element={<ChangePassword/>}/>
         <Route path=":studentId" element={<Details />} />
        </Route>
      </Routes>   
    );
  }
  
}
