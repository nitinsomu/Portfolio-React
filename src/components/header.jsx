import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const SECTIONS = [
    { id: "home", label: "Home" },
    { id: "terminal", label: "Terminal" },
    { id: "about", label: "About" },
    { id: "exp", label: "Experience" },
    { id: "contact", label: "Contact" },
];

function Header() {
    const [active, setActive] = useState("home");
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

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
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            <motion.div className="scroll-progress" style={{ scaleX: progress }} />
            <nav className="navbar" aria-label="Main navigation">
                <div className="nav-pill">
                    <a href="#home" className="nav-logo" onClick={(e) => go(e, "home")}>
                        <span className="nav-logo-mark">ns</span>
                    </a>
                    <ul className="nav-links">
                        {SECTIONS.map(({ id, label }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={active === id ? "active" : ""}
                                    onClick={(e) => go(e, id)}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;
