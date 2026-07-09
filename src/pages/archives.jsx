import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomShell from "../escape/RoomShell";
import { useGame, RoomGuard } from "../escape/GameContext";
import morganStanley from "../assets/logos/morgan-stanley.svg";
import nasdaq from "../assets/logos/nasdaq.svg";
import barclays from "../assets/logos/barclays.jpeg";
import bosch from "../assets/logos/bosch.svg";

// correct chronological order: bosch(0) barclays(1) nasdaq(2) ms(3)
const CARDS = [
    { id: "ms", company: "Morgan Stanley", role: "Technology Analyst", logo: morganStanley, order: 3 },
    { id: "bosch", company: "Bosch", role: "Project Intern", logo: bosch, order: 0 },
    { id: "nasdaq", company: "Nasdaq", role: "QA Intern", logo: nasdaq, order: 2 },
    { id: "barclays", company: "Barclays", role: "Tech Summer Intern", logo: barclays, order: 1 },
];

const SLOT_LABELS = ["2023", "2024", "early 2025", "now"];

function ArchivesRoom() {
    const { game, solve } = useGame();
    const navigate = useNavigate();
    // placement[slotIndex] = card id | null
    const [placement, setPlacement] = useState([null, null, null, null]);
    const [wrong, setWrong] = useState(false);
    const drag = useRef(null); // { id, dx, dy }
    const [dragPos, setDragPos] = useState(null);
    const slotRefs = useRef([]);
    const sceneRef = useRef(null);

    const placedIds = placement.filter(Boolean);
    const solved = game.archives;

    function down(e, id) {
        if (solved) return;
        const rect = e.currentTarget.getBoundingClientRect();
        drag.current = { id, dx: e.clientX - rect.left, dy: e.clientY - rect.top, w: rect.width, h: rect.height };
        // if it was in a slot, pull it out
        setPlacement((p) => p.map((c) => (c === id ? null : c)));
        setDragPos({ x: e.clientX, y: e.clientY });
        e.currentTarget.setPointerCapture?.(e.pointerId);
    }

    function move(e) {
        if (!drag.current) return;
        setDragPos({ x: e.clientX, y: e.clientY });
    }

    function up(e) {
        if (!drag.current) return;
        const { id } = drag.current;
        // find slot under pointer
        const hit = slotRefs.current.findIndex((el) => {
            if (!el) return false;
            const r = el.getBoundingClientRect();
            return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        });
        drag.current = null;
        setDragPos(null);
        if (hit >= 0 && !placement[hit]) {
            const next = placement.map((c, i) => (i === hit ? id : c));
            setPlacement(next);
            if (next.every(Boolean)) {
                const correct = next.every((cardId, slotIdx) => CARDS.find((c) => c.id === cardId).order === slotIdx);
                if (correct) solve("archives");
                else {
                    setWrong(true);
                    setTimeout(() => {
                        setWrong(false);
                        setPlacement([null, null, null, null]);
                    }, 900);
                }
            }
        }
    }

    function renderCard(card, inSlot) {
        const dragging = drag.current?.id === card.id && dragPos;
        return (
            <div
                key={card.id}
                className={`file-card ${inSlot ? "in-slot" : ""} ${dragging ? "held" : ""} ${solved ? "locked-in" : ""}`}
                style={
                    dragging
                        ? { position: "fixed", left: dragPos.x - drag.current.dx, top: dragPos.y - drag.current.dy, zIndex: 50 }
                        : undefined
                }
                onPointerDown={(e) => down(e, card.id)}
                onPointerMove={move}
                onPointerUp={up}
                onPointerCancel={up}
            >
                <span className="file-logo"><img src={card.logo} alt="" /></span>
                <span className="file-role">{card.role}</span>
                <span className="file-co">{card.company}</span>
            </div>
        );
    }

    return (
        <RoomShell
            current="archives"
            title="The Archives"
            hint="Four case files, out of order. File them on the timeline — oldest first — and the cabinet unlocks."
        >
            <div className={`scene archives-scene ${wrong ? "shake" : ""}`} ref={sceneRef}>
                <div className="file-pile">
                    {CARDS.filter((c) => !placedIds.includes(c.id)).map((c) => renderCard(c, false))}
                    {!solved && placedIds.length === 4 && null}
                </div>

                <div className="slot-row">
                    {SLOT_LABELS.map((label, i) => (
                        <div
                            key={label}
                            className={`slot ${placement[i] ? "filled" : ""}`}
                            ref={(el) => (slotRefs.current[i] = el)}
                        >
                            <span className="slot-label">{label}</span>
                            {placement[i] && renderCard(CARDS.find((c) => c.id === placement[i]), true)}
                        </div>
                    ))}
                </div>

                {wrong && <p className="room-wrong">that's not how time works. try again.</p>}
                {solved && (
                    <button className="btn-escape door-go" onClick={() => navigate("/lab")}>
                        CABINET UNLOCKED → THE LAB
                    </button>
                )}
            </div>
        </RoomShell>
    );
}

export default function Archives() {
    return (
        <RoomGuard need="lobby">
            <ArchivesRoom />
        </RoomGuard>
    );
}
