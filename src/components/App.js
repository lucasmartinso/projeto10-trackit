import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cadastro from "./Cadastro";
import Habitos from "./Habitos";
import Hoje from "./Hoje";
import Login from "./Login"; 
import Historico from "./Historico"; 
import UserContext from "./UserContext";

export default function App() { 
    const [userData, setUserData] = useState({});  
    const [userProgress, setUserProgress] = useState(); 
    console.log(userData);
    return(
       <BrowserRouter>
            <Routes> 
                <Route path="/" element={<Login setUserData={setUserData}/>} /> 
                <Route path="/cadastro" element={<Cadastro />} /> 
                <Route path="/habitos" element={<Habitos userData ={userData} userProgress={userProgress}/>} />  
                <Route path="/hoje" element={<Hoje userData ={userData} setUserProgress={setUserProgress}/>} />  
                <Route path="/historico" element={<Historico userData ={userData} userProgress={userProgress}/>} />
            </Routes>
       </BrowserRouter>
    )
}