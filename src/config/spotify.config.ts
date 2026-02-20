import { ConfigService } from '@nestjs/config';
import type { SpotifyOptions } from '../spotify/interfaces/spotify-options.interface';

export function getSpotifyConfig(configService: ConfigService): SpotifyOptions {
  return {
    clientId: configService.getOrThrow<string>('SPOTIFY_CLIENT_ID'),
    clientSecret: configService.getOrThrow<string>('SPOTIFY_CLIENT_SECRET'),
  };
}
