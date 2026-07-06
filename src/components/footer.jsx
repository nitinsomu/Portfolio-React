import React from "react";
import { motion } from "framer-motion";
import icons from "../assets/icons";
import Magnetic from "./Magnetic";
import { toast } from "./ToastHost";
import { track } from "../lib/track";

function Footer() {
    const year = new Date().getFullYear();
    return (
        <section id="contact" className="section contact-section">
            <motion.div
                className="contact-inner"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
            >
                <p className="contact-kicker">
                    <span className="section-index">04</span>
                    <span className="glitch" data-text="Contact">Contact</span>
                </p>
                <h2 className="contact-title">Let&apos;s build something.</h2>
                <p className="contact-sub">
                    Open to interesting problems, collaborations and good conversations.
                </p>
                <div className="contact-mail-wrap">
                    <Magnetic>
                        <button
                            className="btn btn-primary contact-mail"
                            onClick={async () => {
                                await navigator.clipboard.writeText("nitin.somu13@gmail.com");
                                toast("email copied to clipboard");
                                track("email_copy", { source: "contact" });
                            }}
                        >
                            nitin.somu13@gmail.com
                        </button>
                    </Magnetic>
                </div>
                <a href="mailto:nitin.somu13@gmail.com" className="contact-mailto">
                    or open your mail app ↗
                </a>
                <div className="contact-socials">
                    <a href="https://github.com/nitinsomu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <img className="icon" src={icons.Github} alt="GitHub" />
                    </a>
                    <a href="https://linkedin.com/in/nitinsomu" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <img className="icon" src={icons.Linkedin} alt="LinkedIn" />
                    </a>
                </div>
            </motion.div>
            <footer className="footer-bar">
                <span>© {year} Nitin Somu</span>
                <span className="footer-mono">designed &amp; built with react</span>
            </footer>
        </section>
    );
}

export default Footer;
