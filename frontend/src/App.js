import AppRoutes from './AppRoutes';
import './App.css'
import React, {useEffect} from 'react';
function App() {
  const getData =async () =>{
    await fetch("http://localhost:5000/sql/all")
    .then((data)=>data.json())
    .then((json)=>console.log(json))
    .catch((err)=>{console.log(err)})
  }
  useEffect(()=>{
    getData();
  },[])

  return (
    <AppRoutes/>
  );
}

export default App;