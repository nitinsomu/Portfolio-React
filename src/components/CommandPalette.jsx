import React, { useEffect, useMemo, useRef, useState } from "react";
import { track } from "../lib/track";
import { toast } from "./ToastHost";

const ACCENTS = [
    { label: "cyan", value: "#22d3ee" },
    { label: "mint", value: "#34d399" },
    { label: "amber", value: "#fbbf24" },
    { label: "pink", value: "#f472b6" },
];

function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function buildActions() {
    return [
        ...["home", "terminal", "about", "exp", "contact"].map((id) => ({
            id: `go-${id}`,
            label: `Go to ${id === "exp" ? "experience" : id}`,
            hint: "navigate",
            run: () => goTo(id),
        })),
        {
            id: "copy-email",
            label: "Copy email address",
            hint: "nitin.somu13@gmail.com",
            run: async () => {
                await navigator.clipboard.writeText("nitin.somu13@gmail.com");
                toast("email copied to clipboard");
                track("email_copy", { source: "palette" });
            },
        },
        {
            id: "open-github",
            label: "Open GitHub",
            hint: "github.com/nitinsomu",
            run: () => window.open("https://github.com/nitinsomu", "_blank", "noopener"),
        },
        {
            id: "open-linkedin",
            label: "Open LinkedIn",
            hint: "linkedin.com/in/nitinsomu",
            run: () => window.open("https://linkedin.com/in/nitinsomu", "_blank", "noopener"),
        },
        {
            id: "matrix",
            label: "Toggle matrix mode",
            hint: "wake up, neo",
            run: () => {
                window.dispatchEvent(new CustomEvent("matrix-toggle"));
                track("matrix_toggle", { source: "palette" });
            },
        },
        {
            id: "theme",
            label: "Toggle light / dark theme",
            hint: "appearance",
            run: () => window.dispatchEvent(new CustomEvent("theme-toggle")),
        },
        ...ACCENTS.map((a) => ({
            id: `accent-${a.label}`,
            label: `Accent: ${a.label}`,
            hint: a.value,
            swatch: a.value,
            run: () => {
                document.documentElement.style.setProperty("--accent", a.value);
                track("accent_change", { color: a.label });
            },
        })),
    ];
}

function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef(null);

    const actions = useMemo(() => buildActions(), []);
    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return actions;
        return actions.filter(
            (a) => a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q)
        );
    }, [query, actions]);

    useEffect(() => {
        function onKey(e) {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((v) => {
                    if (!v) track("palette_open");
                    return !v;
                });
                setQuery("");
                setCursor(0);
            } else if (e.key === "Escape") {
                setOpen(false);
            }
        }
        window.addEventListener("keydown", onKey);
        const openViaEvent = () => { setOpen(true); setQuery(""); setCursor(0); track("palette_open"); };
        window.addEventListener("palette-open", openViaEvent);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("palette-open", openViaEvent);
        };
    }, []);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    if (!open) return null;

    function runAction(a) {
        setOpen(false);
        a.run();
    }

    function onKeyDown(e) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setCursor((c) => Math.min(c + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setCursor((c) => Math.max(c - 1, 0));
        } else if (e.key === "Enter" && results[cursor]) {
            runAction(results[cursor]);
        }
    }

    return (
        <div className="palette-overlay" onClick={() => setOpen(false)}>
            <div
                className="palette"
                role="dialog"
                aria-label="Command palette"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="palette-inputrow">
                    <span className="tprompt">›</span>
                    <input
                        ref={inputRef}
                        value={query}
                        placeholder="type a command…"
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setCursor(0);
                        }}
                        onKeyDown={onKeyDown}
                        aria-label="Search commands"
                    />
                    <kbd>esc</kbd>
                </div>
                <ul className="palette-list" role="listbox">
                    {results.length === 0 && (
                        <li className="palette-empty">no matching commands — try the terminal 👀</li>
                    )}
                    {results.map((a, i) => (
                        <li key={a.id} role="option" aria-selected={i === cursor}>
                            <button
                                className={`palette-item ${i === cursor ? "active" : ""}`}
                                onMouseEnter={() => setCursor(i)}
                                onClick={() => runAction(a)}
                            >
                                {a.swatch && <span className="palette-swatch" style={{ background: a.swatch }} />}
                                <span>{a.label}</span>
                                <span className="palette-hint">{a.hint}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CommandPalette;
