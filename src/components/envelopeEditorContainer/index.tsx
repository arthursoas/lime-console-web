import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  Row,
  Form,
  Button,
} from 'react-bootstrap';

export interface EnvelopeEditorContainerProps {
  canSendEnvelope: boolean,
  onSendEnvelope: (envelope: string) => void,
}

export const EnvelopeEditorContainer: React.FC<EnvelopeEditorContainerProps> = ({ canSendEnvelope, onSendEnvelope }) => {
  const [ typingEnvelope, setTypingEnvelope ] = useState<string>();
  const [ eventListenerAdded, setEventListenerAdded ] = useState<boolean>(false);
  const envelopeInputRef = useRef<any>();

  useEffect(() => {
    if (!eventListenerAdded && envelopeInputRef && envelopeInputRef.current) {
      envelopeInputRef.current.addEventListener('keydown', function(this: HTMLTextAreaElement, event: KeyboardEvent) {
        if (event.key === 'Tab') {
          event.preventDefault();
          const val = this.value;
          const start = this.selectionStart;
          const end = this.selectionEnd;

          this.value = val.substring(0, start) + '\t' + val.substring(end);
          this.selectionStart = this.selectionEnd = start + 1;
          return false;
        }
      });
      setEventListenerAdded(true);
    }
  }, [eventListenerAdded])

  return (
    <Row className="relative">
      <Form.Control
        id="envelope-input"
        ref={envelopeInputRef}
        as="textarea"
        size="sm"
        rows={8}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {setTypingEnvelope(event.target.value)}}
        disabled={!canSendEnvelope}>
      </Form.Control>
      <Button
        id="send-envelope-button"
        className="absolute bottom-1 right-1 w-auto"
        size="sm"
        variant="primary"
        disabled={!canSendEnvelope}
        onClick={() => onSendEnvelope(typingEnvelope || '')}>
          Send
      </Button>
    </Row>
  )
}