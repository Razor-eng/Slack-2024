import { Button } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase';

function Login() {
    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch(error => alert(error.message));
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img src="favicon.png" alt="" />
                <h1>Sign in to Slack</h1>
                <p>slack.com</p>
                <Button type='submit' onClick={signIn}>Sign in with Google</Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
    background-color: aliceblue;
    background-image: radial-gradient(circle, #051937, #14193c, #221840, #311441, #3f0f40);    
    height: 100vh;
    display: grid;
    place-items: center;
`;

const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: aliceblue;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    >img{
        object-fit: contain;
        height: 100px;
        margin-bottom: 40px;
    }

    >Button{
        margin-top: 50px;
        text-transform: inherit !important;
        background-color: var(--slack-color) !important; 
        color: white;
        transition: all .5s;
    }

    >Button:hover{
            scale: 1.1;
            color: lightgray;
    }

    >Button:active{
            scale: 0.9;
    }
`;