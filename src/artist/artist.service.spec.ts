import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import { NotFoundException } from '@nestjs/common';

const artistId = uuidv4();
const artists: Artist[] = [
  {
    id: artistId,
    name: 'Billie Eilish',
    genre: 'Pop',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'The Weeknd',
    genre: 'Pop',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Eminem',
    genre: 'Rap',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const artist: Artist = artists[0];
const dto: ArtistDto = { name: artist.name, genre: artist.genre };

const prismaServiceMock = {
  artist: {
    findMany: jest.fn().mockResolvedValue(artists),
    findUnique: jest.fn().mockResolvedValue(artist),
    create: jest.fn().mockResolvedValue(artist),
  },
};

describe('Artist Service', () => {
  let service: ArtistService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    service = module.get(ArtistService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of artists', async () => {
    const result = await service.findAll();
    expect(result).toEqual(artists);
  });

  it('should return a single artist by id', async () => {
    const result = await service.findOne(artistId);
    expect(result).toEqual(artist);
  });

  it('should throw not found exception', async () => {
    try {
      await service.findOne('not-existent-id');
    } catch (error: any) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Artist not found');
    }
  });

  it('should create a new artist', async () => {
    const result = await service.create(dto);
    expect(result).toEqual(artist);
  });
});
