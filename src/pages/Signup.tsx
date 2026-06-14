import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/command-center', { replace: true });
    }
  }, [user, navigate]);

  const validateForm = () => {
    if (!fullName) return "Full Name is required";
    if (!email) return "Email address is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email address";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";
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
      
      signup(email);
      navigate('/command-center');
    } catch (err: any) {
      setError(err.message || 'Account initialization failed. Please try again.');
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
          <div className="w-12 h-12 bg-[#00E5C3] rounded-md flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,195,0.25)]">
            <Zap className="w-6 h-6 text-[#02110E] fill-[#02110E]" />
          </div>
          <h1 className="apex-auth-title">
            Initialize Core ID
          </h1>
          <p className="apex-auth-subtitle">
            Already have access?{' '}
            <Link to="/login" className="apex-link apex-link-accent">
              Sign in here
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="apex-form-group">
            <label htmlFor="fullName" className="apex-form-label">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setError(''); }}
              disabled={isLoading}
              className={`apex-input ${error && !fullName ? 'has-error' : ''}`}
              placeholder="John Doe"
              autoComplete="name"
            />
          </div>

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
              className={`apex-input ${error && fullName && !email ? 'has-error' : ''}`}
              placeholder="operator@apex.os"
              autoComplete="email"
            />
          </div>

          <div className="apex-form-group">
            <label htmlFor="password" className="apex-form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              disabled={isLoading}
              className={`apex-input ${error && error.includes('Password') && !confirmPassword ? 'has-error' : ''}`}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <div className="apex-form-group">
            <label htmlFor="confirmPassword" className="apex-form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
              disabled={isLoading}
              className={`apex-input ${error && error.includes('match') ? 'has-error' : ''}`}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="apex-error-text mb-4 mt-2"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={isLoading || !fullName || !email || !password || !confirmPassword}
            className="apex-btn-primary mt-6"
          >
            {isLoading ? (
              <>
                <div className="apex-spinner" />
                <span>Initializing...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
