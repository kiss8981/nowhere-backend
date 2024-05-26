import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // 여기 적어준 정보를 가지고 카카오 서버에 POST /oauth/token 요청이 날아갑니다.
      clientID: configService.get('auth.kakao.clientId'),
      clientSecret: configService.get('auth.kakao.clientSecret'),
      callbackURL: `${configService.get('settings.backendUrl')}/auth/kakao`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    try {
      const { _json } = profile;
      const user = {
        kakao: {
          ..._json,
        },
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
