import React, { useRef } from "react";

// Wraps children in a 3D perspective tilt that follows the mouse,
// plus a glow spot that tracks the cursor position on the card.
function TiltCard({ children, className = "" }) {
    const ref = useRef(null);

    function onMove(e) {
        const el = ref.current;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
        el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
        el.style.setProperty("--mx", `${x * 100}%`);
        el.style.setProperty("--my", `${y * 100}%`);
    }

    function onLeave() {
        const el = ref.current;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
    }

    return (
        <div
            ref={ref}
            className={`tilt-card ${className}`}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
        >
            <div className="tilt-glow" aria-hidden="true" />
            {children}
        </div>
    );
}

export default TiltCard;
