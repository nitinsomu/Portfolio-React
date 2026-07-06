import React, { useEffect, useState } from "react";

export function toast(message) {
    window.dispatchEvent(new CustomEvent("toast", { detail: message }));
}

function ToastHost() {
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        let timer;
        function onToast(e) {
            setMsg(e.detail);
            clearTimeout(timer);
            timer = setTimeout(() => setMsg(null), 2400);
        }
        window.addEventListener("toast", onToast);
        return () => {
            window.removeEventListener("toast", onToast);
            clearTimeout(timer);
        };
    }, []);

    if (!msg) return null;
    return (
        <div className="toast" role="status" aria-live="polite">
            <span className="tprompt">✓</span> {msg}
        </div>
    );
}

export default ToastHost;
