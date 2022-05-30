import axios from "axios";
import { useState } from "react";
import styled from "styled-components";  


export default function RenderizaHabitos({name,id, dia, setDia, userData, setListaHabitos}) {  
    const [domingo, setDomingo] = useState(false);
    const [segunda, setSegunda] = useState(false);
    const [terca, setTerca] = useState(false); 
    const [quarta, setQuarta] = useState(false); 
    const [quinta, setQuinta] = useState(false); 
    const [sexta, setSexta] = useState(false); 
    const [sabado, setSabado] = useState(false); 

    function deletar({id}) {   
        const config = {
            headers: {Authorization: `Bearer ${userData.token}`}
        };  

        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,config); 

        promise.then(response => {
            const promiss = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config);  
        
            promiss.then(response => { 
                setListaHabitos([...response.data]); 
            });   
        
            promiss.catch(err => { 
                alert("Não deu craque");
            });
        }); 

        promise.catch(err => {
            alert("Vish");
        });
    } 

    function tapCard(cardIndex) {    

        for(let i=0; i<dia.length; i++) { 
            if(dia[i] === cardIndex) {
                dia.splice(i,1); 
            }
        }  
        setDia([...dia,cardIndex]);  

        if(cardIndex === 0) { 
            setDomingo(!domingo); 
        } 
        if(cardIndex === 1) { 
            setSegunda(!segunda); 
        } 
        if(cardIndex === 2) { 
            setTerca(!terca); 
        } 
        if(cardIndex === 3) { 
            setQuarta(!quarta); 
        } 
        if(cardIndex === 4) { 
            setQuinta(!quinta); 
        } 
        if(cardIndex === 5) { 
            setSexta(!sexta); 
        } 
        if(cardIndex === 6) { 
            setSabado(!sabado); 
        }

    } 

    return(
        <Habit id={id}> 
            <Texto>
                <h2>{name}</h2> 
                <Domingo onClick={() => tapCard(0)} domingo={domingo}>D</Domingo> 
                <Segunda onClick={() => tapCard(1)} segunda={segunda}>S</Segunda> 
                <Terca onClick={() => tapCard(2)} terca={terca}>T</Terca> 
                <Quarta onClick={() => tapCard(3)} quarta={quarta}>Q</Quarta> 
                <Quinta onClick={() => tapCard(4)} quinta={quinta}>Q</Quinta> 
                <Sexta onClick={() => tapCard(5)} sexta={sexta}>S</Sexta>
                <Sabado onClick={() => tapCard(6)} sabado={sabado}>S</Sabado>
            </Texto>
                <ion-icon name="trash-outline" onClick={() => deletar({id})} id={id}></ion-icon>
            </Habit> 
    )
}  





const Dias = styled.div`  
    width: 100%;  
    display: flex;  
    padding-left: 19px;  
    justify-content: flex-start; 
`  
const Domingo = styled.button`
    border-radius: 5px; 
    margin-right: 4px;
    width: 30px; 
    height: 30px;  
    font-size: 19px;
    color: ${props => props.domingo ? "rgba(255, 255, 255, 1)" :  "rgba(207, 207, 207, 1)"}; 
    border: 1px solid rgba(212, 212, 212, 1); 
    background-color: ${props => props.domingo ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};  

    &:hover{ 
        cursor: pointer; 
`  
const Segunda = styled.button`
    border-radius: 5px; 
    margin-right: 4px;
    width: 30px; 
    height: 30px;  
    font-size: 19px;
    color: ${props => props.segunda ? "rgba(255, 255, 255, 1)" :  "rgba(207, 207, 207, 1)"}; 
    border: 1px solid rgba(212, 212, 212, 1); 
    background-color: ${props => props.segunda ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};  

    &:hover{ 
        cursor: pointer; 
`  
const Terca = styled.button`
    border-radius: 5px; 
    margin-right: 4px;
    width: 30px; 
    height: 30px;  
    font-size: 19px;
    color: ${props => props.terca ? "rgba(255, 255, 255, 1)" :  "rgba(207, 207, 207, 1)"}; 
    border: 1px solid rgba(212, 212, 212, 1); 
    background-color: ${props => props.terca ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};  

    &:hover{ 
        cursor: pointer; 
` 
const Quarta = styled.button`
border-radius: 5px; 
margin-right: 4px;
width: 30px; 
height: 30px;  
font-size: 19px;
color: ${props => props.quarta ? "rgba(255, 255, 255, 1)" :  "rgba(207, 207, 207, 1)"}; 
border: 1px solid rgba(212, 212, 212, 1); 
background-color: ${props => props.quarta ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};  

&:hover{ 
    cursor: pointer; 
` 
const Quinta = styled.button`
    border-radius: 5px; 
    margin-right: 4px;
    width: 30px; 
    height: 30px;  
    font-size: 19px;
    color: ${props => props.quinta ? "rgba(255, 255, 255, 1)" :  "rgba(207, 207, 207, 1)"}; 
    border: 1px solid rgba(212, 212, 212, 1); 
    background-color: ${props => props.quinta ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};  

    &:hover{ 
        cursor: pointer; 
`  
const Sexta = styled.button`
    border-radius: 5px; 
    margin-right: 4px;
    width: 30px; 
    height: 30px;  
    font-size: 19px;
    color: ${props => props.sexta ? "rgba(255, 255, 255, 1)" :  "rgba(207, 207, 207, 1)"}; 
    border: 1px solid rgba(212, 212, 212, 1); 
    background-color: ${props => props.sexta ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};  

    &:hover{ 
        cursor: pointer; 
`  
const Sabado = styled.button`
    border-radius: 5px; 
    margin-right: 4px;
    width: 30px; 
    height: 30px;  
    font-size: 19px;
    color: ${props => props.sabado ? "rgba(255, 255, 255, 1)" :  "rgba(207, 207, 207, 1)"}; 
    border: 1px solid rgba(212, 212, 212, 1); 
    background-color: ${props => props.sabado ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};  

    &:hover{ 
        cursor: pointer; 
`  
const Habit = styled.div` 
    margin-top: 28px;
    display: flex; 
    width: 340px; 
    height: 91px; 
    background-color: rgba(255, 255, 255, 1); 
    border-radius: 5px;  
    padding: 13px; 
    position: relative;   

    ion-icon { 
        width: 14px; 
        height: 14px; 
        border-radius: 5px; 
        position: absolute; 
        right: 10px; 
        top: 13px; 

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