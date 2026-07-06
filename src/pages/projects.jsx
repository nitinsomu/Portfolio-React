import { Link } from "react-router-dom";

export default function Projects() {
    return (
        <div className="page coming-soon">
            <p className="coming-mono">// projects.load()</p>
            <h2 className="coming-title">Coming Soon</h2>
            <p className="coming-sub">Something good is compiling…</p>
            <Link to="/" className="btn btn-primary">← Back home</Link>
        </div>
    )
}
