import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NotFound from './components/notFound';
import NavBar from './components/navbar';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProtectedRoute from './components/common/protectedRoute';
import ScheduleAppointment from './components/scheduleAppointment';
import ViewAppointments from './components/viewAppts';
import ViewAppt from './components/viewAppt';
import Requested from './components/request';
import ApptConfirm from './components/apptConfirmed';
import Admins from './components/admins';
import Footer from './components/footer';

toast.configure();
function App() {
  let [admin, setAdmin] = useState(null);

  useEffect(() => {
    setAdmin(JSON.parse(auth.getCurrentAdmin()));
  }, []);

  return (
    <React.Fragment>
      <main className="">
        <NavBar admin={admin} />

        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/schedule-appointment" component={ScheduleAppointment} />
          <Route path="/appt-confirm" component={ApptConfirm} />
          <Route path="/requested" component={Requested} />
          <ProtectedRoute path="/view-appts" component={ViewAppointments} />
          <ProtectedRoute path="/view-appt" component={ViewAppt} />
          <ProtectedRoute path="/view-admins" component={Admins} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/schedule-appointment" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
      <br />
      <Footer />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
