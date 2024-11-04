import React from "react";
import SmallCard from "./smallcard";
import images from "../assets/images";

function Skills() {
    return (
        <div className="container">
            <h3 className="title">Skills</h3>
            <div className="skills-container"> 
                {Object.entries(images).map(([alt, src], index) => (
                    <SmallCard key={index} src={src} alt={alt} />
                ))}
            </div>
        </div>
    );
}

export default Skills;
