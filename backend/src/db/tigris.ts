import { DB, Tigris } from '@tigrisdata/core';

export class TigrisDBService {
  private static tigrisDB: DB;

  static getTigrisDB(): DB {
    if (!TigrisDBService.tigrisDB) {
      const tigrisClient = new Tigris();
      TigrisDBService.tigrisDB = tigrisClient.getDatabase();
    }
    return TigrisDBService.tigrisDB;
  }
}
