import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { getGraphQLConfig } from './config/graphql.config';
import { getSpotifyConfig } from './config/spotify.config';
import { FileModule } from './file/file.module';
import { SpotifyModule } from './spotify/spotify.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphQLConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ChatModule,
    ArtistModule,
    SpotifyModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getSpotifyConfig,
      inject: [ConfigService],
    }),
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'uploads'),
      serveRoot: '/static',
    }),
    TaskModule,
  ],
})
export class ApiModule {}
