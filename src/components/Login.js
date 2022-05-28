import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";  
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function Login({setUserData}) {  
    const [password, setPassword] = useState(""); 
    const [email, setEmail] = useState("");  
    const [token, setToken] = useState(""); 

    const navigate = useNavigate();

    function sendInfo (event) { 
        event.preventDefault(); 

        const info = {email, password}; 
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", info);  

        promise.then(response => {  
            setToken(response.data.token); 
            console.log(response.data.image);  
            setUserData(response.data.image);  
            const config = {
                headers: {Authorization: `Bearer ${response.data.token}`}
            }; 
    
              const promiss = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config); 
    
              promiss.then(response => { 
                console.log(response.data);
                navigate("/habitos");
              }); 
    
              promise.catch(err => {
                alert("Erro");
              });
        });

        promise.catch(err => {
            console(err.response);
        });
    } 


    return( 
        <>
        <Conatiner>
            <img src="image/Group 8.svg" />   
        </Conatiner>

        <form onSubmit={sendInfo}>
        <Dados>
            <input type="email" placeholder= "email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
            <input type="password" placeholder="senha" value={password} onChange={(event) => setPassword(event.target.value)} required/>  
            <button>Entrar</button> 
            <Link to="/cadastro"><h3>Não tem uma conta? Cadastre-se!</h3></Link>
        </Dados>  
        </form>
        </>
    )
} 

const Conatiner = styled.div`
    background-color: #FFFFFF; 
    width: 100%; 
    heigth: 100%; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center;  
    padding-top: 68px;

    img{
        width: 180px;
        heigth: 180px;
    } 

    h1{
        color: rgba(18, 107, 165, 1);
        font-family: 'Playball', cursive; 
        font-size: 69px; 

    }
`  
const Dados = styled.div` 
    background-color: #FFFFFF;
    width: 100%;  
    display: flex; 
    justify-content: center;   
    align-items: center;
    flex-direction: column;  
    padding-top: 43px;  
    font-size: 20px;  
    font-weigth: 100;
    color: rgba(219, 219, 219, 1);

    input { 
        width: 303px; 
        height: 45px; 
        border-radius: 5px; 
        font-weigth: 400; 
        font-size: 20px;  
        padding-left: 11px;
        border: 1px solid rgba(212, 212, 212, 1); 
        margin-bottom: 6px;
    } 

    button{   
        width: 303px;
        height: 45px;
        background-color: rgba(82, 182, 255, 1);
        color: white; 
        font-size: 21px; 
        font-weight: 400; 
        border-radius: 5px; 
        border:none; 
        
        &:hover{ 
            cursor: pointer;
        }
    } 

    h3{  
        margin-top: 25px; 
        font-size: 14px; 
        color: rgba(82, 182, 255, 1);  
        text-decoration: underline;
        color: rgba(82, 182, 255, 1); 
        padding-bottom: 90px;

        &:hover { 
            cursor: pointer;
        }
    }
`