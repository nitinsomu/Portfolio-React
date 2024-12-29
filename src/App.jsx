import React from 'react';
import Home from './pages/home';
import {Routes, Route} from 'react-router-dom'
import Projects from './pages/projects';

function App() {
  return (
    <Routes>
      <Route index element={<Home/>}/>
      <Route path={'/projects'} element={<Projects/>}/>
    </Routes>
  )
}

export default App;
