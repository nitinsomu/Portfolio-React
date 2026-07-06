// Privacy-friendly event tracking. No-ops unless an analytics provider's
// script is present on the page — safe to call anywhere.
// Supports: Plausible, Umami, GoatCounter. Add whichever script you
// prefer to index.html and events start flowing, no code changes.
export function track(name, props) {
    try {
        if (window.plausible) window.plausible(name, props ? { props } : undefined);
        if (window.umami?.track) window.umami.track(name, props);
        if (window.goatcounter?.count) window.goatcounter.count({ path: name, event: true });
    } catch {
        /* analytics must never break the site */
    }
}
