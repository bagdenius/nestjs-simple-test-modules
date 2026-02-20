import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import type { ArtistResponse } from './interfaces/artist.interface';
import type { AuthResponse } from './interfaces/auth-response.interface';
import { AlbumResponse } from './interfaces/album.interface';

@Injectable()
export class SpotifyService {
  private accessToken: string | null;
  private tokenExpriry: number = 0;

  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.CLIENT_ID = configService.getOrThrow('SPOTIFY_CLIENT_ID');
    this.CLIENT_SECRET = configService.getOrThrow('SPOTIFY_CLIENT_SECRET');
  }

  private async authenticate(): Promise<void> {
    if (this.accessToken && Date.now() < this.tokenExpriry) return;
    const credentials = Buffer.from(
      `${this.CLIENT_ID}:${this.CLIENT_SECRET}`,
    ).toString('base64');
    const response = await firstValueFrom(
      this.httpService.post<AuthResponse>(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );
    this.accessToken = response.data.access_token;
    this.tokenExpriry = Date.now() + response.data.expires_in * 1000;
  }

  async getArtist(id: string): Promise<ArtistResponse> {
    await this.authenticate();
    const response = await firstValueFrom(
      this.httpService.get<ArtistResponse>(
        `https://api.spotify.com/v1/artists/${id}`,
        { headers: { Authorization: `Bearer ${this.accessToken}` } },
      ),
    );
    return response.data;
  }

  async getAlbum(id: string): Promise<AlbumResponse> {
    await this.authenticate();
    const response = await firstValueFrom(
      this.httpService.get<AlbumResponse>(
        `https://api.spotify.com/v1/albums/${id}`,
        { headers: { Authorization: `Bearer ${this.accessToken}` } },
      ),
    );
    return response.data;
  }
}
