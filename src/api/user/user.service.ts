import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import UserDto from './dtos/user.dto';
import RegisterRequestDto from './dtos/register.request.dto';
import { SocialType } from './entities/socialType';
import { SocialEntity } from './entities/social.entity';
import UpdateProfileRequest from './dtos/updateProfileRequest';
import ApiException from '../../exceptions/api.exception';
import SocialProfile from '../auth/dto/socialProfile';
import { generateDigits } from '../../utils/utils';
import { EventService } from '../../event/event.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SocialEntity)
    private readonly socialRepository: Repository<SocialEntity>,
    private readonly eventService: EventService,
  ) {}

  public async validateUser(email: string, attempt: string): Promise<UserDto> {
    const findedUser = await this.userRepository.findOne({ email });
    if (findedUser) {
      const compared = await findedUser.comparePassword(attempt);
      if (compared) {
        return UserDto.convertFromEntityToDto(findedUser);
      } else {
        return null;
      }
    }
    return null;
  }

  public async findOne(email: string): Promise<UserDto> {
    const findedUser = await this.userRepository.findOne(
      { email },
      { relations: ['socials'] },
    );
    if (findedUser) {
      return UserDto.convertFromEntityToDto(findedUser);
    }
    return null;
  }

  public async findById(id: string): Promise<UserDto> {
    const findedUser = await this.userRepository.findOne(
      { id },
      { relations: ['socials'] },
    );
    if (findedUser) {
      return UserDto.convertFromEntityToDto(findedUser);
    }
    return null;
  }

  public async findBySocialId(
    type: SocialType,
    socialId: string,
  ): Promise<UserDto> {
    const findedSocial = await this.socialRepository.findOne(
      {
        socialId,
        type,
      },
      { relations: ['user'] },
    );
    if (findedSocial) {
      return UserDto.convertFromEntityToDto(findedSocial.user);
    }
    return null;
  }

  public async updateUser(
    id: string,
    updateProfile: UpdateProfileRequest,
  ): Promise<UserDto> {
    const findedUser = await this.userRepository.findOne({ id });
    if (!findedUser) {
      throw new ApiException('user not found', 401);
    } else {
      let isChanged = false;
      if (
        updateProfile.displayName &&
        updateProfile.displayName !== findedUser.displayName
      ) {
        findedUser.displayName = updateProfile.displayName;
        isChanged = true;
      }
      if (updateProfile.avatar && updateProfile.avatar !== findedUser.avatar) {
        findedUser.avatar = updateProfile.avatar;
        isChanged = true;
      }
      const result = await this.userRepository.save(findedUser);
      const updatedProfile = await this.userRepository.findOne(
        { id },
        { relations: ['socials'] },
      );
      return UserDto.convertFromEntityToDto(updatedProfile);
    }
  }

  public async createUser(
    createUserRequest: RegisterRequestDto,
    isConfirmed = false,
    isOvveride = true,
  ): Promise<UserDto> {
    let createdOrUpdatedUser: UserEntity;
    createdOrUpdatedUser = await this.userRepository.findOne(
      {
        email: createUserRequest.email,
      },
      { relations: ['socials'] },
    );
    if (!isOvveride && createdOrUpdatedUser) {
      throw new ApiException('User already is exists', 800);
    }
    if (!createdOrUpdatedUser) {
      createdOrUpdatedUser = new UserEntity();
      createdOrUpdatedUser.password = createUserRequest.password;
      createdOrUpdatedUser.avatar = createUserRequest.avatar;
      createdOrUpdatedUser.confirmed = isConfirmed;
      createdOrUpdatedUser.confirmationCode = generateDigits(9);
      createdOrUpdatedUser.displayName = createUserRequest.displayName;
      createdOrUpdatedUser.email = createUserRequest.email;
      createdOrUpdatedUser.socials = [];
    }

    if (createUserRequest.socialId && createUserRequest.socialType) {
      const socialEntity = new SocialEntity();
      socialEntity.type = createUserRequest.socialType;
      socialEntity.socialId = createUserRequest.socialId;
      createdOrUpdatedUser.socials.push(socialEntity);
    }

    const createdUser = await this.userRepository.save(createdOrUpdatedUser);
    await this.eventService.createUser({
      userId: createdUser.id,
      login: createdUser.displayName
        ? createdUser.displayName
        : createdUser.email,
      email: createdUser.email,
      phone: '-',
    });

    if (!isConfirmed) {
      await this.eventService.sendConfirmationEmail({
        userId: createdOrUpdatedUser.id,
        code: createdOrUpdatedUser.confirmationCode,
        email: createdOrUpdatedUser.email,
        login: createdOrUpdatedUser.displayName,
      });
    }
    return UserDto.convertFromEntityToDto(createdUser);
  }

  public async attachSocial(
    userId: string,
    socialType: SocialType,
    socialProfile: SocialProfile,
  ): Promise<UserDto> {
    const findedLink = await this.socialRepository.findOne({
      where: { socialId: socialProfile.id, type: socialType },
    });
    if (findedLink) {
      // update
      throw new ApiException(
        'This social profile was connected to another account',
        500,
      );
    } else {
      const newLink = new SocialEntity();
      newLink.type = socialType;
      newLink.socialId = socialProfile.id;
      newLink.userId = userId;
      await this.socialRepository.save(newLink);
    }
    return this.findById(userId);
  }

  public async confirmEmail(email: string, code: string): Promise<boolean> {
    const findedUser = await this.userRepository.findOne({
      where: { email: email, confirmationCode: code },
    });

    if (findedUser) {
      findedUser.confirmed = true;
      await this.userRepository.save(findedUser);
      return true;
    } else {
      throw new ApiException('code is not correct', 401);
    }
  }

  public async recoverPassword(email: string): Promise<boolean> {
    const findedUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!findedUser) {
      throw new ApiException('user not found', 404);
    }

    findedUser.confirmationCode = generateDigits(9);
    await this.eventService.sendRecoveryPassword({
      userId: findedUser.id,
      code: findedUser.confirmationCode,
      email: findedUser.email,
      login: findedUser.displayName,
    });
    return true;
  }

  public async resetPassword(email: string, code: string, password: string) {
    const findedUser = await this.userRepository.findOne({
      where: { email: email, confirmationCode: code },
    });

    if (findedUser) {
      findedUser.password = password;
      await findedUser.hash();
      await this.userRepository.save(findedUser);
      return true;
    } else {
      throw new ApiException('code is not correct', 401);
    }
  }
}
