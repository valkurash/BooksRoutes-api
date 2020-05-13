import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import LoginRequestDto from './dto/login.request.dto';
import JwtUserPayload, { UserPayload } from './dto/jwtUserPayload.dto';
import { LocalAuthGuard } from '../../guards/localAuth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
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

  @UseGuards(AuthGuard('facebook'))
  @Post('/facebook')
  async authByFacebook(@Req() req) {
    const payload = req.user as UserPayload;
    return this.authService.login(payload);
  }

  @UseGuards(AuthGuard('vkontakte'))
  @Post('/vk')
  async authByVkontakte(@Req() req) {
    const payload = req.user as UserPayload;
    return this.authService.login(payload);
  }

  @UseGuards(AuthGuard('google'))
  @Post('/google')
  async authByGoogle(@Req() req) {
    const payload = req.user as UserPayload;
    return this.authService.login(payload);
  }

  //
  // @Post('facebook/token')
  // async requestJsonWebTokenAfterFacebookSignIn(
  //   @Request() req,
  // ): Promise<JwtUserPayload> {
  //   const payload = req.user as UserPayload;
  //   return this.authService.login(payload);
  // }
  //
  // @Get('vkontakte/token')
  // async requestJsonWebTokenAfterVkontakteSignIn(
  //   @Request() req,
  // ): Promise<JwtUserPayload> {
  //   const payload = req.user as UserPayload;
  //   return this.authService.login(payload);
  // }
}
