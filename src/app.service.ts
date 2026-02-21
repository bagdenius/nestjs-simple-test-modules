import { Injectable, NotFoundException } from '@nestjs/common';
import { SpotifyService } from './api/spotify/spotify.service';
import { PrismaService } from './infra/prisma';

@Injectable()
export class AppService {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly prisma: PrismaService,
  ) {}

  async getArtist(id: string) {
    const artist = await this.spotifyService.getArtist(id);
    return artist;
  }

  async getAlbum(id: string) {
    const album = await this.spotifyService.getAlbum(id);
    return {
      id: album.id,
      title: album.name,
      releaseDate: album.release_date,
      image: album.images[0].url,
      tracks: album.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
      })),
    };
  }

  async getLinkByShortCode(shortCode: string) {
    const link = await this.prisma.link.findUnique({ where: { shortCode } });
    if (!link) throw new NotFoundException('Link not found');
    return link;
  }

  async trackClick(shortCode: string, ipAddress: string, userAgent: string) {
    const link = await this.getLinkByShortCode(shortCode);
    await this.prisma.click.create({
      data: { ipAddress, userAgent, link: { connect: { id: link.id } } },
    });
  }
}
