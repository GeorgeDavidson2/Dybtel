import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Layout() {
  const { pathname } = useLocation();

const immersive = pathname === '/' || pathname === '/activity' || pathname === '/topup';

  return (
    <div className="min-h-dvh grid grid-rows-[auto,1fr,auto]">
      {!immersive && <Header />}
      <main className={immersive ? 'p-0' : 'mx-auto max-w-md w-full px-4 py-4 pb-24 md:pb-8'}>
        <Outlet />
      </main>
      {!immersive && <BottomNav />}
    </div>
  );
}
