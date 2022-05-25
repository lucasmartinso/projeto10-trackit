import styled from "styled-components"; 

export default function Login() { 
    return( 
        <>
        <Conatiner>
            <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4c8.svg" />   
            <h1>TrackIt</h1>
        </Conatiner>

        <form>
        <Dados>
            <input type="email" placeholder= "email" required />
            <input type="password" placeholder="senha" required />  
            <button>Entrar</button> 
            <h3>Não tem uma conta? Cadastre-se!</h3>
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
    margin-top: 68px;

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
    width: 100%;  
    display: flex; 
    justify-content: center;   
    align-items: center;
    flex-direction: column;  
    margin-top: 43px;  
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
        background: rgba(82, 182, 255, 1);
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

        &:hover { 
            cursor: pointer;
        }
    }
`