import React, { ChangeEvent, useState } from 'react';
import './index.css';

import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import { useLimeProtocol } from '../../hooks/useLimeProtocol';
import { EnvelopesTable } from '../../components/envelopesTable';
import { Envelope } from '../../interfaces/envelope';

export const Console: React.FC = () => {
  const [ clientOpened, setClientOpened ] = useState<boolean>(false);
  const [ host, setHost ] = useState<string>('');
  const [ typingEnvelope, setTypingenvelope ] = useState<string>('')
  const [ envelopes, setEnvelopes ] = useState<Envelope[]>([]);

  const { openConnection, closeConnection, sendEnvelope } = useLimeProtocol();

  const openClient = () => {
    openConnection(host);
    setClientOpened(true);
  }

  const closeClient = () => {
    closeConnection();
    setClientOpened(false);
  }

  const sendEnvelopeToClient = () => {
    sendEnvelope(JSON.parse(typingEnvelope));
    setEnvelopes([{ direction: 'sent', content: JSON.parse(typingEnvelope) }, ...envelopes])
  }

  return (
    <Container fluid className="relative">
      <Row className="mb2">
        <Col xs="auto" className="flex pa0 mb2">
          <Form.Label className="flex ma0 items-center"><b>Host</b></Form.Label>
        </Col>
        <Col className="mb2">
          <Form.Control
            id="host-input"
            placeholder="wss://limeprotocol.org:443"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {setHost(event.target.value)}}
            disabled={clientOpened}>
          </Form.Control>
        </Col>
        <Col md="auto" className="pa0">
          <Button
            variant="primary" id="connect-button"
            disabled={clientOpened}
            onClick={() => openClient()} className="mb2">
              Connect
          </Button>
          <Button
            variant="secondary" id="disconnect-button"
            disabled={!clientOpened} className="mb2"
            onClick={() => closeClient()}>
              Disconnect
          </Button>
        </Col>
      </Row>

      <Row>
        <EnvelopesTable envelopes={envelopes}></EnvelopesTable>
      </Row>

      <Row className="relative">
        <Form.Control
          id="envelope-input"
          as="textarea"
          rows={8}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {setTypingenvelope(event.target.value)}}
          disabled={!clientOpened}>
        </Form.Control>
        <Button
          className="absolute bottom-1 right-1 w-auto"
          variant="primary" id="send-envelope-button"
          disabled={!clientOpened}
          onClick={() => sendEnvelopeToClient()}>
            Send
        </Button>
      </Row>
    </Container>
  )
}