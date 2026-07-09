import React, { useState } from "react";

// 3-digit keypad; calls onUnlock when the right code is entered.
function Keypad({ code = "404", onUnlock, solved }) {
    const [entry, setEntry] = useState("");
    const [shake, setShake] = useState(false);

    function press(d) {
        if (solved) return;
        const next = (entry + d).slice(0, 3);
        setEntry(next);
        if (next.length === 3) {
            if (next === code) onUnlock();
            else {
                setShake(true);
                setTimeout(() => {
                    setEntry("");
                    setShake(false);
                }, 450);
            }
        }
    }

    return (
        <div className={`keypad ${shake ? "shake" : ""} ${solved ? "solved" : ""}`}>
            <div className="keypad-display" aria-live="polite">
                {solved ? "OPEN" : entry.padEnd(3, "•")}
            </div>
            <div className="keypad-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d) => (
                    <button key={d} onClick={() => press(String(d))} disabled={solved}>
                        {d}
                    </button>
                ))}
                <button onClick={() => setEntry("")} disabled={solved} className="keypad-clr">
                    CLR
                </button>
            </div>
        </div>
    );
}

export default Keypad;
