import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "./Magnetic";

const ROLES = [
    "RAG pipelines",
    "agentic applications",
    "backend systems",
    "machine learning",
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

    // fade + shrink the hero as it scrolls away
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

    return (
        <section id="home" className="hero" ref={heroRef}>
            <motion.div
                className="hero-inner"
                ref={ref}
                style={{ opacity, scale, y }}
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
                            See my work
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href="https://github.com/nitinsomu" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                            GitHub ↗
                        </a>
                    </Magnetic>
                </div>
            </motion.div>

            <div className="scroll-hint" aria-hidden="true">
                <span className="scroll-mouse" />
                scroll
            </div>
        </section>
    );
}

export default Introduction;
