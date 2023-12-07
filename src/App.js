import './App.css';
import './AdminPortal.css';
import './CreateTenant.css'

//import bcrypt from 'bcrypt';

//import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";


import Login from './pages/Login'
import MaintenanceRequests from './pages/MaintenanceRequests'
import CreateMaintenanceRequest from './pages/CreateMaintenanceRequest';
import MaintenanceRequestHistory from './pages/MaintenanceRequestHistory';
import MaintenanceRequestsMT from './pages/MaintenanceRequestsMT';
import MaintenanceRequestsTT from './pages/MaintenanceRequestsTT';
import UsersDisplay from './pages/UsersDisplay';
import CreateTenant from './pages/CreateTenant';
import MaintenanceRequestHistoryTT from './pages/MaintenanceRequestHistoryTT';
import AdminPortal from './pages/AdminPortal'
import Login2 from './pages/Login2'
//import bcrypt from 'bcrypt'

//import NavBar from './components/navbar'


const App = () => {

  return (
    <BrowserRouter>
      {/*<NavBar/>*/}
      <div className="App">
        
        
        <Routes>
          
          <Route path = "/" element = {<Login />}/>
          <Route path = "/MaintenanceRequestHistory" element = {<MaintenanceRequestHistory/>}/>
          <Route path="/MaintenanceRequests" element={<MaintenanceRequests />} />
          <Route path = "/CreateMaintenanceRequest" element = {<CreateMaintenanceRequest />}/>
          <Route path = "/MaintenanceRequestsMT" element = {<MaintenanceRequestsMT />}/>
          <Route path = "/MaintenanceRequestsTT" element = {<MaintenanceRequestsTT />}/>
          <Route path = "/UsersDisplay" element = {<UsersDisplay />}/>
          <Route path = "/CreateTenant" element = {<CreateTenant />}/>
          <Route path = '/MaintenanceRequestHistoryTT' element = {<MaintenanceRequestHistoryTT />}></Route>
          <Route path = '/AdminPortal' element = {<AdminPortal />}></Route>
          <Route path = '/Login2' element = {<Login2/>}></Route>
        </Routes>
        
      </div>
    </BrowserRouter>

  );
}


export default App;
