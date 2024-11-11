import React, { useState } from "react";
import '../index.css';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false); // Close dropdown after clicking
    }

    return (
        <div className="navbar">
            <button
                className="hamburger"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                ☰
            </button>
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                <li><a href="#exp" onClick={() => scrollToSection('exp')}>Experience</a></li>
                <li><a href="#skills" onClick={() => scrollToSection('skills')}>Skills</a></li>
                <li><a href="#certs" onClick={() => scrollToSection('certs')}>Certifications</a></li>
                <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
            </ul>
        </div>
    );
}

export default Header;
