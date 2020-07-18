import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import LoginRequestDto from './dto/login.request.dto';
import JwtUserPayload, { UserPayload } from './dto/jwtUserPayload.dto';
import { LocalAuthGuard } from '../../guards/localAuth.guard';
import { AuthGuard } from '@nestjs/passport';
import { VkontakteGuard } from '../../guards/socials/vkontakte.guard';
import { SocialUser } from '../../guards/socialUser.decorator';
import SocialProfile from './dto/socialProfile';
import { SocialType } from '../user/entities/socialType';
import { GoogleGuard } from '../../guards/socials/google.guard';
import { FacebookGuard } from '../../guards/socials/facebook.guard';
import { ResponseInterceptor } from '../../filters/responseInterceptor';
import { AppleLoginStrategy } from './strategies/login/apple.login.strategy';
import { AppleGuard } from '../../guards/socials/apple.guard';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация' })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async post(
    @Request() req,
    @Body() request: LoginRequestDto,
  ): Promise<JwtUserPayload> {
    const payload = req.user as JwtUserPayload;

    return payload;
  }

  @UseGuards(FacebookGuard)
  @Post('/facebook')
  async authByFacebook(@SocialUser() user: SocialProfile) {
    const payload = await this.authService.loginBySocial(
      SocialType.FACEBOOK,
      user,
    );
    return this.authService.login(payload);
  }

  @UseGuards(VkontakteGuard)
  @Post('/vk')
  async authByVkontakte(@SocialUser() user: SocialProfile) {
    const payload = await this.authService.loginBySocial(
      SocialType.VKONTAKTE,
      user,
    );
    return this.authService.login(payload);
  }

  @UseGuards(GoogleGuard)
  @Post('/google')
  async authByGoogle(@SocialUser() user: SocialProfile) {
    const payload = await this.authService.loginBySocial(
      SocialType.GOOGLE,
      user,
    );
    return this.authService.login(payload);
  }

  @UseGuards(AppleGuard)
  @Post('/apple')
  async authByApple(@SocialUser() user: SocialProfile) {
    const payload = await this.authService.loginBySocial(
      SocialType.APPLE,
      user,
    );
    return this.authService.login(payload);
  }
}
