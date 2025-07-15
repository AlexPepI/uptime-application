import './App.css';
import Sites from './pages/Sites';
import { useUser } from '@clerk/clerk-react';
import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from "./pages/SignUp";
import { useAuth } from '@clerk/clerk-react';
import DashboardPage from './pages/Dashboard';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {

  // const {user} = useUser();
  // console.log(user.id)


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
