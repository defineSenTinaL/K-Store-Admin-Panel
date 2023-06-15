import { Injectable, NestMiddleware } from '@nestjs/common';
import admin from 'src/config/firebase.config';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch((error) => {
        // Handle authentication error
        console.log(error.message);
        next();
      });
  }
}
