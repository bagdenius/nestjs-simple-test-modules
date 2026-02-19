import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieRequestDto, MovieResponseDto } from './dto/movie.dto';
import {
  ApiBody,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { title } from 'process';

@ApiTags('Movie')
@Controller({ path: 'movies' })
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Get all movies',
    description: 'Returns an array of all movies from dabatabase',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Found movies array',
    type: [MovieResponseDto],
  })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'Get movie by ID',
    description: 'Returns a movie details object by ID provided in params',
  })
  // @ApiParam({ name: 'id', type: 'string', description: 'Movie ID to found' })
  // @ApiQuery({
  //   name: 'year',
  //   type: 'number',
  //   description: 'Filter movies by release year',
  // })
  // @ApiHeader({ name: 'X-Auth-Token', description: 'Authorization token' })
  @ApiOkResponse({ description: 'Found movie object', type: MovieResponseDto })
  @ApiNotFoundResponse({
    description: 'Movie with provided ID not found',
    example: {
      status: 404,
      message: 'Movie not found',
      timestamp: '17851456',
      path: '/movies/718a276a-d9f6-4b5c-80ac-404b6c170d0b',
    },
  })
  @Get(':id')
  findById(@Param('id') id: string, @Query('year') releaseYear: number) {
    return this.movieService.findById(id);
  }

  @ApiOperation({ summary: 'Create movie' })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       title: { type: 'string', example: 'Fight Club' },
  //       releaseYear: { type: 'number', example: 1999 },
  //       imageUrl: {
  //         type: 'string',
  //         example: 'https://api.movie.image.com/fight-club-1.webp',
  //       },
  //       actorIds: {
  //         type: 'array',
  //         example: [
  //           '01fe0aee-d92d-4e46-ba4c-6995bcc00c07',
  //           '449577b9-3f2f-4424-8c6c-c2d3c330c153',
  //         ],
  //       },
  //     },
  //   },
  // })
  @Post()
  create(@Body() dto: MovieRequestDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieRequestDto) {
    return this.movieService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
