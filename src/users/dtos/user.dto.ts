import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Expose()
  frist_name: string;
  @Expose()
  last_name: string;
  @Expose()
  mobile_number: number;
}
