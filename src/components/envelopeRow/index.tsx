import React from "react";
import { Envelope } from "../../interfaces/envelope";

interface EnvelopeRowProps extends Envelope {}

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