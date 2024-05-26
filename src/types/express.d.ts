import { Request as Req } from 'express';

declare module 'express' {
  interface Request extends Req {
    user: {
      kakao?: {
        id: number;
        properties: {
          nickname: string;
          profile_image: string;
        };
      };
      userId?: number;
    };
  }
}
