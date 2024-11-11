import React from "react";

function Card(props) {
    return (
        <div className="card">
            <a href = {props.srcs} target="_blank" rel="noopener noreferrer">
            <img src = {props.src}/>
            </a>
            <p>{props.name}</p>
            <p>{props.desc}</p>
            <p>{props.duration}</p>
        </div>
    );
}

export default Card;
