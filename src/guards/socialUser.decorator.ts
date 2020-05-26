import { createParamDecorator } from '@nestjs/common';
import SocialProfile from '../api/auth/dto/socialProfile';

export const SocialUser = createParamDecorator(
  (data, req): SocialProfile => {
    return req.socialProfile;
  },
);
