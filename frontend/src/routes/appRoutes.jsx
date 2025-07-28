import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../pages/login';
import Signup from '../pages/signup';
import Settings from '../pages/settings';
import Wellness from '../pages/wellness';
import JounrnalHistory from '../pages/journal/history';
import JournalIndex from '../pages/journal';
import Dashboard from '../pages/dashboard';
import Companion from '../pages/companion';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/settings' element={<Settings/>} />
            <Route path='/wellness' element={<Wellness/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/companion' element={<Companion/>} />
            <Route path='/journal/history' element={<JounrnalHistory/>} />
            <Route path='/journal/index' element={<JournalIndex/>} />
        </Routes>
    </Router>
  )
}

export default AppRoutes