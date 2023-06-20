import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import admin from 'src/config/firebase.config';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    //console.log(req.headers);
    try {
      const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
      req.seller = firebaseUser;
      next();
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ err: 'Invalid or expired token' });
    }
  }
}
