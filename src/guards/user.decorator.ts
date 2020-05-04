import { UserPayload } from '../api/auth/dto/jwtUserPayload.dto';
import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data, req): UserPayload => {
    return req.user;
  },
);
