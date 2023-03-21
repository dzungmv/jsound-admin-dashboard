import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
    children: JSX.Element;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const checkLogin = Boolean(localStorage.getItem('accessToken'));

    return checkLogin ? children : <Navigate to='/login' replace />;
};

export default PrivateRoute;
