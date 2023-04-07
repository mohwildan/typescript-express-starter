import { HttpContext } from '../lib/api/httpContext';

export class Service {
  public service_post = new HttpContext({
    baseUrl: 'https://pokeapi.co',
  });
}
