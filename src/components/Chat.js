import { InfoOutlined, InsertComment, StarBorderOutlined } from '@material-ui/icons';
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

function Chat({ heading }) {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId &&
        db
            .collection('rooms')
            .doc(roomId)
    )
    const [roomMessages, loading] = useCollection(
        roomId &&
        db
            .collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
    )
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [roomId, loading])


    return (
        <ChatContainer>
            {roomDetails && roomMessages ? (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4>
                                <strong>#{roomDetails?.data().name}</strong>
                            </h4>
                            <StarBorderOutlined />
                        </HeaderLeft>

                        <HeaderRight>
                            <p>
                                <InfoOutlined /> Details
                            </p>
                        </HeaderRight>
                    </Header>

                    <ChatMessages>
                        {roomMessages?.docs.map(doc => {
                            const { message, timestamp, user, userImage } = doc.data();

                            return (
                                <Message
                                    key={doc.id}
                                    message={message}
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage}
                                />
                            )
                        })}
                        <ChatBottom ref={chatRef} />
                    </ChatMessages>

                    <ChatInput chatRef={chatRef} channelName={roomDetails?.data().name} channelId={roomId} />
                </>
            ) : (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4>
                                <strong>#{heading}</strong>
                            </h4>
                            <StarBorderOutlined />
                        </HeaderLeft>

                        <HeaderRight>
                            <p>
                                <InfoOutlined /> Details
                            </p>
                        </HeaderRight>
                    </Header>

                    <ChatCenter>
                        <InsertComment />
                        <h3>There are no {heading} yet...</h3>
                    </ChatCenter>

                </>
            )
            }
        </ChatContainer>
    )
}

export default Chat

const ChatMessages = styled.div`
`;
const ChatCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 7em;
    flex-direction: column;

    >h3{
    font-size: 2em;
    color: lightgray;
    max-width: 23%;
    }

    >.MuiSvgIcon-root{
        font-size: 12em;
        color: lightgray;
    }

    @media (max-width: 500px) {
        >.MuiSvgIcon-root{
            font-size: 5em;
        }
        >h3{
            font-size: 1em;
            max-width: 30%;
        }
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid gray;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    >h4{
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    >h4 >.MuiSvgIcon-root{
        margin-left: 10px;
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`
    >p{
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    >p >.MuiSvgIcon-root{
        margin-right: 5px !important;
        font-size: 16px;
    }

    @media (max-width: 400px) {
        p{
            display: none;
        }
    }
`;

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`;