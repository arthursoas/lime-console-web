import { Command, Message, Session, Notification } from "lime-js";
import React from "react";

interface EnvelopeRowProps {
  direction: 'sent' | 'received',
  content: Command | Session | Message | Notification,
}

export const EnvelopeRow: React.FC<EnvelopeRowProps> = ({ direction, content }) => {
  return (
    <tr>
      <td>{direction.toUpperCase()}</td>
      <td>
        <pre className="mb0">
          <code className="json">{JSON.stringify(content, null, 4)}</code>
        </pre>
      </td>
    </tr>
  )
}