import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomShell from "../escape/RoomShell";
import Draggable from "../escape/Draggable";
import Keypad from "../escape/Keypad";
import Terminal from "../components/Terminal";
import { useGame, RoomGuard } from "../escape/GameContext";

function Study() {
    const { game, solve } = useGame();
    const navigate = useNavigate();
    const [showTerminal, setShowTerminal] = useState(false);

    return (
        <RoomShell
            current="lobby"
            title="The Study"
            hint="His desk. Everything here can be moved — the door code didn't hide itself."
        >
            <div className="scene study-scene">
                {/* hidden digits, revealed by dragging the objects off them */}
                <span className="hidden-digit" style={{ left: "16%", top: "58%" }}>① 4</span>
                <span className="hidden-digit" style={{ left: "43%", top: "70%" }}>② 0</span>
                <span className="hidden-digit" style={{ left: "66%", top: "52%" }}>③ 4</span>

                <Draggable className="obj" style={{ left: "14%", top: "52%" }}>
                    <div className="obj-body" title="a suspiciously heavy mug">☕</div>
                    <span className="obj-tag">world's okayest engineer</span>
                </Draggable>

                <Draggable className="obj" style={{ left: "40%", top: "62%" }}>
                    <div className="obj-body" title="his notebook">📓</div>
                    <span className="obj-tag">ideas, mostly crossed out</span>
                </Draggable>

                <Draggable className="obj" style={{ left: "63%", top: "44%" }}>
                    <div className="obj-body" title="office plant, somehow alive">🪴</div>
                    <span className="obj-tag">alive since 2023</span>
                </Draggable>

                <Draggable className="obj" style={{ left: "28%", top: "30%" }}>
                    <div className="obj-body" title="a framed badge">🖼️</div>
                    <span className="obj-tag">Technology Analyst @ Morgan Stanley</span>
                </Draggable>

                <button
                    className="obj obj-laptop"
                    style={{ left: "50%", top: "26%" }}
                    onClick={() => setShowTerminal(true)}
                >
                    <div className="obj-body">💻</div>
                    <span className="obj-tag">his laptop — still logged in</span>
                </button>

                {/* the exit door */}
                <div className="door-panel">
                    <p className="door-label">EXIT · enter the code</p>
                    <Keypad
                        code="404"
                        solved={game.lobby}
                        onUnlock={() => solve("lobby")}
                    />
                    {game.lobby && (
                        <button className="btn-escape door-go" onClick={() => navigate("/archives")}>
                            DOOR UNLOCKED → THE ARCHIVES
                        </button>
                    )}
                </div>
            </div>

            {showTerminal && (
                <div className="modal-overlay" onClick={() => setShowTerminal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowTerminal(false)} aria-label="Close">
                            ✕
                        </button>
                        <Terminal />
                    </div>
                </div>
            )}
        </RoomShell>
    );
}

export default function Lobby() {
    return (
        <RoomGuard need="started">
            <Study />
        </RoomGuard>
    );
}
