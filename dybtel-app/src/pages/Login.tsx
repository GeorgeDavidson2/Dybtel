import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';

export default function Login() {
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('demo@dybtel.test');
  const [password, setPassword] = useState('1234');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert('Enter both email and password');
    dispatch({ type: 'LOGIN', payload: { name: 'Kofi Johnson', email } });
    navigate('/');
  };

  return (
    <div className="min-h-dvh grid place-items-center bg-black">
      
      <div className="relative w-full max-w-[430px] h-[92dvh] rounded-[28px] overflow-hidden bg-[#121212]">
        
        <div className="flex h-full flex-col">
          
          <div className="h-[56%] min-h-[300px]  bg-[url('/public/world-map.png')] bg-cover bg-center bg-no-repeat"></div>

          <div className="-mt-10 w-full flex-1 bg-[#EFEFEF] rounded-t-[24px] p-6">
            <h1 className="text-[28px] leading-7 font-semibold text-[#2FA551] mb-5">Login</h1>

            <form onSubmit={onSubmit} className="space-y-4">
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
                <label className="block text-sm text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2FA551]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-[#2FA551] py-3 text-white text-lg font-semibold shadow-[0_6px_0_rgba(0,0,0,0.18)] hover:brightness-105 active:translate-y-[1px] active:shadow-[0_4px_0_rgba(0,0,0,0.18)] transition"
              >
                Login
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-gray-700">
              Don’t have an account?{' '}
              <span className="text-[#2FA551] font-semibold">Signup</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
