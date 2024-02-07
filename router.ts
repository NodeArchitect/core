// router.js

import { IncomingMessage, ServerResponse } from "http";

class Router {
  routes: { path: string; handler: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void; }[];

  constructor() {
    this.routes = [];
  }

  addRoute(path: string, handler: { (req: IncomingMessage, res: ServerResponse<IncomingMessage>): void; (req: Request, res: Response): void; }) {
    this.routes.push({path, handler});
  }

  routeRequest(req: IncomingMessage, res: ServerResponse<IncomingMessage> & { req: IncomingMessage; }) {
    const { url } = req;
    console.log('url', url)

    for (const route of this.routes) {
      const { path, handler } = route;

      if (url === path) {
        return handler(req, res);
      }
    }

    // Si aucune route ne correspond, renvoyez une réponse 404.
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
}

export default Router;
