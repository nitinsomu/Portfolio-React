import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { track } from "../lib/track";

const BANNER = [
    "nitin@portfolio:~$ ./welcome.sh",
    "booting nitin_os v2.0 ... done",
    "type 'help' to see commands. rumor has it there's treasure in here.",
];

const HELP = [
    "available commands:",
    "  ls [-a]        list files (some are hidden...)",
    "  cd <dir>       change directory (cd .. to go up)",
    "  cat <file>     read a file",
    "  mkdir <dir>    create a directory",
    "  rm <name>      remove a file or directory",
    "  pwd, tree, whoami, matrix, date, clear",
    "",
    "⚔ side quest: secrets/ is locked. find the key, unlock it,",
    "  and read what's inside. explorers are rewarded.",
];

const TREASURE = [
    "┌──────────────────────────────────────────────┐",
    "│  🏆 QUEST COMPLETE                           │",
    "│                                              │",
    "│  you found the treasure. most visitors      │",
    "│  never even open the terminal — you         │",
    "│  explored, dug for hidden files and         │",
    "│  cracked the lock. we'd get along.          │",
    "│                                              │",
    "│  mention 'open-sesame' when you email me    │",
    "│  and you'll have my full attention.         │",
    "└──────────────────────────────────────────────┘",
];

// dirs are plain objects; files are arrays of lines
function makeFs() {
    return {
        "experience": {
            "morgan-stanley.txt": ["Technology Analyst — Morgan Stanley, Bengaluru", "Aug 2025 — Present"],
            "nasdaq.txt": ["Quality Assurance Intern — Nasdaq, Bengaluru", "Jan — Jun 2025"],
            "barclays.txt": ["Technology Summer Intern — Barclays, Pune", "Jun — Jul 2024"],
            "bosch.txt": ["Project Intern — Bosch, Bengaluru", "Aug — Sep 2023"],
        },
        "skills": {
            "languages.txt": ["C, C++, Python, Java, JavaScript"],
            "web.txt": ["HTML, CSS, React, Flask, MySQL"],
            "data.txt": ["pandas, scikit-learn"],
            "cloud.txt": ["AWS, Docker, Kubernetes, Grafana, Prometheus, Git"],
            "ai.txt": ["RAG & agentic applications", "Claude Agent SDK, LlamaIndex, Phoenix, DeepEval, Snowflake Cortex"],
        },
        "certs": {
            "aws.txt": ["AWS Certified Cloud Practitioner — Amazon Web Services ✓"],
        },
        "secrets": {
            "treasure.txt": TREASURE,
        },
        "contact.txt": [
            "email    : nitin.somu13@gmail.com",
            "github   : github.com/nitinsomu",
            "linkedin : linkedin.com/in/nitinsomu",
        ],
        ".key": ["found a key: 'open-sesame'", "usage: unlock open-sesame"],
    };
}

const isDir = (node) => node && !Array.isArray(node);

