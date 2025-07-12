import './App.css'
import { useState,useEffect } from 'react'


function App() {

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [serverMsg,setServerMsg] = useState(null)

useEffect(()=>{
  
  const testFetch = async () =>{
    const response = await fetch(`${API_BASE_URL}/test`);
    const json = await response.json();
    if(response.ok){
      setServerMsg(json)
    }
  }

  testFetch();
  
},[])

  return (
    <>
      <div>
        Hello from the Client !!
      </div>
      <div>
        {serverMsg && serverMsg}
      </div>
      <div>
        TEST#1
      </div>
    </>
  )
}

export default App
