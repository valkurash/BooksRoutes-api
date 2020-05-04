import { Injectable } from '@nestjs/common';
import JwtUserPayload, { UserPayload } from './dto/jwtUserPayload.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    username: string,
    pass: string,
  ): Promise<UserPayload> {
    const user = await this.userService.validateUser(username, pass);
    if (user) {
      const userPayload: UserPayload = { userId: user.id, email: user.email };
      return userPayload;
    }
    return null;
  }

  public async login(payload: UserPayload): Promise<JwtUserPayload> {
    const jwtUserPayload: JwtUserPayload = {
      jwtToken: this.jwtService.sign(payload),
      userPayload: payload,
    };
    return jwtUserPayload;
  }
}
