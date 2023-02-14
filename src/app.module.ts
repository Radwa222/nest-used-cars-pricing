import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/reports.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CarBrandModule } from './car-brand/car-brand.module';
import { CarBrand } from './car-brand/entities/car-brand.entity';
import { CarModelModule } from './car-model/car-model.module';
import { CarModel } from './car-model/entities/car-model.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    CarBrandModule,
    CarModelModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          username: 'radwa',
          password: 'radwa',
          database: config.get('DB_NAME'),
          entities: [User, Report, CarBrand, CarModel],
          synchronize: true,
        };
      },
    }),
    CarBrandModule,
    CarModelModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
