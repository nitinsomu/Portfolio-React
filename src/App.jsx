import React from 'react';
import Home from './pages/home';
import {Routes, Route} from 'react-router-dom'
import Projects from './pages/projects';
import NotFound from './pages/notfound';
import CommandPalette from './components/CommandPalette';
import ToastHost from './components/ToastHost';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path={'/projects'} element={<Projects/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <CommandPalette />
      <ToastHost />
    </>
  )
}

export default App;
