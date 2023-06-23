import { Injectable, NestMiddleware } from '@nestjs/common';
import admin from 'src/config/firebase.config';
import { LoggingService } from 'src/modules/logging/logging.service';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}
  async use(req: any, res: any, next: () => void) {
    //console.log(req.headers);
    try {
      const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
      req.seller = firebaseUser;
      const logMessage = `Successfully Authenticated (Firebase Middleware): ${req.seller}`;
      this.loggingService.log('info', logMessage);
      //console.log(req.seller);
      next();
    } catch (error) {
      const errorMessage = `Invalid or expired token (Firebase Middleware): ${req}`;
      this.loggingService.log('error', errorMessage);
      console.log(error.message);
      return res.status(401).json({ err: 'Invalid or expired token' });
    }
  }
}
