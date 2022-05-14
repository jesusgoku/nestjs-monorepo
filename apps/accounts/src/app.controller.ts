import {
  AlbumDto,
  CommentDto,
  JsonPlaceHolderService,
  PaginatedResourceOptions,
  PhotoDto,
  PostDto,
  TodoDto,
  UserDto,
} from '@app/json-place-holder';
import {
  CacheInterceptor,
  CacheTTL,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Logger,
  MessageEvent,
  Param,
  ParseIntPipe,
  Query,
  Sse,
  UseInterceptors,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';
import { interval, map, Observable, pipe } from 'rxjs';
import { AppService } from './app.service';
import { PostsListEvent, POSTS_LIST_EVENT } from './events/posts-list.event';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  private readonly logger: Logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly jsonPlaceHolderService: JsonPlaceHolderService,
    private readonly eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users/:id')
  @CacheTTL(3600)
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    const { data } = await this.jsonPlaceHolderService.getUser(id);

    return data;
  }

  @Get('posts/:id')
  async getPost(@Param('id', ParseIntPipe) id: number): Promise<PostDto> {
    const { data } = await this.jsonPlaceHolderService.getPost(id);

    return data;
  }

  @Get('albums/:id')
  async getAlbum(@Param('id', ParseIntPipe) id: number): Promise<AlbumDto> {
    const { data } = await this.jsonPlaceHolderService.getAlbum(id);

    return data;
  }

  @Get('photos/:id')
  async getPhoto(@Param('id', ParseIntPipe) id: number): Promise<PhotoDto> {
    const { data } = await this.jsonPlaceHolderService.getPhoto(id);

    return data;
  }

  @Get('comments/:id')
  async getComment(@Param('id', ParseIntPipe) id: number): Promise<CommentDto> {
    const { data } = await this.jsonPlaceHolderService.getComment(id);

    return data;
  }

  @Get('todos/:id')
  async getTodo(@Param('id', ParseIntPipe) id: number): Promise<TodoDto> {
    const { data } = await this.jsonPlaceHolderService.getTodo(id);

    return data;
  }

  @Get('posts')
  async getPosts(@Query() query: PaginatedResourceOptions): Promise<any[]> {
    const { data } = await this.jsonPlaceHolderService.getPosts(query);

    this.logger.log(`Emit: ${POSTS_LIST_EVENT}`);
    this.eventEmitter.emit(
      POSTS_LIST_EVENT,
      new PostsListEvent({ payload: data }),
    );

    return data;
  }

  @Get('users')
  async getUsers(@Query() query: PaginatedResourceOptions): Promise<UserDto[]> {
    const { data } = await this.jsonPlaceHolderService.getUsers(query);

    return data;
  }

  @Get('albums')
  async getAlbums(
    @Query() query: PaginatedResourceOptions,
  ): Promise<AlbumDto[]> {
    const { data } = await this.jsonPlaceHolderService.getAlbums(query);

    return data;
  }

  @Get('photos')
  async getPhotos(
    @Query() query: PaginatedResourceOptions,
  ): Promise<PhotoDto[]> {
    const { data } = await this.jsonPlaceHolderService.getPhotos(query);

    return data;
  }

  @Get('comments')
  async getComments(
    @Query() query: PaginatedResourceOptions,
  ): Promise<CommentDto[]> {
    const { data } = await this.jsonPlaceHolderService.getComments(query);

    return data;
  }

  @Get('todos')
  async getTodos(@Query() query: PaginatedResourceOptions): Promise<TodoDto[]> {
    const { data } = await this.jsonPlaceHolderService.getTodos(query);

    return data;
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map(() => ({ data: { hello: 'world' } })));
  }
}
