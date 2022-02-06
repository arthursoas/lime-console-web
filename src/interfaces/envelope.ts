import { Command, Message, Session, Notification } from "lime-js";

export interface Envelope {
  direction: 'sent' | 'received',
  content: Command | Session | Message | Notification,
}