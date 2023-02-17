import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PasswordResetService {
  constructor(private userService: UsersService) {}

  // send password reset request API
  // verify reset OTP API
  // Reset Password API
}
