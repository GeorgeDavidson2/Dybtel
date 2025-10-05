import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { useState, useRef } from 'react';


export default function Dashboard() {
  const { state } = useApp();
  const navigate = useNavigate();
  const quick = [50, 100, 150, 200];
  const balance = Number.isFinite(state.balance) ? state.balance : 53;

  const [swipeX, setSwipeX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxSwipe = 200;

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left - 20;
    const newX = Math.max(0, Math.min(x, maxSwipe));
    setSwipeX(newX);

    if (newX >= maxSwipe) {
      navigate('/topup');
      setSwipeX(0);
    }
  };

  const handleEnd = () => {
    setSwipeX(0);
  };

  return (
    <div className="min-h-dvh grid place-items-center bg-neutral-900">
      <div className="relative w-full max-w-[430px] h-[92dvh] rounded-[28px] overflow-hidden bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-700">
        <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 w-[140%] h-[380px] bg-white rounded-b-[1000px]" />

        <div className="relative h-full flex flex-col items-center px-5">
          <div className="pt-16">
            <div className="h-28 w-28 rounded-full bg-white ring-8 ring-white border border-neutral-300" />
          </div>

          <h2 className=" text-[20px] font-semibold text-neutral-800" style={{ marginTop: '90px' }}>Kofi Johnson</h2>

          <div className="mt-10 text-center text-white/90">
            <p className="text-xs">Current Balance</p>
            <p className="mt-1 text-3xl font-extrabold text-neutral-900">
              GHC {balance.toFixed(2)}
            </p>
          </div>

          <p className="mt-5 text-white/90 font-medium">Top Up</p>

          <div className="mt-3 w-full rounded-[22px] border border-white/40 bg-white/10 p-3 backdrop-blur-sm">
            <div className="grid grid-cols-4 gap-3">
              {quick.map((a) => (
                <button
                  key={a}
                  onClick={() => navigate(`/topup?amount=${a}`)}
                  className="rounded-2xl border border-white/60 bg-emerald-900/40 px-4 py-2.5 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)]"
                >
                  <div className="mx-auto mb-1 grid h-6 w-6 place-items-center rounded-full border border-white/75 text-xs">₵</div>
                  <span className="text-[15px] font-semibold leading-none">{a}</span>
                </button>
              ))}
            </div>

            <label className="mt-5 block text-sm text-white/90">Custom Amount</label>
            <input
              type="number"
              inputMode="decimal"
              className="mt-2 w-full rounded-2xl bg-white px-4 py-3 text-[15px] text-neutral-900 outline-none ring-1 ring-white/60 focus:ring-2 focus:ring-white"
            />
          </div>

          <div
            ref={containerRef}
            className="relative mt-6 w-[88%] rounded-full border border-white/40 bg-white/20 py-3 backdrop-blur-md overflow-hidden"
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          >
            <div
              className="absolute inset-0 bg-white/30 rounded-full transition-transform origin-left"
              style={{ transform: `scaleX(${swipeX / maxSwipe})` }}
            />

            <div
              className="absolute left-0.5 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center
             rounded-full bg-[#559581] border border-white/80 shadow-lg
             cursor-grab active:cursor-grabbing select-none touch-none z-10"
              style={{
                transform: `translate(${swipeX}px, -50%)`,
                transition: swipeX === 0 ? 'transform 0.3s ease-out' : 'none',
              }}
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
            >
              <span className="text-white text-xl font-bold">→</span>
            </div>

            <div className="text-center text-white font-medium pointer-events-none">
              {swipeX > maxSwipe * 0.7 ? 'Release to Continue' : 'Swipe to Proceed'}
            </div>
          </div>

          <button
            onClick={() => navigate('/activity')}
            className="mt-auto mb-5 text-sm text-white/90 underline"
          >
            View activity history 
          </button>
        </div>
      </div>
    </div>
  );
}