import React from "react";
import '../index.css';

function Header() {
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className="navbar">
            <ul>
                <li><a href="#exp" onClick={() => scrollToSection('exp')}>Experience</a></li>
                <li><a href="#skills" onClick={() => scrollToSection('skills')}>Skills</a></li>
                <li><a href="#certs" onClick={() => scrollToSection('certs')}>Certifications</a></li>
                <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
            </ul>
        </div>
    );
}

export default Header;
