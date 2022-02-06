import React, { useEffect, useState } from 'react';
import './assets/css/App.css';
import Lime, { ClientChannel } from 'lime-js';
import WebSocketTransport from 'lime-transport-websocket';

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
    <div className="App">
      <header className="App-header">
        <p onClick={() => sendNewCommand()}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
