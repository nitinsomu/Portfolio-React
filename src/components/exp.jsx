import React from "react";
import Card from "./card";

function Exp() {
    return (
        <div className="container">
            <h3 className="title">Experience</h3>
            <div className="card-container">
                <Card name = "Barclays" desc = "Pune"/>
                <Card name = "Bosch" desc = "Bengaluru"/>
            </div>
        </div>
    );
}

export default Exp;
