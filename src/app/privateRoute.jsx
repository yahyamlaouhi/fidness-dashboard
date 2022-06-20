import React from 'react';

import { useContext } from 'react';
import { Route } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import { useHistory,Redirect } from "react-router-dom"
import Dashboard from './dashboard/Dashboard';

const PrivateRoute = ({children, ...rest}) => {
  console.log(useContext(AuthContext));

  let {user} = useContext(AuthContext)
       let result=user ?<Route {...rest}></Route>: <Redirect to="/login" />
       console.log(user)


    return result ;
    
}

export default PrivateRoute;