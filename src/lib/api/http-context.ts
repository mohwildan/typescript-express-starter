import { ApiClient, ClientRequestOptions } from './core';
import { HttpContextOptions, Response } from './interfaces';
import { ApiPost } from './service/post';

export class HttpContext {
  readonly client: ApiClient;
  readonly post: ApiPost;

  constructor(opt: HttpContextOptions) {
    this.client = new ApiClient(opt);
    this.post = new ApiPost(this.client);
  }

  async request<T>(opt: ClientRequestOptions): Promise<Response<T>> {
    const res = await this.client.request<T>(opt);
    return res.data;
  }
}
