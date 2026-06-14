import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/command-center";

  useEffect(() => {
    if (user) {
      navigate('/command-center', { replace: true });
    }
  }, [user, navigate]);

  const validateForm = () => {
    if (!email) return "Email address is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email address";
    if (!password) return "Password is required";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      // Simulate real backend auth request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (password.length < 6) {
        throw new Error("Invalid credentials. Try a longer password.");
      }
      
      login(email);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="apex-auth-wrapper"
    >
      <div className="apex-auth-card">
        <div className="apex-auth-brand">
          <div className="w-12 h-12 bg-[#00DCC4] rounded-md flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,220,196,0.25)]">
            <Zap className="w-6 h-6 text-[#1B1B1B] fill-[#1B1B1B]" />
          </div>
          <h1 className="apex-auth-title">
            Sign in to APEX<span className="text-[#00DCC4] font-medium">OS</span>
          </h1>
          <p className="apex-auth-subtitle">
            Or{' '}
            <Link to="/signup" className="apex-link apex-link-accent">
              create a new core ID
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="apex-form-group">
            <label htmlFor="email" className="apex-form-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              disabled={isLoading}
              className={`apex-input ${error && !email ? 'has-error' : ''}`}
              placeholder="operator@apex.os"
              autoComplete="email"
            />
          </div>

          <div className="apex-form-group">
            <label htmlFor="password" className="apex-form-label">
              <span>Password</span>
              <a href="#" className="apex-link" tabIndex={-1}>
                Forgot password?
              </a>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              disabled={isLoading}
              className={`apex-input ${error && email && !password ? 'has-error' : ''}`}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <div className="apex-checkbox-wrapper mb-6 mt-4">
            <input type="checkbox" id="remember-me" className="apex-checkbox" />
            <label htmlFor="remember-me" className="apex-checkbox-label">
              Maintain secure session
            </label>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="apex-error-text mb-4"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={isLoading}
            className="apex-btn-primary mt-2"
          >
            {isLoading ? (
              <>
                <div className="apex-spinner" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Initialize Session</span>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
