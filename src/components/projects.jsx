import React from "react";
import Card from "./card";

function Projects() {
    return (
        <div className="container">
            <h3 className="title">Projects</h3>
            <div className="card-container">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default Projects;