import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'src/database/entities/photo.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,

    private readonly jwtService: JwtService,
  ) {}
  async kakaoValidateUser(profile: {
    id: number;
    properties: {
      nickname: string;
      profile_image: string;
    };
  }): Promise<{
    accessToken: string;
  }> {
    let user = await this.usersRepository.findOne({
      where: {
        socialId: String(profile.id),
      },
    });

    if (!user) {
      const newUser = new User();

      newUser.socialProvider = 'kakao';
      newUser.socialId = String(profile.id);
      newUser.name = profile.properties.nickname;
      user = await this.usersRepository.save(newUser);

      const newPhoto = new Photo();
      newPhoto.path = profile.properties.profile_image;
      newPhoto.entityId = user.id;
      newPhoto.entityType = 'user';
      await this.photosRepository.save(newPhoto);
    }

    const accessToken = this.generateAccessToken(user);
    return { accessToken };
  }

  async validateUser(userId: number): Promise<{
    id: number;
    name: string;
    profileImage: string;
  }> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .select(['user.id', 'user.name'])
      .addSelect('photo.path', 'photo_path')
      .leftJoin(
        'photo',
        'photo',
        'photo.entityId = user.id AND photo.entityType = :entityType',
        { entityType: 'user' },
      )
      .getRawOne();

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.user_id,
      name: user.user_name,
      profileImage: user.photo_path,
    };
  }

  generateAccessToken(user: User): string {
    const payload = {
      userId: user.id,
    };
    return this.jwtService.sign(payload);
  }
}
