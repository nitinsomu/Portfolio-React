import React from "react";
import { Link } from "react-router-dom";
import Bento from "../components/Bento";
import Exp from "../components/exp";
import Terminal from "../components/Terminal";
import Footer from "../components/footer";

// The recruiter escape hatch: everything, no puzzles.
export default function Dossier() {
    return (
        <div className="page dossier">
            <header className="dossier-bar">
                <Link to="/" className="room-logo">ROOM 404</Link>
                <span className="dossier-label">CASE FILE — no puzzles, just the facts</span>
                <Link to="/" className="room-skip">← back to the room</Link>
            </header>
            <main>
                <Bento />
                <Exp />
                <Terminal />
                <Footer />
            </main>
        </div>
    );
}
