import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PostsListEvent, POSTS_LIST_EVENT } from '../events/posts-list.event';

@Injectable()
export class PostsListener {
  private readonly logger: Logger = new Logger(PostsListener.name);

  @OnEvent(POSTS_LIST_EVENT)
  handlePostsList(payload: PostsListEvent) {
    this.logger.log(payload.payload.length);
  }
}
