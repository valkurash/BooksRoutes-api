import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AppleStrategy = require('@nicokaiser/passport-apple');
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../../auth.service';
import SocialProfile from '../../dto/socialProfile';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AppleLoginStrategy extends PassportStrategy(
  AppleStrategy,
  'apple',
) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: 'com.my.booksroutes',
      teamID: '2B3LXKTA8H',
      callbackURL: 'http://mylocaladdr.test/api/auth/apple',
      keyID: 'KJ9S94AG98',
      scope: ['full_name', 'email'],
      key:
        '-----BEGIN PRIVATE KEY-----\n' +
        'MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgoOyVANrA/Bnb8Sn9\n' +
        'X8CHW/kiwiqRmJSS2tegu4j5j4qgCgYIKoZIzj0DAQehRANCAASbSioS8et/+ZRP\n' +
        'USARPFU5Yw8cXN3Y5idVHVb/YYfhmeSkDLMhToSaGxc5bUGU+FlU1Ixp9I3iaFax\n' +
        'BUn3wvTd\n' +
        '-----END PRIVATE KEY-----',
      passReqToCallback: true,
    });
  }

  public async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    try {
      if (!profile.emailVerified) {
        done(new Error('email is not verified'), null);
      }
      const socialProfile: SocialProfile = {
        email: profile.email,
        id: profile.id,
        displayName: profile.name?.firstName,
      };
      done(null, socialProfile);
    } catch (err) {
      done(err, null);
    }
  }
}
