import { Injectable } from '@nestjs/common';
import JwtUserPayload, { UserPayload } from './dto/jwtUserPayload.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import UserDto from '../user/dtos/user.dto';
import { SocialType } from '../user/entities/socialType';
import RegisterRequestDto from '../user/dtos/register.request.dto';
import SocialProfile from './dto/socialProfile';

@Injectable()
export class AuthService {
  private url: string;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.url = `http://localhost:1337`;
  }

  public async validateUser(
    username: string,
    pass: string,
  ): Promise<UserPayload> {
    const user = await this.userService.validateUser(username, pass);
    if (user) {
      return UserPayload.createFromUserDto(user);
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

  public async loginBySocial(
    type: SocialType,
    socialProfile: SocialProfile,
  ): Promise<UserPayload> {
    const existingUser: UserDto = await this.userService.findBySocialId(
      type,
      socialProfile.id,
    );

    if (existingUser) {
      return UserPayload.createFromUserDto(existingUser);
    } else {
      const email: string = socialProfile.email;
      const createUserRequest = new RegisterRequestDto();
      createUserRequest.email = email;
      createUserRequest.socialType = type;
      createUserRequest.avatar = socialProfile.avatar;
      createUserRequest.displayName = socialProfile.displayName;
      createUserRequest.socialId = socialProfile.id;

      const user = await this.userService.createUser(createUserRequest, true);
      return UserPayload.createFromUserDto(user);
    }
  }
}
