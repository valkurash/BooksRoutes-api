import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
import UserDto from './dtos/user.dto';
import { UserPayload } from '../auth/dto/jwtUserPayload.dto';
import { User } from '../../guards/user.decorator';
import RegisterRequestDto from './dtos/register.request.dto';
import UpdateProfileRequest from './dtos/updateProfileRequest';
import { AuthGuard } from '@nestjs/passport';
import SocialProfile from '../auth/dto/socialProfile';
import { GoogleGuard } from '../../guards/socials/google.guard';
import { VkontakteGuard } from '../../guards/socials/vkontakte.guard';
import { FacebookGuard } from '../../guards/socials/facebook.guard';
import { SocialUser } from '../../guards/socialUser.decorator';
import { SocialType } from './entities/socialType';
import { ResponseInterceptor } from '../../filters/responseInterceptor';
import ConfirmEmailRequest from './dtos/confirmEmail.request.dto';
import RecoverPasswordRequest from './dtos/recoverPassword.request.dto';
import ResetPasswordRequest from './dtos/resetPassword.request.dto';

@ApiTags('user')
@Controller('user')
@UseInterceptors(ResponseInterceptor)
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получение профиля' })
  @ApiResponse({ status: 200, type: UserDto })
  @UseGuards(JwtAuthGuard)
  @Get()
  public async get(@User() user: UserPayload): Promise<UserDto> {
    return this.userService.findById(user.userId);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200, type: UserDto })
  @Post('/register')
  public async post(
    @Request() req,
    @Body() request: RegisterRequestDto,
  ): Promise<UserDto> {
    return this.userService.createUser(request, false, false);
  }

  @ApiOperation({ summary: 'Отправить код на восстановление пароля' })
  @ApiResponse({ status: 200 })
  @Post('/recover')
  public async recoverPassword(
    @Request() req,
    @Body() request: RecoverPasswordRequest,
  ): Promise<boolean> {
    return this.userService.recoverPassword(request.email);
  }

  @ApiOperation({ summary: 'Восстановить пароль по коду' })
  @ApiResponse({ status: 200 })
  @Post('/reset')
  public async resetPassword(
    @Request() req,
    @Body() request: ResetPasswordRequest,
  ): Promise<boolean> {
    return this.userService.resetPassword(
      request.email,
      request.code,
      request.password,
    );
  }

  @ApiOperation({ summary: 'Подтверждение кода' })
  @ApiResponse({ status: 200 })
  @Post('/confirm')
  public async confirm(
    @Request() req,
    @Body() request: ConfirmEmailRequest,
  ): Promise<boolean> {
    return this.userService.confirmEmail(request.email, request.code);
  }

  @ApiOperation({ summary: 'Обновление профиля' })
  @ApiResponse({ status: 200, type: UserDto })
  @Patch()
  @UseGuards(JwtAuthGuard)
  public async patch(
    @User() user: UserPayload,
    @Body() request: UpdateProfileRequest,
  ): Promise<UserDto> {
    return this.userService.updateUser(user.userId, request);
  }

  @ApiOperation({ summary: 'Привязать фейсбук' })
  @UseGuards(JwtAuthGuard, FacebookGuard)
  @Post('/link/facebook')
  async linkFacebook(
    @SocialUser() socialProfile: SocialProfile,
    @User() user: UserPayload,
  ) {
    return this.userService.attachSocial(
      user.userId,
      SocialType.FACEBOOK,
      socialProfile,
    );
  }

  @ApiOperation({ summary: 'Привязать vk' })
  @UseGuards(JwtAuthGuard, VkontakteGuard)
  @Post('/link/vk')
  async linkVkontakte(
    @SocialUser() socialProfile: SocialProfile,
    @User() user: UserPayload,
  ) {
    return this.userService.attachSocial(
      user.userId,
      SocialType.VKONTAKTE,
      socialProfile,
    );
  }

  @ApiOperation({ summary: 'Привязать google' })
  @UseGuards(JwtAuthGuard, GoogleGuard)
  @Post('/link/google')
  async linkGoogle(
    @SocialUser() socialProfile: SocialProfile,
    @User() user: UserPayload,
  ) {
    return this.userService.attachSocial(
      user.userId,
      SocialType.GOOGLE,
      socialProfile,
    );
  }
}
