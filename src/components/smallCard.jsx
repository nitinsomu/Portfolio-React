import React from "react";

function Smallcard(props) {
    return (
        <div class = "small-card">
            <img src = {props.src} alt = {props.alt} key = {props.key} />
        </div>
    )
}

export default Smallcard;