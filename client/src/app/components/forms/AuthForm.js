// AuthForm.js
import React, { useState } from 'react';
import LoginForm from '../../Auth/loginForm';
import SignupForm from './SignupForm';
import Layout from '@/app/layout';

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch()
  const handleLogout = () => {
      dispatch(logout())
    }
  const { token, id,role } = useSelector(state => state.user)
  
  const switchForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <Layout>
    <div className="flex justify-center items-center h-screen bg-black">
    <div className='flex flex-wrap bg-white  px-10 rounded-3xl'>
      <h1 className=' to-green-950 text-lg px-10 py-2 translate-x-1 text-green-950 font-bold absolute rounded-sm text-white text-center'>
        Library Management System
      </h1>
      <div className='flex py-10 px-3'>
        {isLoginForm ? <LoginForm switchForm={switchForm} /> : <SignupForm switchForm={switchForm} />}
      </div>
    </div>
  </div>
   </Layout>

  );
};

export default AuthForm;
