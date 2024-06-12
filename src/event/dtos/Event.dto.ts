import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class EventDto {
  @IsString({ message: '이슈 제목을 입력해주세요.' })
  title: string;

  @IsString({ message: '이슈 내용을 입력해주세요.' })
  @IsOptional()
  description: string;

  @IsBoolean({ message: '익명 여부를 선택해주세요.' })
  isAnonymous: boolean;

  @IsNumber({}, { message: '위도를 입력해주세요.' })
  latitude: number;

  @IsNumber({}, { message: '경도를 입력해주세요.' })
  longitude: number;

  @IsString({ message: '주소를 입력해주세요.' })
  @IsOptional()
  address: string;

  @IsString({ message: '장소를 입력해주세요.' })
  @IsOptional()
  addressOfplace: string;
}
