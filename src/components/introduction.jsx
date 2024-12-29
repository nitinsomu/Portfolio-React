import React from 'react';
import { Link } from 'react-router-dom';

function Introduction() {
    return (
      <div class="hero">
      <div>
          <h1 className = "typewriter">Hello, I'm Nitin Somu</h1>
          <p className = "info">
              I'm a Computer Science Engineer with a strong background in data structures, algorithms, and programming. I have experience in C++ and Python, focusing on backend development, machine learning and cloud computing. I am passionate about exploring new technologies and contributing to innovative projects.
          </p>
          <Link to="/projects" class="btn">View My Projects</Link>
      </div>
  </div>
      )
}

export default Introduction;