import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import TopUp from './pages/TopUp';
import Layout from './components/Layout';
import { useApp } from './state/AppContext';
import type { JSX } from 'react';


function Protected({ children }: { children: JSX.Element }) {
const { state } = useApp();
const location = useLocation();
if (!state.user) return <Navigate to="/login" state={{ from: location }} replace />;
return children;
}


export default function App() {
return (
<Routes>
<Route path="/login" element={<Login />} />
<Route
path="/"
element={
<Protected>
<Layout />
</Protected>
}
>
<Route index element={<Dashboard />} />
<Route path="activity" element={<Activity />} />
<Route path="topup" element={<TopUp />} />
</Route>
<Route path="*" element={<Navigate to="/" replace />} />
</Routes>
);
}