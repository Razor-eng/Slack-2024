import React from 'react'
import styled from 'styled-components'

function Message({ message, timestamp, user, userImage }) {
    return (
        <MessageContainer>
            <img src={userImage} alt="" />
            <MessageInfo>
                <h4>
                    {user}
                    <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                <p>{message}</p>
            </MessageInfo>
        </MessageContainer>
    )
}

export default Message

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid lightgray;

    >img{
        height: 50px;
        width: 50px;
        border-radius: 8px;
    }

    @media (max-width: 500px) {
        position:relative ;
        left: -12px;
        >img{
            height: 40px;
            width: 40px;
        }
    }
`;

const MessageInfo = styled.div`
    padding-left: 20px;

    >h4>span{
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: 10px;
    }

    @media (max-width: 500px) {
        display: flex;
        flex-direction: column;

        >h4{
            font-size: 10px;
        }

        >h4>span{
            display: flex;
            flex-direction: column;
        }
    }
`;