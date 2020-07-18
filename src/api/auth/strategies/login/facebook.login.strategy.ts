import { Injectable } from '@nestjs/common';

import facebookConfig from '../../config/facebook.config';

import * as PassportFacebookToken from 'passport-facebook-token';

import { PassportStrategy } from '@nestjs/passport';
import SocialProfile from '../../dto/socialProfile';
import { AuthService } from '../../auth.service';

@Injectable()
export class FacebookLoginStrategy extends PassportStrategy(
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

      done(null, socialProfile);
    } catch (err) {
      done(err, null);
    }
  }
}
