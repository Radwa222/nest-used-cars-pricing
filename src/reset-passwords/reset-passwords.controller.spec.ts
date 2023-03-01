import { Test, TestingModule } from '@nestjs/testing';
import { ResetPasswordsController } from './reset-passwords.controller';

describe('ResetPasswordsController', () => {
  let controller: ResetPasswordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetPasswordsController],
    }).compile();

    controller = module.get<ResetPasswordsController>(ResetPasswordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
