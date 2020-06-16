import { Channel } from './channel';

export class NotificationFilter {
  readonly userIds?: string[];
  readonly channels: Channel[];
}
