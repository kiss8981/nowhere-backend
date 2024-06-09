import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Profile, Strategy } from 'passport-kakao';
import { ParsedQs } from 'qs';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  redirectState = new Map<string, string>();

  constructor(private readonly configService: ConfigService) {
    super({
      // 여기 적어준 정보를 가지고 카카오 서버에 POST /oauth/token 요청이 날아갑니다.
      clientID: configService.get('auth.kakao.clientId'),
      clientSecret: configService.get('auth.kakao.clientSecret'),
      callbackURL: `${configService.get('settings.backendUrl')}/auth/kakao`,
    });
  }
  authenticate(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    options?: any,
  ): void {
    const redirectUrl = req.query.redirectUrl;
    if (redirectUrl) {
      const state = Math.random().toString(36).substring(7);
      this.redirectState.set(state, redirectUrl as string);
      super.authenticate(req, {
        state,
        ...options,
      });
    } else {
      super.authenticate(req, options);
    }
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
