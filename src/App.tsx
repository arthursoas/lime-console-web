import React from 'react';
import './assets/css/App.css';
import { Console } from './pages/console';
import { LimeProtocolProvider } from './hooks/useLimeProtocol';

export const App: React.FC = () => {
  return (
    <div className="app">
      <LimeProtocolProvider>
        <Console></Console>
      </LimeProtocolProvider>
    </div>
  );
}

export default App;
