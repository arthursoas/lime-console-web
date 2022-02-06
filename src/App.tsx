import React, { useEffect, useState } from 'react';
import './assets/css/App.css';
import Lime, { ClientChannel } from 'lime-js';
import WebSocketTransport from 'lime-transport-websocket';
import { Console } from './pages/console';

export const App: React.FC = () => {
  const limeTransport = new WebSocketTransport(false);
  const serverUri = 'wss://ws.msging.net:443';

  const [ clientchannel, setClientChannel ] = useState<ClientChannel>();

  useEffect(() => {
    limeTransport.open(serverUri);
    setClientChannel(new ClientChannel(limeTransport))
  }, [])

  const sendNewCommand = () => {
    clientchannel?.sendSession({
      state: 'new'
    });
  }

  return (
    <div className="app">
      <Console></Console>
    </div>
  );
}

export default App;
