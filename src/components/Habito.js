import axios from "axios";
import { useState } from "react"; 
import styled from "styled-components"; 

export default function Habito({index, id, name, done, highestSequence, currentSequence, setProgresso ,progresso,userData}) {  
    const [clicked, setClicked] = useState(false); 

    function tapCard(cardIndex,id,currentSequence) {    
        setClicked(!clicked);
    
        for(let i=0; i<progresso.length; i++) { 
            if(progresso[i] === cardIndex) {
                progresso.splice(i,1); 
            }
        }  
        setProgresso([...progresso,cardIndex]);  
    
        console.log(id);
    
        const config = {
            headers: {Authorization: `Bearer ${userData.token}`}
        };  
    
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,id,config); 
        
        promise.then(response => { 
            currentSequence += 1;
        }); 
    
        promise.catch(err => {
            const promiss = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,id,config); 
        });
    } 

    return(
        <Habito1 clicked={clicked}>
            <Texto index={index}>
                <h2>{name}</h2> 
                <p>Sequência atual: {currentSequence} dias</p> 
                <p>Seu recorde: {highestSequence + 1} dias</p> 
            </Texto>  
            <ion-icon name="checkbox" onClick={() => tapCard(index,id,currentSequence)}></ion-icon>
        </Habito1>  
    )
}


const Habito1 = styled.div` 
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