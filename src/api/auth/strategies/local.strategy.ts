import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import JwtUserPayload, { UserPayload } from '../dto/jwtUserPayload.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ session: false, usernameField: 'email' });
  }

  public async validate(
    username: string,
    password: string,
  ): Promise<JwtUserPayload> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }
}
