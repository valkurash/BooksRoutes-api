import { Injectable } from '@nestjs/common';
import { Strategy as GoogleTokenStrategy } from 'passport-google-token';
import { SocialType } from '../../../user/entities/socialType';
import { PassportStrategy } from '@nestjs/passport';
import googleConfig from '../../config/google.config';
import { AuthService } from '../../auth.service';
import SocialProfile from '../../dto/socialProfile';

@Injectable()
export class GoogleLoginStrategy extends PassportStrategy(
  GoogleTokenStrategy,
  'google',
) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: googleConfig.client_id,
      clientSecret: googleConfig.client_secret,
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    try {
      if (!profile._json.verified_email) {
        done(new Error('email is not verified'), null);
      }
      const socialProfile: SocialProfile = {
        email: profile._json.email,
        id: profile.id,
        displayName: profile.displayName,
        avatar: profile._json.picture,
      };
      done(null, socialProfile);
    } catch (err) {
      done(err, null);
    }
  }
}
