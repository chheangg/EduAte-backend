import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => ('' + value).toLowerCase())
  country: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => ('' + value).toLowerCase())
  city: string;
}
