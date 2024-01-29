import { Add, Apps, BookmarkBorder, Create, Drafts, ExpandLess, ExpandMore, FiberManualRecord, FileCopy, Inbox, InsertComment, PeopleAlt } from '@material-ui/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import SidebarOption from './SidebarOption'
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Sidebar({ selectHeading }) {

    const [channels] = useCollection(db.collection('rooms'));
    const [user] = useAuthState(auth);
    const [click, setClick] = useState(false);

    return (
        <SidebarContainer>

            <SidebarHeader>
                <SidebarInfo>
                    <h2>{user?.displayName.split(" ")[0]}</h2>
                    <h3>
                        <FiberManualRecord />
                        {user?.displayName}
                    </h3>
                </SidebarInfo>
                <Create />
            </SidebarHeader>

            <div onClick={e => selectHeading("Threads")}>
                <SidebarOption Icon={InsertComment} title="Threads" />
            </div>
            <div onClick={e => selectHeading("Mentions")}>
                <SidebarOption Icon={Inbox} title="Mentions & reactions" />
            </div>
            <div onClick={e => selectHeading("Saved Items")}>
                <SidebarOption Icon={Drafts} title="Saved items" />
            </div>
            {
                click ? (
                    <>
                        <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
                        <SidebarOption Icon={PeopleAlt} title="People & user groups" />
                        <SidebarOption Icon={Apps} title="Apps" />
                        <SidebarOption Icon={FileCopy} title="File browser" />
                        <div onClick={e => setClick(!click)}>
                            <SidebarOption Icon={ExpandLess} title="Show Less" />
                        </div>
                    </>
                ) :
                    <div onClick={e => setClick(!click)}>
                        <SidebarOption Icon={ExpandMore} title="Show More" />
                    </div>
            }
            <hr />
            <SidebarOption Icon={ExpandMore} title="Channels" />
            <hr />
            <SidebarOption Icon={Add} addChannelOption title="Add Channel" />

            {channels?.docs.map(doc => (
                <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
            ))}

        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    color: white;
    background-color: var(--slack-color);
    flex: 0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;

    >hr{
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #49274b;
    }
`;

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px; 

    >.MuiSvgIcon-root{
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: #fff;
        border-radius: 999px;
    }
`;

const SidebarInfo = styled.div`
    flex:1;

    >h2{
        font-size: 17px;
        font-weight: 700;
        margin-bottom: 5px;
        letter-spacing: 0.8px;
    }

    >h3{
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    >h3 >.MuiSvgIcon-root{
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`;