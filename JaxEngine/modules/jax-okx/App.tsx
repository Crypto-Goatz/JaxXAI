
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Pricing from './components/pages/Pricing';
import Header from './components/Header';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, subscription } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const isActiveOrTrialing = subscription?.status === 'active' || (subscription?.status === 'trialing' && subscription.trialEnd && subscription.trialEnd.getTime() > new Date().getTime());

  if (!isActiveOrTrialing) {
      return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
    const { user, loading } = useAuth();
    return (
        <div className="min-h-screen bg-slate-900 text-gray-200 font-mono">
            <Header />
            <main>
                <Routes>
                    <Route path="/login" element={!loading && user ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/register" element={!loading && user ? <Navigate to="/dashboard" /> : <Register />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </main>
        </div>
    );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
