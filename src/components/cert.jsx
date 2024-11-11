import React from "react";
import Card from "./card";

function Cert() {
    return (
        <div className="container">
            <section id="certs">
            <h3 className="title">Certifications</h3>
            <div className="card-container">
                <Card name = "Cloud Practioner" desc = "Amazon Web Services" src = "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Cloud-Practitioner_badge.634f8a21af2e0e956ed8905a72366146ba22b74c.png" srcs = "https://cp.certmetrics.com/amazon/en/public/verify/credential/13ddddf8301c41e69a2ac0ae79258e23"/>
            </div>
            </section>
        </div>
    );
}

export default Cert;
