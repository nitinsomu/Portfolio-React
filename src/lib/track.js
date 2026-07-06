// Privacy-friendly event tracking. No-ops unless an analytics provider
// (e.g. Plausible's script) is present on the page — safe to call anywhere.
export function track(name, props) {
    try {
        if (window.plausible) window.plausible(name, props ? { props } : undefined);
    } catch {
        /* analytics must never break the site */
    }
}
