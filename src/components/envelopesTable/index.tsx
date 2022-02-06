import React, { useEffect, useState } from 'react';
import { Command, Message, Notification, Session } from 'lime-js';
import { Table } from 'react-bootstrap';
import { EnvelopeRow } from '../envelopeRow'

interface EnvelopesTableProps {
  envelopes: Envelope[];
}

interface Envelope {
  direction: 'sent' | 'received',
  content: Command | Session | Message | Notification,
}

export const EnvelopesTable: React.FC<EnvelopesTableProps> = ({ envelopes }) => {
  const [ envelopeRows, setEnvelopeRows ] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setEnvelopeRows(
      envelopes.map((envelope) => (
        <EnvelopeRow
          key={Date.now()}
          direction={envelope.direction}
          content={envelope.content}>
        </EnvelopeRow>
      ))
    )
  }, envelopes)

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Direction</th>
          <th>Envelope</th>
        </tr>
      </thead>
      <tbody>
        {envelopeRows.length > 0 ?
          envelopeRows :
          <tr>
            <td colSpan={2}>NO ENVELOPES</td>
          </tr>
        }
      </tbody>
    </Table>
  )
}