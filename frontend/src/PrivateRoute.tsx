import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';

const PrivateRoute = () => {

    const token =useAppSelector((state)=>state.auth.token)
    const user = useAppSelector((state)=>state.auth.user)

    if(!token){
        return <Navigate to={'/login'} />
    }

    


  return (
    <>
    <Outlet/>
    </>
  );
}

export default PrivateRoute;
