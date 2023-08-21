import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducerSlice/userSlice';
import RootLayout from '../../layout'; 
import Link from 'next/link';
import SignupForm from '../Admin/SignupForm'
const AdminDashboard = () => {
  const { id, role, name, municipality } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
<RootLayout>
<div>
      <h1>Admin Dashboard</h1>
      <p>User Details:</p>
      <p>ID: {id}</p>
      <p>Role: {role}</p>
      <p>Name: {name}</p>
      <p>Municipality: {municipality}</p>
      <button onClick={handleLogout}>Logout</button>
      <Link href="/Admin/SignupForm">Isfdsl</Link>
    </div>
    </RootLayout>
  );
};

export default AdminDashboard;
