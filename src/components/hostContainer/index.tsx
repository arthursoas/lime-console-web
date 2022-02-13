import React, { ChangeEvent, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

export interface HostContainerProps {
  isConnectionOpened: boolean,
  onConnectClick: (host: string) => void,
  onDisconnectClick: (host: string) => void,
};

export const HostContainer: React.FC<HostContainerProps> = ({ isConnectionOpened, onConnectClick, onDisconnectClick }) => {
  const [ host, setHost ] = useState<string>();

  return (
    <Row className="mb2">
      <Col xs="auto" className="flex pa0 mb2">
        <Form.Label className="flex ma0 items-center"><b>Host:</b></Form.Label>
      </Col>
      <Col className="mb2">
        {!isConnectionOpened && <Form.Control
            id="host-input"
            size="sm"
            placeholder="wss://limeprotocol.org:443"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {setHost(event.target.value)}}>
          </Form.Control>
        }
        {isConnectionOpened && <Form.Label className="flex ma0 items-center h-100">{host}</Form.Label>}
      </Col>
      <Col md="auto" className="pa0">
        {!isConnectionOpened && <Button
            id="connect-button"
            variant="primary"
            size="sm"
            onClick={() => onConnectClick(host || '')} className="mb2">
              Connect
          </Button>
        }
        {isConnectionOpened && <Button
            id="disconnect-button"
            variant="warning"
            size="sm"
            disabled={!isConnectionOpened} className="mb2"
            onClick={() => onDisconnectClick(host || '')}>
              Disconnect
          </Button>
        }
      </Col>
    </Row>
  )
}