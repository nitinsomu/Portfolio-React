import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGame, furthestRoom } from "../escape/GameContext";
import Flashlight from "../escape/Flashlight";

export default function Landing() {
    const { game, start } = useGame();
    const navigate = useNavigate();
    const resume = game.startedAt && !game.escapedAt;

    function enter() {
        start();
        navigate(game.startedAt ? furthestRoom(game) : "/lobby");
    }

    return (
        <div className="room landing">
            <Flashlight radius={420} />
            <motion.div
                className="landing-inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <p className="landing-kicker">nitinsomu.netlify.app presents</p>
                <h1 className="landing-title" data-text="ROOM 404">
                    ROOM<span className="landing-404">404</span>
                </h1>
                <p className="landing-sub">
                    a portfolio you have to <em>escape from</em>
                </p>
                <p className="landing-brief">
                    You wake up locked inside the workspace of one
                    <strong> Nitin Somu</strong> — software engineer, last seen
                    building RAG pipelines. Search the rooms. Move things.
                    Crack the locks. The only way out is through everything
                    he's done.
                </p>
                <div className="landing-cta">
                    <button className="btn-escape" onClick={enter}>
                        {resume ? "RESUME ▸" : "ENTER THE ROOM ▸"}
                    </button>
                    <Link to="/dossier" className="landing-skip">
                        in a hurry? read the case file →
                    </Link>
                </div>
                <p className="landing-foot">est. escape time: 3 minutes · no jump scares · one hidden treasure</p>
            </motion.div>
        </div>
    );
}
