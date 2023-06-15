import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import serviceAccount from './fbServiceAccountKey.json';

const firebaseParams: admin.AppOptions = {
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
};

admin.initializeApp(firebaseParams);

export default admin;
