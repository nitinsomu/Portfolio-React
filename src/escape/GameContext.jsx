import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { track } from "../lib/track";

const KEY = "room404-v1";
const initial = { startedAt: null, lobby: false, archives: false, lab: false, escapedAt: null };

const GameContext = createContext(null);

export function GameProvider({ children }) {
    const [game, setGame] = useState(() => {
        try {
            return { ...initial, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
        } catch {
            return initial;
        }
    });

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(game));
    }, [game]);

    const start = () => {
        track("room404_start");
        setGame((g) => ({ ...g, startedAt: g.startedAt || Date.now() }));
    };
    const solve = (room) => {
        track(`room404_${room}_solved`);
        setGame((g) => ({ ...g, [room]: true }));
    };
    const escape = () =>
        setGame((g) => {
            if (!g.escapedAt) track("room404_escaped");
            return { ...g, escapedAt: g.escapedAt || Date.now() };
        });
    const reset = () => setGame({ ...initial });

    return (
        <GameContext.Provider value={{ game, start, solve, escape, reset }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);

// Furthest room the player has legitimately reached.
export function furthestRoom(game) {
    if (!game.startedAt) return "/";
    if (!game.lobby) return "/lobby";
    if (!game.archives) return "/archives";
    if (!game.lab) return "/lab";
    return "/vault";
}

// Blocks a route until its prerequisite is met, bouncing the player
// back to wherever they actually are in the game.
export function RoomGuard({ need, children }) {
    const { game } = useGame();
    const ok = {
        started: !!game.startedAt,
        lobby: game.lobby,
        archives: game.archives,
        lab: game.lab,
    }[need];
    if (!ok) return <Navigate to={furthestRoom(game)} replace />;
    return children;
}
