import {
  Controller,
  UseGuards,
  Get,
  Post,
  Request,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
import UserDto from './dtos/user.dto';
import JwtUserPayload, { UserPayload } from '../auth/dto/jwtUserPayload.dto';
import { User } from '../../guards/user.decorator';
import RegisterRequestDto from './dtos/register.request.dto';

@ApiTags('user')
@Controller('user')
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
    return this.userService.createUser(request);
  }
}
