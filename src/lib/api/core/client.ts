import * as https from 'https';
import axios, { AxiosInstance, Method, AxiosResponse } from 'axios';
import { HttpContextOptions } from '../interfaces';

interface ApiClientOptions extends HttpContextOptions {
  baseUrl: string;
  rpc?: AxiosInstance;
}

export type ClientRequestQuery = Record<string, any>;
export type ClientRequestBody = Record<string, any>;
export type ClientRequestHeader = Record<string, any>;

export interface ClientRequestOptions {
  path: string;
  method: Method;
  body?: ClientRequestBody;
  headers?: ClientRequestHeader;
  query?: ClientRequestQuery;
  retry?: boolean;
}

type ApiResCode = 200 | 400;
interface ApiResponse<T> {
  code: ApiResCode;
  success: boolean;
  msg: null | string;
  data: T;
}

class ApiClient {
  private readonly baseUrl: string;
  private readonly rpc: AxiosInstance;

  constructor(opt: ApiClientOptions) {
    this.baseUrl = opt.baseUrl;
    this.rpc = opt.rpc || axios;

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    this.rpc.defaults.httpsAgent = agent;
  }

  async request<T>({
    path,
    method,
    body = {},
    query = {},
    headers = {},
    retry = true,
  }: ClientRequestOptions): Promise<AxiosResponse<ApiResponse<T>>> {
    const url = `${this.baseUrl}${path}`;
    const param = {
      url,
      method,
      headers,
      params: {},
      data: body,
    };
    let res = await this.rpc.request<ApiResponse<T>>(param);
    if (retry && ![200, 201].includes(res.status)) {
      res = await this.request({
        path,
        method,
        query,
        body,
        headers,
        retry: false,
      });
    }
    return res;
  }
}

export default ApiClient;
export { ApiClientOptions, ApiClient };
