import { Test, TestingModule } from '@nestjs/testing';
import { ResetPasswordsService } from './reset-passwords.service';

describe('ResetPasswordsService', () => {
  let service: ResetPasswordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResetPasswordsService],
    }).compile();

    service = module.get<ResetPasswordsService>(ResetPasswordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
