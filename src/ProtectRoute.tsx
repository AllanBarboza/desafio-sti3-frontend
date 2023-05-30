import React from "react";
import { Route, RouteProps, Navigate } from "react-router-dom";

type ProtectRouteProps = RouteProps & { isAuth: boolean }

const ProtectRoute = ({ isAuth, ...routeProps }: ProtectRouteProps) => {
    if (isAuth)
        return <Route {...routeProps} />

    return <Navigate to={'/login'} />
}

export default ProtectRoute;