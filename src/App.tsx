/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import CommandCenter from './pages/CommandCenter';
import AgentDirectory from './pages/AgentDirectory';
import ProjectWorkspace from './pages/ProjectWorkspace';
import OpportunityRadar from './pages/OpportunityRadar';
import IntelligenceBrain from './pages/IntelligenceBrain';
import ArtifactStudio from './pages/ArtifactStudio';
import TrackingBoard from './pages/TrackingBoard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Docs from './pages/Docs';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { AuthProvider, useAuth } from './lib/AuthContext';

import { Toaster } from 'sonner';

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error React Router types don't include key, but React handles it naturally */}
      <Routes location={location} key={location.pathname}>
        {/* Public Marketing/SaaS Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Dashboard pages */}
        <Route path="/command-center" element={<RequireAuth><Layout><CommandCenter /></Layout></RequireAuth>} />
        <Route path="/agents" element={<RequireAuth><Layout><AgentDirectory /></Layout></RequireAuth>} />
        <Route path="/workspace" element={<RequireAuth><Layout><ProjectWorkspace /></Layout></RequireAuth>} />
        <Route path="/radar" element={<RequireAuth><Layout><OpportunityRadar /></Layout></RequireAuth>} />
        <Route path="/brain" element={<RequireAuth><Layout><IntelligenceBrain /></Layout></RequireAuth>} />
        <Route path="/artifacts" element={<RequireAuth><Layout><ArtifactStudio /></Layout></RequireAuth>} />
        <Route path="/tracking-board" element={<RequireAuth><Layout><TrackingBoard /></Layout></RequireAuth>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <>
      <Toaster theme="dark" position="bottom-right" />
      <AuthProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </AuthProvider>
    </>
  );
}
