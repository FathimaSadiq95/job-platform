import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ViewApprovedJob from './pages/ADMIN/ViewApprovedJob';
import Viewfeedbackseeker from './pages/ADMIN/Viewfeedbackseeker';
import Viewapprovedprovider from './pages/ADMIN/Viewapprovedprovider';
import Viewfeedbackprovider from './pages/ADMIN/Viewfeedbackprovider';
import reportWebVitals from './reportWebVitals';
import Viewapplication from './pages/ADMIN/Viewapplication'
import Viewseeker from './pages/ADMIN/Viewseeker'
import Viewprovider from './pages/ADMIN/Viewprovider'
import Viewjob from './pages/ADMIN/Viewjob'
import Viewapprovedseeker from './pages/ADMIN/Viewapprovedseeker'
import Sendfeedback from './pages/PROVIDER/Sendfeedback'
import Sendregisterjob from './pages/PROVIDER/Sendregisterjob'
import Viewapplicationprovider from './pages/PROVIDER/Viewapplicationprovider'
import Sendregisterprovider from './pages/LOGIN/Sendregisterprovider'
import Sendupdateprovider from './pages/PROVIDER/Sendupdateprovider'
import Viewjobprovider from './pages/PROVIDER/Viewjobprovider'
import Viewselectedlist from './pages/PROVIDER/Viewselectedlist'
import Sendfeedbackseeker from './pages/SEEKER/Sendfeedbackseeker'
import Sendregisterseeker from './pages/LOGIN/Sendregisterseeker'
import Updateregisterseeker from './pages/SEEKER/Updateregisterseeker'
import Viewapplicationseeker from './pages/SEEKER/Viewapplicationseeker'
import Viewapplicationselectedseeker from './pages/SEEKER/Viewapplicationselectedseeker'
import Viewjobseeker from './pages/SEEKER/Viewjobseeker'
import AdminHome from './pages/ADMIN/AdminHome'
import SeekerHome from './pages/SEEKER/SeekerHome'
import ProviderHome from './pages/PROVIDER/ProviderHome'
import Login from './pages/LOGIN/Login'
import Viewloginprovider from './pages/LOGIN/Viewloginprovider'
import Viewloginseeker from './pages/LOGIN/Viewloginseeker'
import Viewloginfeedbackseeker from './pages/LOGIN/Viewloginfeedbackseeker'
import Viewloginfeedbackprovider from './pages/LOGIN/Viewloginfeedbackprovider'
import Editjobprovider from './pages/PROVIDER/editjobprovider'
import Viewselectedapplications from './pages/PROVIDER/Viewselectedapplications'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const scrollToHash = () => {
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const frame = window.requestAnimationFrame(scrollToHash);
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  return null;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ScrollToHash />
    <Routes>
      <Route path='ViewApprovedJob' element={<ViewApprovedJob />} />
      <Route path='Viewfeedbackseeker' element={<Viewfeedbackseeker />} />
      <Route path='Viewapprovedprovider' element={<Viewapprovedprovider/>}/>
      <Route path='Viewfeedbackprovider' element={<Viewfeedbackprovider/>}/>
      <Route path='Viewapplication' element={<Viewapplication/>}/>
      <Route path='Viewseeker' element={<Viewseeker/>}/>
      <Route path='Viewprovider' element={<Viewprovider/>}/>
      <Route path='Viewjob' element={<Viewjob/>}/>
      <Route path='Viewapprovedseeker' element={<Viewapprovedseeker/>}/>
      <Route path='Sendfeedback' element={<Sendfeedback/>}/>
      <Route path='Sendregisterjob' element={<Sendregisterjob/>}/>
      <Route path='Viewapplicationprovider' element ={<Viewapplicationprovider/>}/>
      <Route path='Sendregisterprovider' element={<Sendregisterprovider/>}/>
      <Route path='Sendupdateprovider' element={<Sendupdateprovider/>}/>
      <Route path='Viewjobprovider' element={<Viewjobprovider/>}/>
      <Route path='Viewselectedlist' element={<Viewselectedlist/>}/>
      <Route path='Sendfeedbackseeker' element={<Sendfeedbackseeker/>}/>
      <Route path='Sendregisterseeker' element={<Sendregisterseeker/>}/>
      <Route path='Updateregisterseeker' element={<Updateregisterseeker/>}/>
      <Route path='Viewapplicationseeker' element={<Viewapplicationseeker/>}/>
      <Route path='Viewapplicationselectedseeker' element={<Viewapplicationselectedseeker/>}/>
      <Route path='Viewjobseeker'element={<Viewjobseeker/>}/>
      <Route path='AdminHome' element={<AdminHome/>}/>
      <Route path='SeekerHome' element={<SeekerHome/>}/>
      <Route path='ProviderHome' element={<ProviderHome/>}/>
      <Route path='Viewloginseeker' element={<Viewloginseeker/>}/>
      <Route path='Viewloginfeedbackprovider' element={<Viewloginfeedbackprovider/>}/>
      <Route path='Viewloginfeedbackseeker' element={<Viewloginfeedbackseeker/>}/>
      <Route path='Viewloginprovider' element={<Viewloginprovider/>}/>
      <Route path='Editjobprovider/:id' element={<Editjobprovider/>}/>
      <Route path='Viewselectedapplications' element={<Viewselectedapplications/>}/>
      <Route path='' element={<Login/>}/>
     
    </Routes>
  </Router>
);

reportWebVitals();
