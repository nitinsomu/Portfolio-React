import React, { useRef } from "react";

// Makes its child pull toward the cursor while hovered.
function Magnetic({ children, strength = 0.35 }) {
    const ref = useRef(null);

    function onMove(e) {
        const el = ref.current;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }

    function onLeave() {
        ref.current.style.transform = "translate(0, 0)";
    }

    return (
        <div ref={ref} className="magnetic" onMouseMove={onMove} onMouseLeave={onLeave}>
            {children}
        </div>
    );
}

export default Magnetic;
