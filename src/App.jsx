import { useState } from 'react'
import React from 'react';
import Introduction from './components/introduction';
import Header from './components/header';
import Exp from './components/exp';
import Projects from './components/projects';
import Footer from './components/footer';
import Cert from './components/cert';
import Skills from './components/skills';

function App() {
  return (
    <div>
      <Header/>
      <Introduction/>
      <Exp/>
      {/* <Projects/> */}
      <Skills />
      <Cert />
      <Footer/>
    </div>
  )
}

export default App;
