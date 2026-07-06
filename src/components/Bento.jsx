import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import images from "../assets/images";
import awsBadge from "../assets/logos/aws-ccp-badge.png";

const THEMES = [
    { name: "cyan", a: "#22d3ee" },
    { name: "mint", a: "#34d399" },
    { name: "amber", a: "#fbbf24" },
    { name: "pink", a: "#f472b6" },
];

const SKILLS = Object.entries(images);
const ROW_A = SKILLS.slice(0, Math.ceil(SKILLS.length / 2));
const ROW_B = SKILLS.slice(Math.ceil(SKILLS.length / 2));

// Live GitHub stats, cached for an hour so the unauthenticated
// rate limit (60/hr) is never a problem.
function useGithub() {
    const [stats, setStats] = useState(null);
    useEffect(() => {
        const cached = sessionStorage.getItem("gh-stats");
        if (cached) {
            const { at, data } = JSON.parse(cached);
            if (Date.now() - at < 3600_000) return setStats(data);
        }
        fetch("https://api.github.com/users/nitinsomu")
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                if (!d) return;
                const data = { repos: d.public_repos, followers: d.followers };
                sessionStorage.setItem("gh-stats", JSON.stringify({ at: Date.now(), data }));
                setStats(data);
            })
            .catch(() => {});
    }, []);
    return stats;
}

function Clock() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
    return (
        <span className="bento-clock">
            {now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "Asia/Kolkata",
            })}
        </span>
    );
}

const tile = (i) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, delay: i * 0.07 },
});

function Bento() {
    const gh = useGithub();
    return (
        <section id="about" className="section">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
            >
                <span className="section-index">02</span>
                <span className="glitch" data-text="About">About</span>
            </motion.h2>

            <div className="bento">
                <motion.div className="bento-tile bento-about" {...tile(0)}>
                    <TiltCard className="bento-inner">
                        <p className="bento-label">// whoami</p>
                        <p className="bento-big">
                            Engineer who likes <em>hard problems</em> and clean
                            systems — building <em>RAG</em> and{" "}
                            <em>agentic AI</em> applications with Python across
                            backend and cloud.
                        </p>
                    </TiltCard>
                </motion.div>

                <motion.div className="bento-tile bento-now" {...tile(1)}>
                    <TiltCard className="bento-inner">
                        <p className="bento-label"><span className="pulse-dot" /> currently</p>
                        <p className="bento-strong">Technology Analyst</p>
                        <p className="bento-dim">Morgan Stanley · Bengaluru</p>
                    </TiltCard>
                </motion.div>

                <motion.div className="bento-tile bento-loc" {...tile(2)}>
                    <TiltCard className="bento-inner">
                        <p className="bento-label">// local time</p>
                        <Clock />
                        <p className="bento-dim">Bengaluru, IN · UTC+5:30</p>
                    </TiltCard>
                </motion.div>

                <motion.div className="bento-tile bento-gh" {...tile(3)}>
                    <TiltCard className="bento-inner">
                        <a href="https://github.com/nitinsomu" target="_blank" rel="noopener noreferrer" className="bento-linkfill">
                            <p className="bento-label">// github</p>
                            <p className="bento-strong">@nitinsomu ↗</p>
                            <p className="bento-dim">
                                {gh
                                    ? `${gh.repos} repos · ${gh.followers} followers`
                                    : "code lives here"}
                            </p>
                        </a>
                    </TiltCard>
                </motion.div>

                <motion.div className="bento-tile bento-cert" {...tile(4)}>
                    <TiltCard className="bento-inner">
                        <a
                            href="https://cp.certmetrics.com/amazon/en/public/verify/credential/13ddddf8301c41e69a2ac0ae79258e23"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bento-linkfill bento-cert-row"
                        >
                            <img
                                src={awsBadge}
                                alt="AWS Certified Cloud Practitioner"
                                loading="lazy"
                            />
                            <span>
                                <p className="bento-label">// certified</p>
                                <p className="bento-strong">AWS Cloud Practitioner</p>
                                <p className="bento-dim">verify ↗</p>
                            </span>
                        </a>
                    </TiltCard>
                </motion.div>

                <motion.div className="bento-tile bento-li" {...tile(5)}>
                    <TiltCard className="bento-inner">
                        <a href="https://linkedin.com/in/nitinsomu" target="_blank" rel="noopener noreferrer" className="bento-linkfill">
                            <p className="bento-label">// linkedin</p>
                            <p className="bento-strong">nitinsomu ↗</p>
                            <p className="bento-dim">let&apos;s connect</p>
                        </a>
                    </TiltCard>
                </motion.div>

                <motion.div className="bento-tile bento-theme" {...tile(6)}>
                    <TiltCard className="bento-inner">
                        <p className="bento-label">// vibe</p>
                        <div className="theme-swatches">
                            {THEMES.map((t) => (
                                <button
                                    key={t.name}
                                    className="theme-swatch"
                                    style={{ background: t.a }}
                                    aria-label={`${t.name} theme`}
                                    title={t.name}
                                    onClick={() => {
                                        document.documentElement.style.setProperty("--accent", t.a);
                                    }}
                                />
                            ))}
                        </div>
                        <p className="bento-dim">pick my site&apos;s colors</p>
                    </TiltCard>
                </motion.div>

                <motion.div className="bento-tile bento-skills" {...tile(7)}>
                    <div className="bento-inner marquee-tile">
                        <p className="bento-label">// arsenal</p>
                        <div className="marquee">
                            <div className="marquee-track">
                                {[...ROW_A, ...ROW_A].map(([name, src], i) => (
                                    <span className="marquee-item" key={name + i}>
                                        {src && <img src={src} alt="" loading="lazy" />} {name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="marquee">
                            <div className="marquee-track reverse">
                                {[...ROW_B, ...ROW_B].map(([name, src], i) => (
                                    <span className="marquee-item" key={name + i}>
                                        {src && <img src={src} alt="" loading="lazy" />} {name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Bento;
