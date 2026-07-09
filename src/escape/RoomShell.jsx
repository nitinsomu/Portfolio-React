import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGame } from "./GameContext";
import Flashlight from "./Flashlight";

const ROOMS = [
    { id: "lobby", path: "/lobby", label: "01 · The Study", unlockedBy: "startedAt" },
    { id: "archives", path: "/archives", label: "02 · The Archives", unlockedBy: "lobby" },
    { id: "lab", path: "/lab", label: "03 · The Lab", unlockedBy: "archives" },
    { id: "vault", path: "/vault", label: "04 · The Exit", unlockedBy: "lab" },
];

function Timer() {
    const { game } = useGame();
    const [, tick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => tick((n) => n + 1), 1000);
        return () => clearInterval(t);
    }, []);
    if (!game.startedAt) return null;
    const ms = (game.escapedAt || Date.now()) - game.startedAt;
    const s = Math.floor(ms / 1000);
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return <span className="room-timer">⏱ {mm}:{ss}</span>;
}

function RoomShell({ current, title, hint, children, flashlight = true }) {
    const { game } = useGame();
    return (
        <div className="room" data-room={current}>
            {flashlight && <Flashlight />}
            <header className="room-bar">
                <Link to="/" className="room-logo">ROOM 404</Link>
                <nav className="room-tabs" aria-label="Rooms">
                    {ROOMS.map((r) => {
                        const unlocked = !!game[r.unlockedBy];
                        const active = r.id === current;
                        return unlocked ? (
                            <Link key={r.id} to={r.path} className={`room-tab ${active ? "active" : ""}`}>
                                {r.label}
                            </Link>
                        ) : (
                            <span key={r.id} className="room-tab locked" title="locked">
                                🔒 {r.label}
                            </span>
                        );
                    })}
                </nav>
                <div className="room-bar-right">
                    <Timer />
                    <Link to="/dossier" className="room-skip">case file ↗</Link>
                </div>
            </header>

            <div className="room-head">
                <h1 className="room-title">{title}</h1>
                {hint && <p className="room-hint">{hint}</p>}
            </div>

            {children}
        </div>
    );
}

export default RoomShell;
