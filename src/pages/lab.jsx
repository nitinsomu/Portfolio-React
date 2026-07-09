import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomShell from "../escape/RoomShell";
import { useGame, RoomGuard } from "../escape/GameContext";
import images from "../assets/images";

const AI_STACK = ["LlamaIndex", "Claude Agent SDK", "DeepEval"];
const POOL = [
    "Python", "Java", "JavaScript", "React", "AWS", "Docker", "Kubernetes",
    "MySQL", "Flask", "pandas", "Grafana", "Git",
    ...AI_STACK, "Snowflake Cortex", "Phoenix",
];
const R = 30; // orb radius
const GRAV = 0.45;
const BOUNCE = 0.72;

function LabRoom() {
    const { game, solve } = useGame();
    const navigate = useNavigate();
    const pitRef = useRef(null);
    const machineRef = useRef(null);
    const orbsRef = useRef([]);
    const heldRef = useRef(null); // { i, lastX, lastY, vx, vy }
    const [fed, setFed] = useState([]);
    const [reject, setReject] = useState(null);
    const fedRef = useRef([]);
    const solvedRef = useRef(game.lab);

    useEffect(() => {
        const pit = pitRef.current;
        const { width, height } = pit.getBoundingClientRect();

        orbsRef.current = POOL.map((name, i) => {
            const el = pit.querySelector(`[data-orb="${i}"]`);
            return {
                name,
                el,
                x: 60 + Math.random() * (width - 120),
                y: -50 - Math.random() * 500,
                vx: (Math.random() - 0.5) * 6,
                vy: 0,
                dead: false,
            };
        });

        let anim;
        function step() {
            const rect = pit.getBoundingClientRect();
            const W = rect.width, H = rect.height;
            const orbs = orbsRef.current;

            for (let i = 0; i < orbs.length; i++) {
                const o = orbs[i];
                if (o.dead) continue;
                if (heldRef.current?.i === i) continue;
                o.vy += GRAV;
                o.x += o.vx;
                o.y += o.vy;
                if (o.y > H - R) { o.y = H - R; o.vy *= -BOUNCE; o.vx *= 0.96; }
                if (o.x < R) { o.x = R; o.vx *= -BOUNCE; }
                if (o.x > W - R) { o.x = W - R; o.vx *= -BOUNCE; }
            }
            // orb-orb collisions
            for (let i = 0; i < orbs.length; i++) {
                for (let j = i + 1; j < orbs.length; j++) {
                    const a = orbs[i], b = orbs[j];
                    if (a.dead || b.dead) continue;
                    const dx = b.x - a.x, dy = b.y - a.y;
                    const d = Math.hypot(dx, dy);
                    if (d > 0 && d < R * 2) {
                        const nx = dx / d, ny = dy / d;
                        const overlap = (R * 2 - d) / 2;
                        if (heldRef.current?.i !== i) { a.x -= nx * overlap; a.y -= ny * overlap; }
                        if (heldRef.current?.i !== j) { b.x += nx * overlap; b.y += ny * overlap; }
                        const rel = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
                        if (rel > 0) {
                            const imp = rel * 0.8;
                            if (heldRef.current?.i !== i) { a.vx -= imp * nx; a.vy -= imp * ny; }
                            if (heldRef.current?.i !== j) { b.vx += imp * nx; b.vy += imp * ny; }
                        }
                    }
                }
            }
            for (const o of orbs) {
                if (o.dead) { o.el.style.display = "none"; continue; }
                o.el.style.transform = `translate(${o.x - R}px, ${o.y - R}px)`;
            }
            anim = requestAnimationFrame(step);
        }
        anim = requestAnimationFrame(step);
        return () => cancelAnimationFrame(anim);
    }, []);

    function down(e, i) {
        const rect = pitRef.current.getBoundingClientRect();
        heldRef.current = { i, lastX: e.clientX, lastY: e.clientY, vx: 0, vy: 0 };
        const o = orbsRef.current[i];
        o.x = e.clientX - rect.left;
        o.y = e.clientY - rect.top;
        e.currentTarget.setPointerCapture(e.pointerId);
    }
    function move(e) {
        const h = heldRef.current;
        if (!h) return;
        const rect = pitRef.current.getBoundingClientRect();
        const o = orbsRef.current[h.i];
        h.vx = (e.clientX - h.lastX) * 0.9;
        h.vy = (e.clientY - h.lastY) * 0.9;
        h.lastX = e.clientX; h.lastY = e.clientY;
        o.x = e.clientX - rect.left;
        o.y = e.clientY - rect.top;
    }
    function up(e) {
        const h = heldRef.current;
        if (!h) return;
        heldRef.current = null;
        const o = orbsRef.current[h.i];
        o.vx = h.vx; o.vy = h.vy;

        // dropped on the machine intake?
        const mr = machineRef.current.getBoundingClientRect();
        if (e.clientX >= mr.left && e.clientX <= mr.right && e.clientY >= mr.top && e.clientY <= mr.bottom) {
            if (AI_STACK.includes(o.name) && !fedRef.current.includes(o.name)) {
                o.dead = true;
                fedRef.current = [...fedRef.current, o.name];
                setFed(fedRef.current);
                if (fedRef.current.length === AI_STACK.length && !solvedRef.current) {
                    solvedRef.current = true;
                    setTimeout(() => solve("lab"), 600);
                }
            } else {
                // machine spits it out
                o.vx = -14 - Math.random() * 6;
                o.vy = -16;
                setReject(o.name);
                setTimeout(() => setReject(null), 1400);
            }
        }
    }

    const solved = game.lab;

    return (
        <RoomShell
            current="lab"
            title="The Lab"
            hint="His skills, loose in the pit. The machine on the right runs on an AI stack — feed it the right three parts. Throw the rest around, it's fine."
        >
            <div className="scene lab-scene">
                <div className="pit" ref={pitRef}>
                    {POOL.map((name, i) => (
                        <div
                            key={name}
                            data-orb={i}
                            className={`orb ${AI_STACK.includes(name) ? "orb-ai" : ""}`}
                            title={name}
                            onPointerDown={(e) => down(e, i)}
                            onPointerMove={move}
                            onPointerUp={up}
                            onPointerCancel={up}
                        >
                            {images[name] ? <img src={images[name]} alt={name} draggable="false" /> : <span>{name.slice(0, 2)}</span>}
                        </div>
                    ))}
                </div>

                <div className={`machine ${solved ? "solved" : ""}`} ref={machineRef}>
                    <p className="machine-title">RAG-O-MATIC 3000</p>
                    <p className="machine-sub">required parts:</p>
                    <ul className="machine-list">
                        {AI_STACK.map((n) => (
                            <li key={n} className={fed.includes(n) ? "done" : ""}>
                                {fed.includes(n) ? "✓" : "○"} {n}
                            </li>
                        ))}
                    </ul>
                    <div className="machine-intake">{solved ? "ONLINE" : "DROP PARTS HERE"}</div>
                    {reject && <p className="machine-reject">"{reject}"? not in this pipeline. REJECTED.</p>}
                    {solved && (
                        <button className="btn-escape door-go" onClick={() => navigate("/vault")}>
                            MACHINE ONLINE → THE EXIT
                        </button>
                    )}
                </div>
            </div>
        </RoomShell>
    );
}

export default function Lab() {
    return (
        <RoomGuard need="archives">
            <LabRoom />
        </RoomGuard>
    );
}
