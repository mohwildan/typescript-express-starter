import { ApiClient } from '../core/client';
import { Response } from '../interfaces';
require('dotenv/config');

interface ApiParam {
  id: any;
  header: any;
}

class ApiPost {
  protected client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getDetail(param: ApiParam): Promise<Response<ApiParam>> {
    try {
      const res = await this.client.request<any>({
        path: `/api/v2/pokemon/`,
        method: 'GET',
        headers: param.header,
      });
      return res.data;
    } catch (err) {
      if (err.response) {
        throw new Error(
          `[ERR : Post] ${err.response.data.message || err.message}`
        );
      }
      throw new Error(`[ERR : Post] ${err.message}`);
    }
  }
}

export { ApiPost };
export default ApiPost;
