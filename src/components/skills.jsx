import React from "react";
import Smallcard from "./smallcard";
import images from "../assets/images";

function Skills() {
    return (
    <div className="skills-entire-container">
        <section id="skills">
            <h3 className="title">Skills</h3>
            <div className="skills-container">
                {[...Object.entries(images), ...Object.entries(images)].map(([alt, src], index) => (
                <Smallcard key={index} src={src} alt={alt} />
                ))}
            </div>
        </section>
    </div>
    );
}

export default Skills;
