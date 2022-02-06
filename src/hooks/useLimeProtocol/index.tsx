import React, { createContext, useContext, useState } from 'react';
import { ClientChannel, Command, Message, Session, Notification } from 'lime-js';
import WebSocketTransport from 'lime-transport-websocket';

interface LimeProtocolContextData {
  openConnection(serverUri: string): void;
  closeConnection(): void;
  sendEnvelope(envelope: Command | Session | Message | Notification): void
}

export const LimeProtocolContext = createContext<LimeProtocolContextData>({} as LimeProtocolContextData);

export const useLimeProtocol = (): LimeProtocolContextData => {
  const context = useContext(LimeProtocolContext);
  if (!context) { throw new Error('useLimeProtocol must be used within a LimeProtocolProvider'); }

  return context;
}

export const LimeProtocolProvider: React.FC = ({ children }) => {
  const [ limeTransport ] = useState<any>(new WebSocketTransport(false));
  const [ clientChannel, setClientChannel ] = useState<ClientChannel>();

  const openConnection = (serverUri: string) => {
    limeTransport.open(serverUri);
    setClientChannel(new ClientChannel(limeTransport, true, true))
  }

  const closeConnection = () => {
    clientChannel?.sendFinishingSession();
    limeTransport.close();
  }

  const sendEnvelope = (envelope: any) => {
    if (_isCommand(envelope)) {
      clientChannel?.sendCommand(envelope as Command);
      return;
    }

    if (_isMessage(envelope)) {
      clientChannel?.sendMessage(envelope as Message);
      return;
    }

    if (_isSession(envelope)) {
      clientChannel?.sendSession(envelope as Session);
      return;
    }

    if (_isNotification(envelope)) {
      clientChannel?.sendNotification(envelope as Notification);
      return;
    }
  }

  const _isMessage = (envelope: any): boolean => envelope.hasOwnProperty('content');
  const _isNotification = (envelope: any): boolean => envelope.hasOwnProperty('event');
  const _isCommand = (envelope: any): boolean => envelope.hasOwnProperty('method');
  const _isSession = (envelope: any): boolean => envelope.hasOwnProperty('state');

  return (
    <LimeProtocolContext.Provider value={{ openConnection, closeConnection, sendEnvelope }}>
      {children}
    </LimeProtocolContext.Provider>
  );
}