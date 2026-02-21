import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { ArtistDto } from '../src/api/artist/dto';
import { PrismaService } from '../src/infra/prisma/prisma.service';

const dto: ArtistDto = { name: 'Post Malone', genre: 'Hip-Hop' };

describe('ArtistController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.artist.deleteMany();
    await app.close();
  });

  it('POST /v1/artists - should create artist', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/artists')
      .send(dto)
      .expect(201);

    expect(response.body).toMatchObject(dto);
    expect(response.body).toHaveProperty('id');
  });

  it('GET /v1/artists/:id - should return an artist by id', async () => {
    const created = await request(app.getHttpServer())
      .post('/v1/artists')
      .send(dto)
      .expect(201);
    const artistId = created.body.id;
    const response = await request(app.getHttpServer())
      .get(`/artists/${artistId}`)
      .expect(200);
    expect(response.body).toMatchObject({
      id: artistId,
      name: dto.name,
      genre: dto.genre,
    });
  });

  it('GET /v1/artists/:id - should return 404 not found', async () => {
    await request(app.getHttpServer())
      .get('/v1/artists/non-existent-id')
      .expect(404);
  });
});
