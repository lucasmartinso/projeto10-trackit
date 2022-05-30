import styled from "styled-components"; 
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; 
import 'react-circular-progressbar/dist/styles.css'; 
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Hoje({userData, userProgress}) {  
    const navigate = useNavigate();  

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
                    <h2>Histórico</h2> 
                </Title>   

                <Mensagem>
                    <h3>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h3> 
                </Mensagem>  

                <Footer>
                    <span onClick={toHabitos}>Hábitos</span>   
                    <BolinhaFooter onClick={toHoje}> 
                        <CircularProgressbar 
                        value={userProgress} 
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
    margin-top: 29px;

    h3{ 
        font-size: 18px; 
        color: rgba(102, 102, 102, 1);
        word-break: break-word;
    }
`  
const Habito = styled.div` 
    margin-top: 28px;
    display: flex; 
    width: 340px; 
    height: 94px; 
    background-color: rgba(255, 255, 255, 1); 
    border-radius: 5px;  
    padding: 13px; 
    position: relative;   

    ion-icon { 
        width: 69px; 
        height: 69px; 
        color: ${props => props.clicked ? "rgba(143, 197, 73, 1)": "rgba(235, 235, 235, 1)"}; 
        border-radius: 5px; 
        position: absolute; 
        right: 10px; 
        bottom: 13px; 

        &:hover { 
            cursor: pointer;
        }
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
