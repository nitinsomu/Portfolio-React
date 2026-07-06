import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const ROLES = [
    "RAG pipelines",
    "agentic applications",
    "backend systems",
    "machine learning pipelines",
    "cloud infrastructure",
];

function useTypewriter(words) {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const word = words[index % words.length];
        const delay = deleting ? 40 : text === word ? 1800 : 75;
        const t = setTimeout(() => {
            if (!deleting && text === word) setDeleting(true);
            else if (deleting && text === "") {
                setDeleting(false);
                setIndex((i) => i + 1);
            } else {
                setText(word.slice(0, text.length + (deleting ? -1 : 1)));
            }
        }, delay);
        return () => clearTimeout(t);
    }, [text, deleting, index, words]);

    return text;
}

// Hovered letters flip to the accent color.
function ScatterName({ text }) {
    return (
        <span className="hero-name" aria-label={text}>
            {text.split("").map((ch, i) =>
                ch === " " ? (
                    <span key={i}>&nbsp;</span>
                ) : (
                    <span key={i} className="hero-letter">
                        {ch}
                    </span>
                )
            )}
        </span>
    );
}

function Introduction() {
    const typed = useTypewriter(ROLES);
    const ref = useRef(null);
    const heroRef = useRef(null);
    const hintRef = useRef(null);

    // fade + shrink the hero as it scrolls away
    useEffect(() => {
        let raf = 0;
        function update() {
            raf = 0;
            const heroH = heroRef.current?.offsetHeight || window.innerHeight;
            const t = Math.min(window.scrollY / (heroH * 0.6), 1);
            if (ref.current) {
                ref.current.style.opacity = String(1 - t);
                ref.current.style.transform = `scale(${1 - t * 0.04})`;
            }
            if (hintRef.current) hintRef.current.style.opacity = String(1 - t);
        }
        function onScroll() {
            if (!raf) raf = requestAnimationFrame(update);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section id="home" className="hero" ref={heroRef}>
            {/* outer div: scroll-linked fade; inner div: entrance animation.
                They must be separate or the entrance animation pins opacity. */}
            <div className="hero-inner" ref={ref}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="hero-badge">
                    <span className="pulse-dot" />
                    Technology Analyst @ Morgan Stanley
                </div>

                <h1 className="hero-title">
                    <span className="hero-hello">Hi, I&apos;m</span>
                    <ScatterName text="Nitin Somu" />
                </h1>

                <p className="hero-typeline">
                    <span className="prompt">$</span> I build{" "}
                    <span className="typed">{typed}</span>
                    <span className="caret" aria-hidden="true" />
                </p>

                <p className="hero-info">
                    Computer science engineer who likes hard problems and clean
                    systems — building RAG and agentic AI applications with
                    Python, on strong foundations in data structures,
                    algorithms and cloud.
                </p>

                <div className="hero-cta">
                    <Magnetic>
                        <a
                            href="#about"
                            className="btn btn-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            About me
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href="https://github.com/nitinsomu" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                            GitHub ↗
                        </a>
                    </Magnetic>
                </div>
            </motion.div>
            </div>

            <div className="scroll-hint" ref={hintRef} aria-hidden="true">
                <span className="scroll-mouse" />
                scroll
            </div>
        </section>
    );
}

export default Introduction;
