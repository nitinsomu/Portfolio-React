import React from "react";

function Footer() {
    let year = new Date().getFullYear();
    return (
        <div className="footer-container contact">
            <section id = "contact">
            <footer>
                <div>nitin.somu13@gmail.com</div>
                <div>{year}</div>
            </footer>
            </section>
        </div>
    );
}

export default Footer;
