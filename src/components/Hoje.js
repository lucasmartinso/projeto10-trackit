import styled from "styled-components"; 
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; 
import 'react-circular-progressbar/dist/styles.css'; 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import * as dayjs from 'dayjs'; 
import 'dayjs/locale/pt-br';
import axios from "axios"; 
import Habito from "./Habito";

export default function Hoje({userData,setUserProgress}) {  
    const navigate = useNavigate();  
    const [listaHabitos, setListaHabitos] = useState([]);
    const [progresso, setProgresso] = useState([]);
    
    let porcentagem = (progresso.length / listaHabitos.length) * 100; 
    setUserProgress(porcentagem);

    const dayjs = require('dayjs'); 
    let now = dayjs().locale('pt-br');
    let hoje = now.format("dddd, DD/MM"); 
    console.log(hoje);
    
    useEffect(() => {
        const config = {
            headers: {Authorization: `Bearer ${userData.token}`}
        };  
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",config);  

        promise.then(response => { 
            setListaHabitos([...response.data]); 
        });   

        promise.catch(err => { 
            alert("Azedou");
        }); 

    }, []); 

    function toHabitos() {  
        navigate("/habitos");
    } 

    function toHoje() { 
        navigate("/hoje");
    } 

    function toHistorico() { 
        navigate("/historico");
    }  

    return ( 
        <Container>
                <Header>
                    <h2>TrackIt</h2> 
                    <img src={userData.image}/>
                </Header> 

                <Title>
                    <h2>{hoje}</h2> 
                </Title>   

                {progresso.length===0 ? (
                <Mensagem>
                    <h3>Nenhum hábito concluido ainda</h3> 
                </Mensagem>  
                ) : (
                <MensagemDone>
                    <h3>{porcentagem.toFixed(2)}% dos hábitos concluídos</h3> 
                </MensagemDone> 
                )} 

                <Container2> 
                {listaHabitos.map((habitos,index) => ( 
                    <Habito
                        index = {index}
                        id= {habitos.id} 
                        name = {habitos.name}
                        done = {habitos.done} 
                        highestSequence= {habitos.highestSequence} 
                        currentSequence = {habitos.currentSequence}
                        serUserProgress ={setUserProgress} 
                        setProgresso = {setProgresso}
                        progresso = {progresso}  
                        userData = {userData} 
                        porcentagem = {porcentagem}
                    />
                ))}
                </Container2>

                <Footer>
                    <span onClick={toHabitos}>Hábitos</span>   
                    <BolinhaFooter onClick={toHoje}> 
                        <CircularProgressbar 
                        value={`${porcentagem}`} 
                        text= "Hoje"  
                        styles={buildStyles({
                        trailColor: "rgba(82, 182, 255, 1)",  
                        textColor : "rgba(255, 255, 255, 1)", 
                        backgroundColor: 'rgba(82, 182, 255, 1); ', 
                        pathColor: 'rgba(255, 255, 255, 1)',
                        rotation: 0
                        })}
                        /> 
                    </BolinhaFooter>
                    <span onClick={toHistorico}>Histórico</span>
                </Footer>
        </Container> 
    )
} 

const Container = styled.div` 
    width: 100%; 
    height: 100%; 
    display: flex; 
    flex-direction: column; 
    align-items: center;   
    background-color: #F2F2F2; 
`  
const Container2 = styled.div`
    display: flex; 
    flex-direction: column; 
`
const Header = styled.div`
    width: 100%; 
    height: 70px; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding-left: 18px; 
    padding-right: 18px; 
    background-color: rgba(18, 107, 165, 1); 
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
    
    h2 { 
        font-size: 39px; 
        font-weight: 400; 
        color: rgba(255, 255, 255, 1); 
        font-family: 'Playball', cursive; 
    } 

    img{
        width: 51px; 
        height: 51px; 
        border-radius: 50%;  
        object-fit: cover;
    }
` 
const Title = styled.div`
    margin-top: 68px; 
    width: 100%; 
    height: 100%; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding-left: 18px; 
    padding-right: 18px;  

    h2{ 
        color: rgba(18, 107, 165, 1); 
        font-size: 23px;
    } 

    button{ 
        width: 40px;
        height: 35px; 
        background: rgba(82, 182, 255, 1);
        font-size: 27px; 
        color: rgba(255, 255, 255, 1); 
        border: none; 
        border-radius: 5px; 

        &:hover{ 
            cursor: pointer; 
        }
    }
`  
const Mensagem = styled.div`
    width: 100%; 
    height: 100%;   
    padding-left: 18px; 
    padding-right: 18px;  
    margin-top: 4px;

    h3{ 
        font-size: 18px; 
        color: rgba(186, 186, 186, 1);
        word-break: break-word;
    }
`  
const MensagemDone = styled.div`
    width: 100%; 
    height: 100%;   
    padding-left: 18px; 
    padding-right: 18px;  
    margin-top: 4px;

    h3{ 
        font-size: 18px; 
        color: rgba(143, 197, 73, 1);
        word-break: break-word;
    }
` 
const Texto = styled.div`
    h2 { 
        font-size: 20px;  
        color: rgba(102, 102, 102, 1);
        margin-bottom: 10px; 
    } 

    p { 
        font-size: 13px;  
        color: rgba(102, 102, 102, 1); 
        margin-top: 3px;
    }
`
const Footer = styled.div`
    width: 100%; 
    height: 70px; 
    display: flex; 
    align-items: center; 
    justify-content: space-between;   
    padding-left: 18px; 
    padding-right: 18px; 
    background-color: rgba(255, 255, 255, 1);
    position: fixed; 
    left: 0; 
    bottom: 0;  

    span{
        color: rgba(82, 182, 255, 1);
        font-size: 18px; 

        &:hover { 
            cursor: pointer;
        }
    }
`
const BolinhaFooter = styled.div`
    width: 91px; 
    height: 91px;  
    padding: 6px;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(82, 182, 255, 1); 
    border-radius: 50%; 
    display: flex;  
    position: relative;  
    margin-bottom: 40px;
` 
