import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./privateRoute";

import Spinner from "../app/shared/Spinner";
import { AuthProvider } from "./context/AuthContext";
import Prediction from "./prediction/Prediction";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const updateuser = lazy(() => import("./user-pages/updateuser"));

const addpartner = lazy(() => import("./partner/AddPartner"));

const partnerlist = lazy(() => import("./partner/partnerlist"));

const Mdi = lazy(() => import("./icons/Mdi"));

const listuser = lazy(() => import("./user-pages/listuser"));

const updatepartner = lazy(() => import("./partner/updatpartner"));

const Partnerdashboard = lazy(() => import("./partner/DashboardPartner"));

const Error404 = lazy(() => import("./error-pages/Error404"));
const Error500 = lazy(() => import("./error-pages/Error500"));

const Login = lazy(() => import("./user-pages/Login"));
const Register1 = lazy(() => import("./user-pages/Register"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <AuthProvider>
          <Switch>
            <PrivateRoute component={Dashboard} path="/dashboard" exact> </PrivateRoute>
            <Route path="/login" component={Login} exact />
            <PrivateRoute component={Dashboard} path="/dashboard" />
            <PrivateRoute path="/icons/mdi" component={Mdi} />
            <PrivateRoute path="/user/updateuser/:id/" component={updateuser} />
            <PrivateRoute path="/partnersdashboard" component={Partnerdashboard} />
            <PrivateRoute path="/register" component={Register1} />
            <PrivateRoute path="/listuser" component={listuser} />
            <PrivateRoute path="/prediction" component={Prediction} />
            <PrivateRoute path="/partner/add-partner" component={addpartner} />
            <PrivateRoute path="/partner/partenarList" component={partnerlist} />
            <PrivateRoute path="/partner/updatepartner/:id/" component={updatepartner} />
            <PrivateRoute path="/error-pages/error-404" component={Error404} />
            <PrivateRoute path="/error-pages/error-500" component={Error500} />
            <Redirect to="/dashboard"></Redirect>
          </Switch>
        </AuthProvider>
      </Suspense>
    );
  }
}

export default AppRoutes;
