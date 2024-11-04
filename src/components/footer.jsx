import React from "react";

function Footer() {
    let year = new Date().getFullYear();
    return (
        <div className="footer-container">
            <footer>
                <div>Nitin Somu</div>
                <div>nitin.somu13@gmail.com</div>
                <div>{year}</div>
            </footer>
        </div>
    );
}

export default Footer;
