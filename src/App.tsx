/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CommandCenter from './pages/CommandCenter';
import AgentDirectory from './pages/AgentDirectory';
import ProjectWorkspace from './pages/ProjectWorkspace';
import OpportunityRadar from './pages/OpportunityRadar';
import IntelligenceBrain from './pages/IntelligenceBrain';
import ArtifactStudio from './pages/ArtifactStudio';
import TrackingBoard from './pages/TrackingBoard';

import { Toaster } from 'sonner';

export default function App() {
  return (
    <>
      <Toaster theme="dark" position="bottom-right" />
      <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/command-center" replace />} />
          <Route path="/command-center" element={<CommandCenter />} />
          <Route path="/agents" element={<AgentDirectory />} />
          <Route path="/workspace" element={<ProjectWorkspace />} />
          <Route path="/radar" element={<OpportunityRadar />} />
          <Route path="/brain" element={<IntelligenceBrain />} />
          <Route path="/artifacts" element={<ArtifactStudio />} />
          <Route path="/tracking-board" element={<TrackingBoard />} />
        </Routes>
      </Layout>
    </Router>
    </>
  );
}
