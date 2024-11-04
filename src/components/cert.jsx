import React from "react";
import Card from "./card";

function Cert() {
    return (
        <div className="container">
            <h3 className="title">Certifications</h3>
            <div className="card-container">
                <Card name = "Cloud Practioner" desc = "Amazon Web Services"/>
            </div>
        </div>
    );
}

export default Cert;
