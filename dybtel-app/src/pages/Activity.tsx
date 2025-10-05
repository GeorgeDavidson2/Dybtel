import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';

type Row = { id: string; ward: string; date: string; amount: number };

export default function Activity() {
  const navigate = useNavigate();
  const { state } = useApp();

  const rows = useMemo<Row[]>(() => {
    const wards = ['Acus Yum', 'Bcus Yum', 'Kus Yum', 'Jus Yum'];
    const fmt = (d: string | number | Date) => {
      const dt = new Date(d);
      const dd = String(dt.getDate()).padStart(2, '0');
      const mm = String(dt.getMonth() + 1).padStart(2, '0');
      const yy = String(dt.getFullYear()).toString().slice(-2);
      return `${dd}/${mm}/${yy}`;
    };

    const mapped: Row[] = (state.transactions ?? []).slice(0, 10).map((t, i) => ({
      id: String(i + 1).padStart(3, '0'),
      ward: wards[i % wards.length],
      date: fmt(t.date),
      amount: Math.round(t.amount ?? 0),
    }));

    const need = 10 - mapped.length;
    if (need > 0) {
      const filler = Array.from({ length: need }, (_, k) => {
        const i = mapped.length + k;
        const amt = i === 0 ? 500 : i === 2 ? 100 : 200;
        return {
          id: String(i + 1).padStart(3, '0'),
          ward: wards[i % wards.length],
          date: '12/03/29',
          amount: amt,
        };
      });
      return [...mapped, ...filler];
    }
    return mapped;
  }, [state.transactions]);

  return (
    <div className="min-h-dvh grid place-items-center bg-neutral-900">
      
      <div className="relative w-full max-w-[430px] h-[92dvh] rounded-[28px] overflow-hidden bg-gradient-to-b from-[#2FC778] via-[#17B06B] to-[#0B6C55]">
        
        <div className="absolute top-0 inset-x-0 h-[26%] bg-white z-10" />

        
        <div className="relative z-20 px-5 pt-6 flex items-center justify-between text-sm">
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-emerald-700 font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-emerald-700">
              <path fill="currentColor" d="M14 7l-5 5l5 5V7z" />
            </svg>
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4 text-neutral-500">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2m6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1z" /></svg>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10l5 5l5-5z" /></svg>
          </div>
        </div>

        <h1 className="relative z-20 px-5 mt-3 text-2xl font-semibold text-[#22A163]">Activity History</h1>

       
        <div className="absolute z-10 left-1/2 -translate-x-1/2 top-[26%] w-[128%] h-[170px] bg-[#28B66F] rounded-b-[1200px]"/>

       
        <div className="relative z-20 mt-[145px] px-4 pb-6">
          <div className="rounded-3xl border border-white/35 bg-[rgba(6,61,49,0.45)] backdrop-blur-sm overflow-hidden">
            <table className="w-full text-sm text-white/90 border-separate border-spacing-0">
  <thead className="bg-[rgba(6,61,49,0.85)] text-white">
    <tr className="[&>th]:px-4 [&>th]:py-3 text-left">
      <th className="w-[18%]">ID</th>
      <th className="w-[32%]">Ward</th>
      <th className="w-[30%]">Date</th>
      <th className="w-[20%] text-right pr-5">Amount</th>
    </tr>
  </thead>

  <tbody className="divide-y divide-white/10">
    {rows.map((r, i) => {
      const selected = i === 0;
      const baseRow =
        `${i % 2 ? 'bg-[rgba(13,98,78,0.40)]' : 'bg-[rgba(13,98,78,0.28)]'} hover:bg-[rgba(13,98,78,0.48)] transition`;

      const yBorder = selected ? 'border-t-2 border-b-2 border-sky-400' : '';
      const lBorder = selected ? 'border-l-2 border-sky-400 rounded-l-md' : '';
      const rBorder = selected ? 'border-r-2 border-sky-400 rounded-r-md' : '';

      return (
        <tr key={r.id} className={baseRow}>
          <td className={`px-4 py-3 ${yBorder} ${lBorder}`}>{r.id}</td>
          <td className={`px-4 py-3 font-medium ${yBorder}`}>{r.ward}</td>
          <td className={`px-4 py-3 ${yBorder}`}>{r.date}</td>
          <td className={`px-4 py-3 pr-5 text-right ${yBorder} ${rBorder}`}>{r.amount}</td>
        </tr>
      );
    })}
  </tbody>
</table>

          </div>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
