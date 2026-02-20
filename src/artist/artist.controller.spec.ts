import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../generated/prisma/client';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

const artistId = uuidv4();
const artist: Artist = {
  id: artistId,
  name: 'The Weeknd',
  genre: 'Pop',
  createdAt: new Date(),
  updatedAt: new Date(),
};
const dto = { name: 'The Weeknd', genre: 'Pop' };

const artistServiceMock = {
  findAll: jest.fn().mockResolvedValue([artist]),
  findOne: jest.fn().mockResolvedValue(artist),
  create: jest.fn().mockResolvedValue(artist),
};

describe('Artist controller', () => {
  let controller: ArtistController;
  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        {
          provide: ArtistService,
          useValue: artistServiceMock,
        },
      ],
    }).compile();

    controller = module.get(ArtistController);
    service = module.get(ArtistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of artists', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([artist]);
  });

  it('should return single artist by id', async () => {
    const result = await controller.findOne(artistId);
    expect(result).toEqual(artist);
  });

  it('should throw not found exception', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValueOnce(new NotFoundException('Artist not found'));

    try {
      await controller.findOne('not-existent-id');
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
