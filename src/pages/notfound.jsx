import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
    const { pathname } = useLocation();
    return (
        <div className="page coming-soon">
            <div className="terminal notfound-terminal" role="presentation">
                <div className="terminal-bar">
                    <span className="tdot red" />
                    <span className="tdot yellow" />
                    <span className="tdot green" />
                    <span className="terminal-title">nitin@portfolio — zsh</span>
                </div>
                <div className="terminal-body notfound-body">
                    <div className="tline tline-cmd">nitin@portfolio:~$ cd {pathname}</div>
                    <div className="tline">cd: no such directory: {pathname}</div>
                    <div className="tline">&nbsp;</div>
                    <div className="tline notfound-code">404: route not found</div>
                    <div className="tline">try &apos;cd ~&apos; to get back home.</div>
                </div>
            </div>
            <Link to="/" className="btn btn-primary">cd ~</Link>
        </div>
    );
}
