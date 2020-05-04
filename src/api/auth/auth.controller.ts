import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import LoginRequestDto from './dto/login.request.dto';
import JwtUserPayload from './dto/jwtUserPayload.dto';
import { LocalAuthGuard } from '../../guards/localAuth.guard';

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
}
