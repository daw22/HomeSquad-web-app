import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { userContext } from '../context/userContext';
const PrivateRoutes = () => {
  const ctx = useContext(userContext);
  console.log(ctx.user);
  return (
    ctx.user ? <Outlet /> : <Navigate to='/login' />
  )
  
}

export default PrivateRoutes;