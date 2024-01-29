import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Spinner from 'react-spinkit';

function App() {

  const [user, loading] = useAuthState(auth);
  const [heading, setHeading] = useState("Threads")
  const selectHeading = (heading) => {
    setHeading(heading);
  }

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="favicon.png" alt="" />
          <Spinner
            name="ball-spin-fade-loader"
            color="purple"
            fadeIn="none"
          />
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <div>
      <BrowserRouter>
        {
          !user ? (
            <Login />
          ) : (
            <>
              <Header />
              <AppBody>
                <Sidebar selectHeading={selectHeading} />
                <Routes>
                  <Route path="/" element={<Chat heading={heading} />} />
                </Routes>
              </AppBody>
            </>
          )
        }
      </BrowserRouter>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  >img{
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;