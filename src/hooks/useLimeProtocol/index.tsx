import React, { createContext, useContext, useState } from 'react';
import { ClientChannel } from 'lime-js';
import WebSocketTransport from 'lime-transport-websocket';

interface LimeProtocolContextData {
  openConnection(serverUri: string): void;
  closeConnection(): void;
}

export const LimeProtocolContext = createContext<LimeProtocolContextData>({} as LimeProtocolContextData);

export const useLimeProtocol = (): LimeProtocolContextData => {
  const context = useContext(LimeProtocolContext);
  if (!context) { throw new Error('useLimeProtocol must be used within a LimeProtocolProvider'); }

  return context;
}

export const LimeProtocolProvider: React.FC = ({ children }) => {
  const [ limeTransport ] = useState<any>(new WebSocketTransport(false));
  const [ , setClientChannel ] = useState<ClientChannel>();

  const openConnection = (serverUri: string) => {
    limeTransport.open(serverUri);
    setClientChannel(new ClientChannel(limeTransport))
  }

  const closeConnection = () => {
    limeTransport.close();
  }

  return (
    <LimeProtocolContext.Provider value={{ openConnection, closeConnection }}>
      {children}
    </LimeProtocolContext.Provider>
  );
}