function Terminal() {
    const [lines, setLines] = useState(BANNER);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([]);
    const [histIdx, setHistIdx] = useState(-1);
    const [path, setPath] = useState([]); // [] = home
    const [unlocked, setUnlocked] = useState(false);
    const fsRef = useRef(makeFs());
    const inputRef = useRef(null);
    const bodyRef = useRef(null);

    useEffect(() => {
        bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
    }, [lines]);

    const cwdName = path.length ? `~/${path.join("/")}` : "~";
    const prompt = `nitin@portfolio:${cwdName}$`;

    function cwdNode() {
        return path.reduce((node, seg) => node[seg], fsRef.current);
    }

    function execute(raw) {
        const parts = raw.trim().split(/\s+/);
        const cmd = (parts[0] || "").toLowerCase();
        const arg = parts.filter((p) => !p.startsWith("-")).slice(1).join(" ");
        const here = cwdNode();

        switch (cmd) {
            case "":
                return [];
            case "help":
                return HELP;
            case "whoami":
                return [
                    "Nitin Somu — Technology Analyst @ Morgan Stanley",
                    "CS engineer building RAG and agentic AI applications",
                    "with Python across backend and cloud.",
                ];
            case "date":
                return [new Date().toString()];
            case "pwd":
                return [path.length ? `/home/nitin/${path.join("/")}` : "/home/nitin"];
            case "sudo":
                return ["nice try. permission denied :)"];
            case "echo":
                return [arg || ""];
            case "matrix":
                window.dispatchEvent(new CustomEvent("matrix-toggle"));
                track("matrix_toggle", { source: "terminal" });
                return ["matrix mode toggled. wake up, neo."];
            case "ls": {
                const all = parts.includes("-a");
                const names = Object.keys(here)
                    .filter((n) => all || !n.startsWith("."))
                    .map((n) => {
                        if (!isDir(here[n])) return n;
                        if (n === "secrets" && !unlocked) return "secrets/ [locked]";
                        return `${n}/`;
                    });
                const prefix = all ? [".  .."] : [];
                return names.length || prefix.length ? [...prefix, names.join("  ")] : ["(empty)"];
            }
            case "tree": {
                const out = ["."];
                const walk = (node, indent) => {
                    Object.keys(node).filter((n) => !n.startsWith(".")).forEach((n) => {
                        out.push(`${indent}├── ${n}${isDir(node[n]) ? "/" : ""}`);
                        if (isDir(node[n])) walk(node[n], indent + "│   ");
                    });
                };
                walk(here, "");
                return out;
            }
            case "cd": {
                if (!arg || arg === "~" || arg === "/") { setPath([]); return []; }
                if (arg === "..") { setPath((p) => p.slice(0, -1)); return []; }
                const target = arg.replace(/\/$/, "");
                const node = here[target];
                if (!isDir(node)) return [`cd: no such directory: ${arg}`];
                if (target === "secrets" && !unlocked)
                    return ["🔒 secrets/ is locked.", "a key is hidden somewhere in the home directory.", "hint: not all files are visible. (try 'ls -a')"];
                setPath((p) => [...p, target]);
                return [];
            }
            case "cat": {
                const f = arg.replace(/^\.\//, "");
                const node = here[f];
                if (node === TREASURE) track("quest_complete");
                if (Array.isArray(node)) return node;
                if (isDir(node)) return [`cat: ${f}: is a directory`];
                return [`cat: ${f || "file"}: no such file`];
            }
            case "mkdir": {
                if (!arg) return ["mkdir: missing operand"];
                const name = arg.replace(/\/$/, "");
                if (here[name] !== undefined) return [`mkdir: cannot create '${name}': already exists`];
                here[name] = {};
                return [];
            }
            case "rm": {
                if (raw.replace(/\s+/g, " ").includes("-rf /"))
                    return ["deleting / ...", "deleting /home ...", "...", "just kidding. some things are sacred."];
                if (!arg) return ["rm: missing operand"];
                const name = arg.replace(/\/$/, "");
                if (here[name] === undefined) return [`rm: cannot remove '${name}': no such file or directory`];
                if (name === "secrets" || (path[0] === "secrets" && name === "treasure.txt"))
                    return [`rm: cannot remove '${name}': the treasure is protected by ancient magic`];
                if (isDir(here[name]) && !parts.includes("-r") && !parts.includes("-rf"))
                    return [`rm: cannot remove '${name}': is a directory (use rm -r)`];
                delete here[name];
                return [];
            }
            case "touch": {
                if (!arg) return ["touch: missing operand"];
                if (cwdNode()[arg] === undefined) cwdNode()[arg] = [""];
                return [];
            }
            case "unlock": {
                if (arg === "open-sesame") {
                    if (unlocked) return ["secrets/ is already unlocked."];
                    setUnlocked(true);
                    track("quest_unlock");
                    return ["🔓 secrets/ unlocked. one step closer to the treasure...", "(cd secrets)"];
                }
                return [`unlock: wrong key${arg ? `: '${arg}'` : ""}. keep looking.`];
            }
            default:
                return [`command not found: ${cmd} — try 'help'`];
        }
    }

    function run(raw) {
        const echo = `${prompt} ${raw}`;
        if (raw.trim().toLowerCase() === "clear") return setLines([]);
        const out = execute(raw);
        setLines((l) => [...l, echo, ...(out || [])]);
        if (raw.trim()) setHistory((h) => [raw, ...h]);
    }

    function onKeyDown(e) {
        if (e.key === "Enter") {
            run(input);
            setInput("");
            setHistIdx(-1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const i = Math.min(histIdx + 1, history.length - 1);
            if (history[i]) { setHistIdx(i); setInput(history[i]); }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const i = histIdx - 1;
            setHistIdx(i);
            setInput(i >= 0 ? history[i] : "");
        } else if (e.key === "Tab") {
            e.preventDefault();
            const last = input.split(/\s+/).pop();
            if (!last) return;
            const match = Object.keys(cwdNode()).find((n) => n.startsWith(last));
            if (match) setInput(input.slice(0, input.length - last.length) + match);
        }
    }

    return (
        <section id="terminal" className="section">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
            >
                <span className="section-index">01</span>
                <span className="glitch" data-text="Terminal">Terminal</span>
            </motion.h2>

            <motion.div
                className="terminal"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                onClick={() => inputRef.current?.focus()}
            >
                <div className="terminal-bar">
                    <span className="tdot red" />
                    <span className="tdot yellow" />
                    <span className="tdot green" />
                    <span className="terminal-title">nitin@portfolio — zsh {unlocked && "· 🔓"}</span>
                </div>
                <div className="terminal-body" ref={bodyRef} role="log" aria-live="polite">
                    {lines.map((line, i) => (
                        <div
                            key={i}
                            className={line.startsWith("nitin@portfolio") ? "tline tline-cmd" : "tline"}
                        >
                            {line}
                        </div>
                    ))}
                    <div className="tline tline-input">
                        <span className="tprompt">{prompt}</span>
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            spellCheck="false"
                            autoComplete="off"
                            aria-label="Terminal input"
                        />
                    </div>
                </div>
            </motion.div>
            <p className="terminal-hint">click the terminal and type <code>help</code> — there&apos;s a hidden quest 👀</p>
        </section>
    );
}

export default Terminal;
