import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { CommunitiesModule } from './communities/communities.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GenresModule } from './genres/genres.module';
import { MailModule } from './mail/mail.module';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import envValidations from './config/env.validation';
// this is a workaround for newer versions of TypeORM
if (!global.crypto) {
  const crypto = require('crypto');
  global.crypto = crypto;
}
const ENV = process.env.NODE_ENV; // this prvoides the current environment

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PostsModule,
    TagsModule,
    CommunitiesModule,
    CommentsModule,
    ReactionsModule,
    NotificationsModule,
    ConfigModule.forRoot({
      isGlobal: true, // make it available in all modules
      // envFilePath:['.env.development']
      envFilePath: !ENV ? '.env' : `.env.${ENV}`, // loads the proper .env file
      load: [appConfig, databaseConfig],
      validationSchema: envValidations, // enabling env validating with joi
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // you can access properties with the namespace you difned in the config file registerAs function
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('database.synchronize'), // warning, auto create the db on every app launch, don't use in production
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'), // your server pwd
        host: configService.get('database.host'),
        database: configService.get('database.name'), // your db name
      }),
    }),
    GenresModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
