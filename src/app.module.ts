import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './agt/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './agt/user/user.module';
import { OpportunityModule } from './agt/opportunity/opportunity.module';
import { CategoryModule } from './agt/category/category.module';
import { LocationModule } from './agt/Location/location.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.DATABASE_PORT),
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USER,
      autoLoadEntities: true,
      database: process.env.DATABASE_DB,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    OpportunityModule,
    CategoryModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
