import './App.css';
import { useEffect } from 'react';
import Console from './pages/Console';
import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from "./pages/SignUp";
import ProfilePage from './pages/Profile';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import DashboardPage from './pages/Dashboard';

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {

  //For Backend Testing // Delete
  const { getToken } = useAuth();
    const token = async ()=>{
      const token = await getToken();
      console.log(token);
    }
    token();
  useEffect(()=>{

  },[])

  return (
    <Router>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/sign-up" element={<SignUpPage/>}/>
          <Route path="/sign-in" element={<SignInPage/>}/>
          <Route path="/dashboard/:id" element={<DashboardPage/>}/>
          <Route path="/console" element={<Console/>}/> 
          {/* <Route path="/profile" element={<ProfilePage/>}/>   */}
          <Route path="*" element={<Navigate to="/" replace/>}/> 
      </Routes>
    </Router>
  )
}

export default App
