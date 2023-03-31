import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TrimMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
