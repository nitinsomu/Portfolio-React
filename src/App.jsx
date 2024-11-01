import { useState } from 'react'
import React from 'react';
import Introduction from './components/introduction';
import Header from './components/header';
import Exp from './components/exp';
import Projects from './components/projects';
import Footer from './components/footer';

function App() {
  return (
    <div>
      <Header/>
      <Introduction/>
      <Exp/>
      <Projects/>
      <Footer/>
    </div>
  )
}

export default App;
