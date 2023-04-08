import { Request } from 'express';
import { HttpContext } from '../lib/api/httpContext';

class Services {
  service_post = new HttpContext({
    baseUrl: 'https://pokeapi.co',
  });

  public saveService = async (req: Request) => {
    req.app.locals.services = {
      post: this.service_post.post,
    };
  };
}
export default Services;
