import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../state/AppContext';


export default function Header() {
const { state } = useApp();
const { pathname } = useLocation();
const title = pathname === '/' ? 'Dashboard' : pathname.slice(1).replace(/^[a-z]/, c => c.toUpperCase());
return (
<header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
<div className="mx-auto max-w-md px-4 h-14 flex items-center justify-between">
<span className="font-semibold">{title}</span>
{state.user ? (
<Link to="/login" className="text-sm text-blue-600">Switch</Link>
) : null}
</div>
</header>
);
}