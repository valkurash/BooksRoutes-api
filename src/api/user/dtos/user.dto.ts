import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserEntity } from '../entities/user.entity';
import { SocialType } from '../entities/socialType';

export class SocialDto {
  isFacebook: boolean;
  isVkontakte: boolean;
  isGoogle: boolean;

  constructor() {
    this.isGoogle = false;
    this.isFacebook = false;
    this.isVkontakte = false;
  }
}

export default class UserDto {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  avatar: string;
  @ApiModelProperty()
  displayName: string;
  @ApiModelProperty()
  social: SocialDto;
  @ApiModelProperty()
  isAdmin: boolean;

  public static convertFromEntityToDto(entity: UserEntity): UserDto {
    const userDto = new UserDto();
    userDto.id = entity.id;
    userDto.email = entity.email;
    userDto.avatar = entity.avatar;
    userDto.displayName = entity.displayName;
    userDto.isAdmin = entity.isAdmin;
    if (entity.socials && entity.socials.length > 0) {
      const socialDto = new SocialDto();
      entity.socials.forEach(social => {
        if (social.type === SocialType.VKONTAKTE) {
          socialDto.isVkontakte = true;
        }
        if (social.type === SocialType.FACEBOOK) {
          socialDto.isFacebook = true;
        }
        if (social.type === SocialType.GOOGLE) {
          socialDto.isGoogle = true;
        }
      });
      userDto.social = socialDto;
    }

    return userDto;
  }
}
