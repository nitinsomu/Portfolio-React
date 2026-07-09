import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RoomShell from "../escape/RoomShell";
import { useGame, RoomGuard } from "../escape/GameContext";
import { toast } from "../components/ToastHost";
import { track } from "../lib/track";
import awsBadge from "../assets/logos/aws-ccp-badge.png";

function fmt(ms) {
    const s = Math.floor(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function VaultRoom() {
    const { game, escape, reset } = useGame();

    useEffect(() => {
        escape();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const time = game.escapedAt ? fmt(game.escapedAt - game.startedAt) : "--:--";

    return (
        <RoomShell current="vault" title="The Exit" flashlight={false}>
            <motion.div
                className="scene vault-scene"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <p className="vault-kicker">door unlocked</p>
                <h2 className="vault-title">YOU ESCAPED</h2>
                <p className="vault-time">escape time — <strong>{time}</strong></p>

                <div className="vault-debrief">
                    <p>
                        You now know the subject: <strong>Nitin Somu</strong> —
                        Technology Analyst at Morgan Stanley, formerly Nasdaq,
                        Barclays and Bosch. Builds RAG pipelines and agentic
                        applications with Python. AWS certified:
                    </p>
                    <img className="vault-badge" src={awsBadge} alt="AWS Certified Cloud Practitioner" />
                </div>

                <div className="vault-actions">
                    <button
                        className="btn-escape"
                        onClick={async () => {
                            await navigator.clipboard.writeText("nitin.somu13@gmail.com");
                            toast("email copied to clipboard");
                            track("email_copy", { source: "vault" });
                        }}
                    >
                        RECRUIT THE SUBJECT ▸ copy email
                    </button>
                    <div className="vault-links">
                        <a href="https://github.com/nitinsomu" target="_blank" rel="noopener noreferrer">github ↗</a>
                        <a href="https://linkedin.com/in/nitinsomu" target="_blank" rel="noopener noreferrer">linkedin ↗</a>
                        <Link to="/dossier">full case file →</Link>
                    </div>
                    <Link to="/" className="vault-replay" onClick={reset}>
                        ↻ lock the doors and play again
                    </Link>
                </div>

                <p className="vault-secret">
                    psst — did you find the treasure in his laptop terminal? if not, the study remembers.
                </p>
            </motion.div>
        </RoomShell>
    );
}

export default function Vault() {
    return (
        <RoomGuard need="lab">
            <VaultRoom />
        </RoomGuard>
    );
}
