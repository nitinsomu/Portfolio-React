import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { track } from "../lib/track";

const SECTIONS = [
    { id: "home", label: "Home" },
    { id: "terminal", label: "Terminal" },
    { id: "about", label: "About" },
    { id: "exp", label: "Experience" },
    { id: "contact", label: "Contact" },
];

function Header() {
    const [active, setActive] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const toggle = () => {
            setTheme((t) => {
                const next = t === "dark" ? "light" : "dark";
                track("theme_change", { theme: next });
                return next;
            });
        };
        window.addEventListener("theme-toggle", toggle);
        return () => window.removeEventListener("theme-toggle", toggle);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActive(entry.target.id);
                }
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );
        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    function go(e, id) {
        e.preventDefault();
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            <a className="skip-link" href="#terminal">skip to content</a>
            <motion.div className="scroll-progress" style={{ scaleX: progress }} />
            <nav className="navbar" aria-label="Main navigation">
                <div className="nav-pill">
                    <a href="#home" className="nav-logo" onClick={(e) => go(e, "home")} aria-label="Home">
                        <span className="nav-logo-mark">ns</span>
                    </a>
                    <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                        {SECTIONS.map(({ id, label }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={active === id ? "active" : ""}
                                    aria-current={active === id ? "true" : undefined}
                                    onClick={(e) => go(e, id)}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="nav-iconbtn nav-palette-btn"
                        onClick={() => window.dispatchEvent(new CustomEvent("palette-open"))}
                        aria-label="Open command palette"
                        title="Command palette (Ctrl+K)"
                    >
                        ⌘K
                    </button>
                    <button
                        className="nav-iconbtn nav-theme-btn"
                        onClick={() => window.dispatchEvent(new CustomEvent("theme-toggle"))}
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                        title="Toggle theme"
                    >
                        {theme === "dark" ? "☀" : "☾"}
                    </button>
                    <button
                        className="nav-iconbtn nav-burger"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </nav>
        </>
    );
}

export default Header;
