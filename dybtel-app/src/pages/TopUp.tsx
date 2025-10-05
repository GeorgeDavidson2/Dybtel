import { useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';


export default function TopUp() {
  const navigate = useNavigate();
  const [email, setEmail]   = useState('demo@dybtel.test');
  const [phone, setPhone]   = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [wardId, setWardId] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: handle submit
  };

  return (
    <div className="min-h-dvh grid place-items-center bg-neutral-900">
      <div className="w-full max-w-[430px] h-[92dvh] rounded-[28px] overflow-hidden bg-black">
        <div className="flex h-full flex-col">
          <div className="relative z-10 h-[20%] min-h-[120px]  bg-[url('/public/world-map.png')] bg-cover bg-center bg-no-repeat">
          </div>

          <div className="relative z-20 -mt-12 w-full flex-1 bg-[#EFEFEF] rounded-t-[40px] px-6 pt-6 pb-8">
            <button
              onClick={() => navigate('/login')}
              className="mb-4 inline-flex items-center gap-2 text-[#2FA551] font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-[#2FA551]">
                <path fill="currentColor" d="M14 7l-5 5l5 5V7z" />
              </svg>
              Back to login
            </button>

            <h1 className="text-[28px] leading-7 font-semibold text-[#2FA551] mb-6">Top Up</h1>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2FA551]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  placeholder="e.g. +15554443333"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2FA551]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2FA551]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Ward serial ID</label>
                <div className="flex rounded-2xl overflow-hidden">
                  <input
                    type="text"
                    value={wardId}
                    onChange={(e) => setWardId(e.target.value)}
                    className="flex-1 border border-gray-300 bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2FA551] rounded-l-2xl"
                  />
                  <button
                    type="button"
                    className="grid w-12 place-items-center border border-l-0 border-gray-300 bg-[#D9D9D9] text-gray-700"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M11 11V6h2v5h5v2h-5v5h-2v-5H6v-2z" />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-[#2FA551] py-4 text-white text-lg font-semibold shadow-[0_8px_0_rgba(0,0,0,0.18)]"
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
