import React, { useState } from 'react';
import './index.css';

import {
  Container,
  Row,
} from 'react-bootstrap';
import { useLimeProtocol } from '../../hooks/useLimeProtocol';
import { EnvelopesTable } from '../../components/envelopesTable';
import { Envelope } from '../../interfaces/envelope';
import { HostContainer } from '../../components/hostContainer';
import { EnvelopeEditorContainer } from '../../components/envelopeEditorContainer';

export const Console: React.FC = () => {
  const [ clientOpened, setClientOpened ] = useState<boolean>(false);
  const [ envelopes, setEnvelopes ] = useState<Envelope[]>([]);

  const { openConnection, closeConnection, sendEnvelope } = useLimeProtocol();

  const openClient = (host: string) => {
    openConnection(host);
    setClientOpened(true);
  }

  const closeClient = () => {
    closeConnection();
    setClientOpened(false);
  }

  const sendEnvelopeToClient = (envelope: string) => {
    sendEnvelope(JSON.parse(envelope));
    setEnvelopes([{ direction: 'sent', content: JSON.parse(envelope) }, ...envelopes])
  }

  return (
    <Container fluid className="relative">
      <HostContainer
        isConnectionOpened={clientOpened}
        onConnectClick={(host: string) => openClient(host)}
        onDisconnectClick={(host: string) => closeClient()}>
      </HostContainer>

      <Row>
        <EnvelopesTable envelopes={envelopes}></EnvelopesTable>
      </Row>

      <EnvelopeEditorContainer
        canSendEnvelope={clientOpened}
        onSendEnvelope={(envelope: string) => sendEnvelopeToClient(envelope)}>
      </EnvelopeEditorContainer>
    </Container>
  )
}