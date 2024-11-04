import React from "react";

function Footer() {
    let year = new Date().getFullYear();
    return (
        <div className="footer-container">
            <footer>
                <div>nitin.somu13@gmail.com</div>
                <div>{year}</div>
            </footer>
        </div>
    );
}

export default Footer;
