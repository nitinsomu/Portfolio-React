import React, { useEffect, useRef } from "react";

// Darkens the room except a torch-beam that follows the cursor.
function Flashlight({ radius = 340 }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        function move(e) {
            el.style.setProperty("--fx", `${e.clientX}px`);
            el.style.setProperty("--fy", `${e.clientY}px`);
        }
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
    }, []);

    return (
        <div
            ref={ref}
            className="flashlight"
            style={{ "--fr": `${radius}px` }}
            aria-hidden="true"
        />
    );
}

export default Flashlight;
