// LoginForm.js
import React ,{useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'

import { setUserDetails } from '../redux/reducerSlice/userSlice';

const LoginForm = () => {
  const [resendMessage, setResendMessage] = useState('');

  const dispatch = useDispatch();

  const initialValues = {
    phone: '',
    password: '',
  };

  const validationSchema = Yup.object({
    phone: Yup.string().required('Phone is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:4000/api/login', values);
  
      if (response.data.msg === 'login success') {
        dispatch(setUserDetails(response.data));
      } else if (response.data.message === 'User is not active') {
        alert('User is not active. Please activate your account before logging in.');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error(error); // Handle login error
    }
  };
  const handleResendActivationLink = async (email) => {
    try {
      const response = await axios.post('http://localhost:4000/api/resend-activation-link', { email });
      setResendMessage(response.data.message);
    } catch (error) {
      console.error(error); // Handle error
    }
  };
  // const handleSubmit = async (values) => {
  //   try {
  //     const response = await axios.post('http://localhost:4000/api/login', values);
  //     console.log(response.data); // Handle login success
  //     const data = await response.json();
  
  //     if (data.msg) {
  //     dispatch(setUserDetails(data))
        
  //               } else {
  //                   alert('Login failed');
  //               }
  //   } catch (error) {
  //     console.error(error); // Handle login error
  //   }
  // };
//  const handleSubmit= async (values) => {
//     try {
//         const response = await fetch('http://localhost:8000/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': `Bearer ${token}` // Include the token in the request headers
//             },
//             body: JSON.stringify(values),
//         });

//         const data = await response.json();

//         if (data.success) {

//             dispatch(setUserDetails(data))

//         } else {
//             alert('Login failed');
//         }
//     } catch (error) {
//         console.error('Error logging in:', error);
//     }
//   };
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        {/* Form fields */}
        <div className=' flex py-3 px-1 border-spacing-1 border-2 my-2'>
    
          <Field className=' flex py-1 px-1' type="text" id="phone" name="phone" placeholder="Phone" />
        </div>
        <div className=' flex py-3 px-1 border-spacing-1 border-2 my-2'>
      
          <Field className=' flex py-1 px-1' type="password" id="password" name="password" placeholder="Password" />
        </div>
        <div>
          <button
            type="button"
            onClick={() => handleResendActivationLink(initialValues.phone)}
          >
            Resend Activation Link
          </button>
          {resendMessage && <p>{resendMessage}</p>}
        </div>
        <button type="submit">Login</button>
       
      </Form>
    </Formik>
  );
};

export default LoginForm;
