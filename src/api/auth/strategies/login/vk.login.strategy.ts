import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { SocialType } from '../../../user/entities/socialType';
import vkontakteConfig from '../../config/vkontakte.config';
import SocialProfile from '../../dto/socialProfile';
import { AuthService } from '../../auth.service';
const VKontakteTokenStrategy = require('passport-vkontakte-token');

@Injectable()
export class VkontakteStrategy {
  constructor(private readonly authService: AuthService) {
    this.init();
  }

  private init(): void {
    use(
      'vkontakte',
      new VKontakteTokenStrategy(
        {
          clientID: vkontakteConfig.client_id,
          apiVersion: '5.21',
          clientSecret: vkontakteConfig.client_secret,
          profileFields: [
            'uid',
            'first_name',
            'last_name',
            'screen_name',
            'sex',
            'photo',
            'photo_400_orig',
          ],
          passReqToCallback: true,
        },
        async (
          req: any,
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: Function,
        ) => {
          try {
            const socialProfile: SocialProfile = {
              email: req.body.email,
              id: profile.id,
              displayName: profile.displayName,
              avatar: profile._json.photo_400_orig,
            };
            done(null, socialProfile);
          } catch (err) {
            done(err, null);
          }
        },
      ),
    );
  }
}
