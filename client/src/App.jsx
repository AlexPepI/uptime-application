import './App.css';
import Sites from './pages/Sites';
import { useEffect } from 'react';
import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from "./pages/SignUp";
import { useAuth } from '@clerk/clerk-react';
import DashboardPage from './pages/Dashboard';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { getToken } = useAuth();

  return (
    <Router>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/sign-up" element={<SignUpPage/>}/>
          <Route path="/sign-in" element={<SignInPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/sites" element={<Sites/>}/>    
      </Routes>
    </Router>
  )
}

export default App
