import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-[#00e59b]/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="w-12 h-12 bg-[#00e59b] rounded-md flex items-center justify-center mb-6">
          <Zap className="w-6 h-6 text-black fill-black" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white">
          Sign in to APEX<span className="text-[#00e59b] font-medium">OS</span>
        </h2>
        <p className="mt-2 text-center text-sm text-[#a1a1aa]">
          Or{' '}
          <Link to="/signup" className="font-medium text-[#00e59b] hover:text-[#00e59b]/80 transition-colors">
            create a new core ID
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#050505] border border-[#27272a] py-8 px-4 shadow rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#a1a1aa]">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-[#27272a] bg-[#0b0c10] px-3 py-2 text-white placeholder-[#52525b] focus:border-[#00e59b] focus:outline-none focus:ring-1 focus:ring-[#00e59b] sm:text-sm transition-colors"
                  placeholder="operator@apex.os"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#a1a1aa]">
                Password
              </label>
              <div className="mt-2 text-right">
              </div>
              <div className="mt-0">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-[#27272a] bg-[#0b0c10] px-3 py-2 text-white placeholder-[#52525b] focus:border-[#00e59b] focus:outline-none focus:ring-1 focus:ring-[#00e59b] sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#27272a] bg-[#0b0c10] text-[#00e59b] focus:ring-[#00e59b] focus:ring-offset-0 focus:ring-offset-black accent-[#00e59b]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#a1a1aa]">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#00e59b] hover:text-[#00e59b]/80 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-[#00e59b] py-2.5 px-4 text-sm font-bold text-black shadow hover:bg-[#00e59b]/90 focus:outline-none focus:ring-2 focus:ring-[#00e59b] focus:ring-offset-2 focus:ring-offset-black transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
