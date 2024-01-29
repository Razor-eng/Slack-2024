import { Avatar, Button } from '@material-ui/core';
import { AccessTime, ExitToApp, HelpOutline, Search } from '@material-ui/icons';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth } from '../firebase';

function Header() {
    const [user] = useAuthState(auth);

    return (
        <HeaderContainer>

            <HeaderLeft>
                <HeaderAvatar
                    src={user?.photoURL}
                    alt={user?.displayName}
                />
                <AccessTime />
            </HeaderLeft>

            <HeaderSearch>
                <Search />
                <input type="text" placeholder='Search Slack' />
            </HeaderSearch>

            <HeaderRight>
                <HelpOutline />
                <Button onClick={() => auth.signOut()}>
                    <ExitToApp />
                </Button>
            </HeaderRight>

        </HeaderContainer>
    )
}

export default Header

const HeaderRight = styled.div`
    flex:0.3;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    >button{
        color: white;
        padding: 0;
        border-radius: 999px;

        :active{
            scale: 0.9;
        }
    }

    >.MuiSvgIcon-root{
        /* margin-left: auto; */
        margin-right: 20px;
    }
`;

const HeaderSearch = styled.div`
    flex:0.4;
    opacity: 1;
    border-radius: 6px;
    background-color: #421f44;
    display: flex;
    text-align: center;
    padding: 0 50px;
    color: gray;
    border: 1px gray solid;

    >input{
        background-color: transparent;
        border: none;
        outline: none;
        text-align: center;
        min-width: 30vw;
        color: white;
    }

    @media (max-width: 500px) {
        display: none;
    }
`;

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color: white;
`;

const HeaderLeft = styled.div`
    flex:0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;

    >.MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 30px;
    }

    @media (max-width: 500px) {
        >.MuiSvgIcon-root{
            display: none;
        }
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity: 0.8;
    }
`;