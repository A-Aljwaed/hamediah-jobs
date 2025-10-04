import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import JobList from './pages/JobList';
import EnhancedJobList from './pages/EnhancedJobList';
import JobDetail from './pages/JobDetail';
import Login from './pages/Login';
import CreateJob from './pages/CreateJob';
import AdminPanel from './pages/AdminPanel';
import { JobsLandingPage, BrowseJobsPage, PostJobPage } from './features/jobs';
import './i18n'; // Initialize i18n

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobsLandingPage />} />
            <Route path="/jobs/browse" element={<BrowseJobsPage />} />
            <Route path="/jobs/post" element={<PostJobPage />} />
            <Route path="/jobs/simple" element={<JobList />} />
            <Route path="/jobs/legacy" element={<EnhancedJobList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#17BE75',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#D9544D',
              secondary: '#fff',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
