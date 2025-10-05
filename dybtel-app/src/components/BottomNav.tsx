import { NavLink } from 'react-router-dom';


const linkBase = 'flex-1 text-center text-sm py-2';
const active = 'text-blue-600 font-medium';
const inactive = 'text-gray-500';


export default function BottomNav() {
return (
<nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 md:hidden">
<div className="mx-auto max-w-md flex">
<NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
Home
</NavLink>
<NavLink to="/activity" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
Activity
</NavLink>
<NavLink to="/topup" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
Top Up
</NavLink>
</div>
</nav>
);
}