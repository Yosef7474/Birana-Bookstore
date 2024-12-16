import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const tokenn = localStorage.getItem('token');
      if(!tokenn) {
        return <Navigate to="/api/users/login"/>
      }
      return children ? children : <Outlet/>
    
}


export default PrivateRoute