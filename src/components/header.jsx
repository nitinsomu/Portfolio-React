import React from "react";
import '../index.css' 
function Header() {
    return (    
        <div class="navbar">
        <ul>
            <li><a href="#experience">Experience</a></li>
            {/* <li><a href="#projects">Projects</a></li> */}
            <li><a href="#skills">Skills</a></li>
            <li><a href="#certifications">Certifications</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        </div>
    )
}
export default Header;