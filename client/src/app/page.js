'use client'

import {useEffect} from "react"
import MunicipalityDashboard from "./pages/Municipality/page";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import LoginForm from "./Auth/loginForm";
import { useSelector,useDispatch } from 'react-redux'
//
const Home = () => {
  const { token, role , isLogin} = useSelector((state) => state.user);
  const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
      }
const PrimaryPages = ()=>{
  switch(role){
    case 'Admin':
      return <AdminDashboard/>
    case 'Municipality': 
      return <MunicipalityDashboard/>
    default:
      return  (
      <div>
        <LoginForm/>
      </div>
      )
  }

}

  return (
    <>
    <PrimaryPages/>
    </>
  )
  
};

export default Home;
