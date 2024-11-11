import React from "react";

function SmallCard(props) {
    return (
        <div class = "small-card">
            <img src = {props.src} alt = {props.alt} key = {props.key} />
        </div>
    )
}

export default SmallCard;