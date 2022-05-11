import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import {
  JSON_PLACE_HOLDER_SERVICE_OPTIONS,
  LIMIT_DEFAULT,
  OFFSET_DEFAULT,
} from './constants';
import {
  AlbumDto,
  CommentDto,
  JsonPlaceHolderModuleOptions,
  PaginatedResourceOptions,
  PhotoDto,
  PostDto,
  TodoDto,
  UserDto,
} from './interfaces';

@Injectable()
export class JsonPlaceHolderService {
  constructor(
    @Inject(JSON_PLACE_HOLDER_SERVICE_OPTIONS)
    private readonly options: JsonPlaceHolderModuleOptions,
  ) {}

  private request<T>({
    url,
    method,
    headers,
    params,
    data,
  }: AxiosRequestConfig): AxiosPromise<T> {
    const { baseUrl: baseURL } = this.options;

    return axios({ baseURL, url, method, headers, params, data });
  }

  getUser(id: number) {
    return this.request<UserDto>({ url: `users/${id}` });
  }

  getPost(id: number) {
    return this.request<PostDto>({
      url: `posts/${id}`,
    });
  }

  getAlbum(id: number) {
    return this.request<AlbumDto>({
      url: `albums/${id}`,
    });
  }

  getPhoto(id: number) {
    return this.request<PhotoDto>({
      url: `photos/${id}`,
    });
  }

  getTodo(id: number) {
    return this.request<TodoDto>({
      url: `todos/${id}`,
    });
  }

  getComment(id: number) {
    return this.request<CommentDto>({
      url: `comments/${id}`,
    });
  }

  getUsers({
    limit: _limit = LIMIT_DEFAULT,
    offset: _start = OFFSET_DEFAULT,
  }: PaginatedResourceOptions) {
    return this.request<UserDto[]>({
      url: 'users',
      params: {
        _limit,
        _start,
      },
    });
  }

  getPosts({
    limit: _limit = LIMIT_DEFAULT,
    offset: _start = OFFSET_DEFAULT,
  }: PaginatedResourceOptions) {
    return this.request<PostDto[]>({
      url: 'posts',
      params: {
        _limit,
        _start,
      },
    });
  }

  getComments({
    limit: _limit = LIMIT_DEFAULT,
    offset: _start = OFFSET_DEFAULT,
  }: PaginatedResourceOptions) {
    return this.request<CommentDto[]>({
      url: 'comments',
      params: {
        _limit,
        _start,
      },
    });
  }

  getAlbums({
    limit: _limit = LIMIT_DEFAULT,
    offset: _start = OFFSET_DEFAULT,
  }: PaginatedResourceOptions) {
    return this.request<AlbumDto[]>({
      url: 'albums',
      params: {
        _limit,
        _start,
      },
    });
  }

  getPhotos({
    limit: _limit = LIMIT_DEFAULT,
    offset: _start = OFFSET_DEFAULT,
  }: PaginatedResourceOptions) {
    return this.request<PhotoDto[]>({
      url: 'photos',
      params: {
        _limit,
        _start,
      },
    });
  }

  getTodos({
    limit: _limit = LIMIT_DEFAULT,
    offset: _start = OFFSET_DEFAULT,
  }: PaginatedResourceOptions) {
    return this.request<TodoDto[]>({
      url: 'todos',
      params: {
        _limit,
        _start,
      },
    });
  }
}
