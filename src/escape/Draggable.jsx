import React, { useRef, useState } from "react";

// Free-drag element (pointer events → works for touch too).
function Draggable({ children, className = "", style, onLift }) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [held, setHeld] = useState(false);
    const grip = useRef(null);

    function down(e) {
        e.currentTarget.setPointerCapture(e.pointerId);
        grip.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
        setHeld(true);
        onLift?.();
    }
    function move(e) {
        if (!grip.current) return;
        setPos({
            x: grip.current.ox + e.clientX - grip.current.sx,
            y: grip.current.oy + e.clientY - grip.current.sy,
        });
    }
    function up() {
        grip.current = null;
        setHeld(false);
    }

    return (
        <div
            className={`draggable ${held ? "held" : ""} ${className}`}
            style={{ ...style, transform: `translate(${pos.x}px, ${pos.y}px)` }}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
        >
            {children}
        </div>
    );
}

export default Draggable;
