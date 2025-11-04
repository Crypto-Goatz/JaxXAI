
import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Trades from './pages/Trades';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // In a real app, this would involve auth context, etc.
  const handleLogin = () => setIsLoggedIn(true);

  return (
    isLoggedIn ? <Trades /> : <LandingPage onLogin={handleLogin} />
  );
};

export default App;
