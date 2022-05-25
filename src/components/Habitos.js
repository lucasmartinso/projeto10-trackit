import styled from "styled-components"; 

export default function Habitos() { 
    return(
        <Container>
            <Header>
                <h2>TrackIt</h2> 
                <img src="https://midias.correiobraziliense.com.br/_midias/jpg/2016/04/05/675x450/1_cbnfot050420160102-21057794.jpg?20220217210708?20220217210708"/>
            </Header> 

            <Title>
                <h2>Meus Hábitos</h2> 
                <button>+</button>
            </Title> 

            <Mensagem>
                <h3>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h3>
            </Mensagem>
        </Container>
    )
} 


const Container = styled.div`
    background-color: #FFFFFF; 
    width: 100%; 
    heigth: 100%; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center;   
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

