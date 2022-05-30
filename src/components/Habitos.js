import styled from "styled-components"; 
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; 
import 'react-circular-progressbar/dist/styles.css'; 
import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { ThreeDots } from  'react-loader-spinner'; 

export default function Habitos({userData}) {  
    const [clicked, setClicked] = useState(false);
    const [habito, setHabito] = useState("");  
    const [dia, setDia] = useState([]); 
    const [listaHabitos, setListaHabitos] = useState([]); 
    const [clicked2, setClicked2] = useState(false);
    const navigate = useNavigate();   

    const infoDias = [
        {
            abreviatura : "D",  
            day: "domingo", 
            state: true
        }, 
        {
            abreviatura : "S",  
            day: "segunda", 
            state: false
        }, 
        {
            abreviatura : "T",  
            day: "terca", 
            state: false
        },  
        {
            abreviatura : "Q",  
            day: "quarta", 
            state: false
        },  
        {
            abreviatura : "Q",  
            day: "quinta", 
            state: false
        },  
        {
            abreviatura : "S",  
            day: "sexta", 
            state: false
        },  
        {
            abreviatura : "S",  
            day: "sabado", 
            state: false
        } 
    ];   

    useEffect(() => {
        const config = {
            headers: {Authorization: `Bearer ${userData.token}`}
        };  
        const promiss = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config);  

        promiss.then(response => { 
            console.log(response.data);
            setListaHabitos([...response.data]); 
        });   

        promiss.catch(err => { 
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

    function cancelar() { 
        setClicked(false);
    }    

    function salvar() { 
        setClicked2(true); 
        setHabito("");
        const body = {name: habito, days: dia};  
        const config = {
            headers: {Authorization: `Bearer ${userData.token}`}
        };  

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",body,config);  

        promise.then(response => {
            const config = {
                headers: {Authorization: `Bearer ${userData.token}`}
            };  
            const promiss = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config);  
        
            promiss.then(response => { 
                setListaHabitos([...response.data]);  
                cancelar();
            });   
        
            promiss.catch(err => { 
                alert("Azedou");
            }); 
        }); 

        promise.catch(err => {
            alert("Deu ruim");
        });
    }

    function SelectDay({tapCard, index, abreviatura, state, day}) {   
        let days; 

        function tapCard(cardIndex,state) {    

            for(let i=0; i<dia.length; i++) { 
                if(dia[i] === cardIndex) {
                    dia.splice(i,1); 
                }
            }  
            setDia([...dia,cardIndex]); 
    
            days =(infoDias.map((value,index) => {
                if(index === cardIndex) {  
                    return {
                        ...value, 
                        state: !state,
                    }
                } else { 
                    return { 
                        ...value,
                    }
                }
            }))
        }

        return(
            <SelecaoDia onClick={() => tapCard(index,abreviatura)} state={state} day={day}>{abreviatura}</SelecaoDia>
        ) 
    }  

    function RenderizaHabitos({name,id,days}) { 
        return(
            <Habit id={id}> 
                <Texto>
                    <h2>{name}</h2> 
                    {infoDias.map((infoDia,index) => ( 
                        <SelectDay  
                            index={index}
                            abreviatura = {infoDia.abreviatura} 
                            state = {infoDia.state} 
                            day = {infoDia.day} 
                    />
                    ))}
                </Texto>
                    <ion-icon name="trash-outline" onClick={() => deletar({id})} id={id}></ion-icon>
                </Habit> 
        )
    } 

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

    function plus() { 
        setClicked(true); 
        setClicked2(false);
    }

    return(
        <Container>
            <Header>
                <h2>TrackIt</h2> 
                <img src={userData.image}/>
            </Header> 

            <Title>
                <h2>Meus Hábitos</h2> 
                <button onClick={plus}>+</button>
            </Title>  

            {clicked ?(
            <CriarHabito>
                <input type="text" placeholder= "nome do hábito" value={habito} onChange={(e) => setHabito(e.target.value)} required/>  
                <Dias> 
                    {infoDias.map((infoDia,index) => (
                    <SelectDay  
                        index={index}
                        abreviatura = {infoDia.abreviatura} 
                        state = {infoDia.state} 
                        day = {infoDia.day} 
                    />
                    ))}
                </Dias> 
                <Botoes>
                    <h4 onClick={cancelar}>Cancelar</h4> 
                    <button onClick={salvar}>
                    {clicked2 ? (
                        <ThreeDots color="white" height={50} width={50} />
                        ) : ("Salvar") }
                    </button>
                </Botoes>
            </CriarHabito> 
            ) : "" }

            {listaHabitos.length===0 ? (
            <Mensagem>
                <h3>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h3> 
            </Mensagem>   
            ) : "" }

            {listaHabitos.map(habito =>
                <RenderizaHabitos 
                    name= {habito.name} 
                    id = {habito.id} 
                    days= {habito.days}
                />
            )}

            <Footer>
                <span onClick={toHabitos}>Hábitos</span>   
                <BolinhaFooter onClick={toHoje}> 
                    <CircularProgressbar 
                    value={66} 
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
const CriarHabito = styled.div`
    width: 340px; 
    height: 180px; 
    background-color: rgba(255, 255, 255, 1); 
    display: flex;  
    flex-direction: column;
    align-items: center;  
    border-radius: 5px;  
    color: rgba(219, 219, 219, 1);  

    input { 
        width: 303px; 
        height: 45px; 
        margin-top: 18px;
        margin-bottom: 10px; 
        padding-left: 11px; 
        border: 1px solid rgba(212, 212, 212, 1); 
        border-radius: 5px; 
        font-size: 20px;  
    }
`  
const Dias = styled.div`  
    width: 100%;  
    display: flex;  
    padding-left: 19px;  
    justify-content: flex-start; 
`  
const SelecaoDia = styled.button`
    border-radius: 5px; 
    margin-right: 4px;
    width: 30px; 
    height: 30px;  
    font-size: 19px;
    color: ${props => props.state ? "rgba(255, 255, 255, 1)" :  "rgba(207, 207, 207, 1)"}; 
    border: 1px solid rgba(212, 212, 212, 1); 
    background-color: ${props => props.state ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};  

    &:hover{ 
        cursor: pointer; 
` 
const Botoes = styled.div`
    width: 100%; 
    display: flex;  
    justify-content: flex-end;  
    align-items: center;  
    margin-top: 29px; 
    padding-right: 16px;

    h4 { 
        font-size: 16px; 
        color: rgba(82, 182, 255, 1);
        margin-right: 23px; 

        &:hover { 
            cursor: pointer;
        }
    } 

    button { 
        width: 84px; 
        height: 35px;
        color: rgba(255, 255, 255, 1); 
        background-color: rgba(82, 182, 255, 1); 
        font-size: 16px; 
        border-radius: 5px; 
        border: none; 
        display: flex; 
        align-items: center; 
        justify-content: center;

        &:hover { 
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
