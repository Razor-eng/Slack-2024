import React from 'react'
import styled from 'styled-components'
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';

function SidebarOption({ Icon, title, addChannelOption, id }) {
    const dispatch = useDispatch();

    const addChannel = () => {
        const channelName = prompt("Enter the channel name")
        if (channelName) {
            db.collection('rooms').add({
                name: channelName,
            });
        }
    };

    const selectChannel = () => {
        if (id) {
            dispatch(enterRoom({
                roomId: id
            }));
        }
    };

    return (
        <SidebarOptionContainer className='option' onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
            {Icon ? (
                <h3>{title}</h3>
            ) : (
                <SidebarOptionChannel>
                    <span>#</span> {title}
                </SidebarOptionChannel>
            )}
        </SidebarOptionContainer>
    );
}

export default SidebarOption

const SidebarOptionContainer = styled.div`
    cursor: pointer;
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;

    >h3{
        font-weight: 500;
    }

    >h3 >span{
        padding: 15px;
    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
`;