import React from "react";

function Card(props) {
    return (
        <div className="card">
            <p>{props.name}</p>
            <p>{props.desc}</p>
        </div>
    );
}

export default Card;
