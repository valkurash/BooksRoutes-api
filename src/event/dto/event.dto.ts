import { NotificationFilter } from './notificationFilter';

export default class EventDto {
  readonly eventId: number;
  readonly streamId: number;
  readonly data: any;
  readonly filter?: NotificationFilter;
}
