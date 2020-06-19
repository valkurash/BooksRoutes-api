import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import EventUserDto from './dto/eventUser.dto';
import BaseApiResponse from '../base/base.api.response';
import ExternalServicesException from '../exceptions/externalServicesException';
import EventDto from './dto/event.dto';
import AccountConfirmationEventPayload from './eventPayloads/accountConfirmationEventPayload';
import { Channel } from './dto/channel';
import ResetPasswordEventPayload from './eventPayloads/resetPasswordEventPayload';

@Injectable()
export class EventService {
  public async createUser(payload: EventUserDto) {
    try {
      const url = `${process.env.EVENT_SERVICE_ADDRESS}/api/user`;
      const response = await Axios.put<BaseApiResponse<EventUserDto>>(
        url,
        payload,
      );
      const result = response.data;
      if (result.errorCode === 0) {
      } else {
        throw new ExternalServicesException(
          `Internal Exception ${result.errorMessage}`,
          result.errorCode,
        );
      }
    } catch (e) {
      throw new ExternalServicesException(e.message, 400);
    }
  }

  public async sendConfirmationEmail(payload: AccountConfirmationEventPayload) {
    try {
      const url = `${process.env.EVENT_SERVICE_ADDRESS}/api/notification`;
      const splitted = process.env.AUTHORIZATION_COMPLETE_EVENT.split(':');
      const streamId = splitted[0];
      const eventId = splitted[1];
      const eventDto: EventDto = {
        data: payload,
        filter: { userIds: [payload.userId], channels: [Channel.email] },
        eventId: parseInt(eventId),
        streamId: parseInt(streamId),
      };
      const response = await Axios.post<BaseApiResponse<EventUserDto>>(
        url,
        eventDto,
      );
    } catch (e) {
      throw new ExternalServicesException(e.message, 400);
    }
  }

  public async sendRecoveryPassword(payload: ResetPasswordEventPayload) {
    try {
      const url = `${process.env.EVENT_SERVICE_ADDRESS}/api/notification`;
      const splitted = process.env.RESET_PASSWORD_EVENT.split(':');
      const streamId = splitted[0];
      const eventId = splitted[1];
      const eventDto: EventDto = {
        data: payload,
        filter: { userIds: [payload.userId], channels: [Channel.email] },
        eventId: parseInt(eventId),
        streamId: parseInt(streamId),
      };
      const response = await Axios.post<BaseApiResponse<EventUserDto>>(
        url,
        eventDto,
      );
    } catch (e) {
      throw new ExternalServicesException(e.message, 400);
    }
  }
}
