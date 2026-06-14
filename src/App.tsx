/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
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

export default function App() {
  return (
    <>
      <Toaster theme="dark" position="bottom-right" />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/" element={
              <RequireAuth>
                <Layout>
                  <Navigate to="/command-center" replace />
                </Layout>
              </RequireAuth>
            } />
            <Route path="/command-center" element={<RequireAuth><Layout><CommandCenter /></Layout></RequireAuth>} />
            <Route path="/agents" element={<RequireAuth><Layout><AgentDirectory /></Layout></RequireAuth>} />
            <Route path="/workspace" element={<RequireAuth><Layout><ProjectWorkspace /></Layout></RequireAuth>} />
            <Route path="/radar" element={<RequireAuth><Layout><OpportunityRadar /></Layout></RequireAuth>} />
            <Route path="/brain" element={<RequireAuth><Layout><IntelligenceBrain /></Layout></RequireAuth>} />
            <Route path="/artifacts" element={<RequireAuth><Layout><ArtifactStudio /></Layout></RequireAuth>} />
            <Route path="/tracking-board" element={<RequireAuth><Layout><TrackingBoard /></Layout></RequireAuth>} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}
