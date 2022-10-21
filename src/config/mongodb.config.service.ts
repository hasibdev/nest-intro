import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  //You can retrun promise as well
  public createMongooseOptions(): MongooseModuleOptions {
    const url = this.configService.get<string>('DB_URL');

    const user = encodeURIComponent(this.configService.get<string>('DB_USER'));
    const pass = encodeURIComponent(
      this.configService.get<string>('DB_PASSWORD'),
    );
    const host = this.configService.get<string>('DB_HOST');
    const port = this.configService.get<number>('DB_PORT');
    const database = this.configService.get<string>('DB_NAME');
    const authSource = this.configService.get<string>('DB_AUTH_SOURCE');

    const remoteURI = `mongodb://${user}:${pass}@${host}:${port}/${database}?authSource=${authSource}&directConnection=true`;

    return {
      uri: url || remoteURI,
      useNewUrlParser: true,
    };
  }
}
