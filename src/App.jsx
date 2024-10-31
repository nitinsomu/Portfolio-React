import { useState } from 'react'
import './App.css'
import React from 'react';
import Introduction from './components/introduction';
import Header from './components/header';

function App() {
  return (
    <div>
      <Header/>
      <Introduction/>
    </div>
  )
}

export default App;
