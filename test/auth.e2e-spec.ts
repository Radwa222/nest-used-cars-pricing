import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { appSetUp } from '../src/app-setup';

describe('Authentication Test', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    appSetUp(app);
    await app.init();
  });

  it('send a signup request and get status 201', async () => {
    const body = {
      email: 'radwa3.yasser@gmail.com',
      password: 'P@ssw0rd',
      frist_name: 'radwa',
      last_name: 'yasser',
    };
    const data_1 = request(app.getHttpServer());
    const bodyy = await data_1.post('/auth/signup').send(body).expect(201);
    expect(bodyy.body.email).toEqual(body.email);
  });
});
