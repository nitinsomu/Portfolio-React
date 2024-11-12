import React from "react";
import icons from "../assets/icons";

function Footer() {
    let year = new Date().getFullYear();
    return (
        <div className="footer-container contact">
            <section id="contact">
                <footer>
                    <div>nitin.somu13@gmail.com</div>
                    <div>{year}</div>
                    <div>
                        <a href="https://github.com/nitinsomu" target="_blank" rel="noopener noreferrer">
                                <img className="icon" src={icons.Github} alt="GitHub" />
                        </a>
                    </div>
                    <div>
                        <a href="https://linkedin.com/in/nitinsomu" target="_blank" rel="noopener noreferrer">
                                <img className="icon" src={icons.Linkedin} alt="LinkedIn" />
                        </a>
                    </div>
                </footer>
            </section>
        </div>
    );
}

export default Footer;