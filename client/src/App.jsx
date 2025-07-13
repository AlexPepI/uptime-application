import './App.css'
import { useAuth } from '@clerk/clerk-react';
import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from "./pages/SignUp";
import { useState,useEffect } from 'react';
import DashboardPage from './pages/Dashboard';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { getToken } = useAuth();

  useEffect(()=>{
    
    const testFetch = async () =>{

      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/test`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      if(response.ok){
        console.log(json)
      }
    }

    testFetch();
  },[])

  return (
    <Router>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/sign-up" element={<SignUpPage/>}/>
          <Route path="/sign-in" element={<SignInPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
