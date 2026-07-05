import React from "react";
import { motion } from "framer-motion";

const EXPERIENCE = [
    {
        role: "Technology Analyst",
        company: "Morgan Stanley",
        location: "Bengaluru",
        duration: "Aug 2025 — Present",
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Morgan_Stanley_Logo_1.svg",
        url: "https://www.morganstanley.com/",
        current: true,
    },
    {
        role: "Quality Assurance Intern",
        company: "Nasdaq",
        location: "Bengaluru",
        duration: "Jan — Jun 2025",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/NASDAQ_logo.svg",
        url: "https://www.nasdaq.com/",
    },
    {
        role: "Technology Summer Intern",
        company: "Barclays",
        location: "Pune",
        duration: "Jun — Jul 2024",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Barclays_logo.jpeg",
        url: "https://home.barclays/",
    },
    {
        role: "Project Intern",
        company: "Bosch",
        location: "Bengaluru",
        duration: "Aug — Sep 2023",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/16/Bosch-logo.svg",
        url: "https://www.bosch.in/",
    },
];

// Cards are position:sticky with staggered top offsets, so scrolling
// stacks them into a deck; each later card slides over the previous.
function Exp() {
    return (
        <section id="exp" className="section">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
            >
                <span className="section-index">03</span>
                <span className="glitch" data-text="Experience">Experience</span>
            </motion.h2>

            <div className="deck">
                {EXPERIENCE.map((job, i) => (
                    <div
                        className="deck-slot"
                        key={job.company + job.role}
                        style={{ "--i": i }}
                    >
                        <motion.div
                            className="deck-card"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <a href={job.url} target="_blank" rel="noopener noreferrer" className="deck-link">
                                <span className="deck-index">0{i + 1}</span>
                                <div className="exp-logo-wrap">
                                    <img src={job.logo} alt={job.company} loading="lazy" />
                                </div>
                                <div className="exp-body">
                                    <div className="exp-top">
                                        <h3>{job.role}</h3>
                                        {job.current && <span className="chip chip-live">Now</span>}
                                    </div>
                                    <p className="exp-company">{job.company} · {job.location}</p>
                                    <p className="exp-duration">{job.duration}</p>
                                </div>
                                <span className="deck-arrow" aria-hidden="true">↗</span>
                            </a>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Exp;
