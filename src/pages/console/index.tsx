import React, { useState } from 'react';
import './index.css';

import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';

export const Console: React.FC = () => {
  const [ clientOpened, setClientOpened ] = useState<boolean>(false);

  const openClient = () => {
    setClientOpened(true);
  }

  return (
    <Container fluid>
      <Row>
        <Col xs="auto" className="flex pa0 mb2">
          <Form.Label className="flex ma0 items-center"><b>Host</b></Form.Label>
        </Col>
        <Col className="mb2">
          <Form.Control id="host-input" placeholder="wss://limeprotocol.org:443" disabled={clientOpened}></Form.Control>
        </Col>
        <Col md="auto" className="pa0">
          <Button variant="primary" id="connect-button" disabled={clientOpened} onClick={() => openClient()} className="mb2">Connect</Button>
          <Button variant="secondary" id="disconnect-button" disabled={!clientOpened} className="mb2">Disconnect</Button>
        </Col>
      </Row>
    </Container>
  )
}