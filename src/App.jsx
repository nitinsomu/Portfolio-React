import React from 'react';
import {Routes, Route} from 'react-router-dom'
import { GameProvider } from './escape/GameContext';
import Landing from './pages/landing';
import Lobby from './pages/lobby';
import Archives from './pages/archives';
import Lab from './pages/lab';
import Vault from './pages/vault';
import Dossier from './pages/dossier';
import NotFound from './pages/notfound';
import ToastHost from './components/ToastHost';
import MatrixRain from './components/MatrixRain';

function App() {
  return (
    <GameProvider>
      <MatrixRain />
      <Routes>
        <Route index element={<Landing/>}/>
        <Route path='/lobby' element={<Lobby/>}/>
        <Route path='/archives' element={<Archives/>}/>
        <Route path='/lab' element={<Lab/>}/>
        <Route path='/vault' element={<Vault/>}/>
        <Route path='/dossier' element={<Dossier/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <ToastHost />
    </GameProvider>
  )
}

export default App;
