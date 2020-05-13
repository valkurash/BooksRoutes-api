import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import facebookConfig from '../config/facebook.config';

import * as PassportFacebookToken from 'passport-facebook-token';
import UserDto from '../../user/dtos/user.dto';
import { UserService } from '../../user/user.service';
import { SocialType } from '../../user/entities/socialType';
import RegisterRequestDto from '../../user/dtos/register.request.dto';
import { UserPayload } from '../dto/jwtUserPayload.dto';
import { PassportStrategy } from '@nestjs/passport';
import SocialProfile from '../dto/socialProfile';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(
  PassportFacebookToken,
  'facebook',
) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: facebookConfig.client_id,
      clientSecret: facebookConfig.client_secret,
      profileFields: ['id', 'emails', 'name', 'displayName'],
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    try {
      const socialProfile: SocialProfile = {
        email: profile.emails.shift().value,
        id: profile.id,
        displayName: profile.displayName,
        avatar: profile.photos[0]?.value,
      };
      const payload = await this.authService.loginBySocial(
        SocialType.FACEBOOK,
        socialProfile,
      );
      done(null, payload);
    } catch (err) {
      done(err, null);
    }
  }
}
