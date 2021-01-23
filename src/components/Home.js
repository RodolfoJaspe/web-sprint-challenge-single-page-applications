import React from 'react'
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';


const HomeHeaderDiv = styled.div`
    button {
        font-size: 2rem;
        color: darkred;
        background-color: lightyellow;
        border-radius: 10px;
        border: 1px solid darkred;
       
    }
`

const PizzasDiv = styled.div`
    display: flex;
    justify-content: space-around;

    .pizzaPic img{
        width: 30vw;
        height: 30vw;
    }
`

export default function Home () {
    const history= useHistory();
    const pizzaRoute = (event) => {
        setTimeout(() => {
        history.push("/pizza");
        }, 1000);
    };
    return (
        <div>
            <HomeHeaderDiv>
                <h2>You gotta eat too, you know?</h2>
                <button onClick={pizzaRoute}>Pizza?</button>
            </HomeHeaderDiv>
            <PizzasDiv>
                <div className="pizzaPic">
                        <img alt="cheese pizza" src="https://thumbs-prod.si-cdn.com/9aFJPOkDiXJw0OGxwpdojwIg9f8=/fit-in/1600x0/https://public-media.si-cdn.com/filer/9a/38/9a388951-b252-4535-b5ee-740d21a74842/mmmmm.jpg" />
                </div>
                <div className="pizzaPic">
                    <img alt="pepperoni pizza" src="https://images-gmi-pmc.edge-generalmills.com/2be21b08-c898-453d-9599-3bbb319a72f4.jpg"/>
                </div>
                <div className="pizzaPic">
                    <img alt="hawaiian pizza" src="https://www.jessicagavin.com/wp-content/uploads/2020/07/hawaiian-pizza-16.jpg"/>
                </div>
            </PizzasDiv>
        </div>
      
    )
}