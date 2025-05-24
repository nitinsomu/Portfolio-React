import React from "react";
import Card from "./card";

function Exp() {
    return (
        <div className="container">
            <section id="exp">
            <h3 className="title">Experience</h3>
            <div className="card-container">
                <Card name = "Quality Assurance Intern" desc = "Bengaluru" src = "https://upload.wikimedia.org/wikipedia/commons/7/76/NASDAQ_logo.svg" duration = "January 2025 - Current" srcs = "https://www.nasdaq.com/"/>
                <Card name = "Technology Summer Intern" desc = "Pune" src = "https://content.influencemap.org//site/data/001/361/1361555.png" duration = "June - July 2024" srcs = "https://home.barclays/"/>
                <Card name = "Project Intern" desc = "Bengaluru" src = "https://1000logos.net/wp-content/uploads/2016/10/Bosch-Logo.png" duration = "August - September 2023" srcs = "https://www.bosch.in/"/>
            </div>
            </section>
        </div>
    );
}

export default Exp;
