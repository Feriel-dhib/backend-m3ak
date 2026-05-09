import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

function mongoCommonOptions(configService: ConfigService) {
  const raw = configService.get<string>('MONGODB_SERVER_SELECTION_TIMEOUT_MS');
  const serverSelectionTimeoutMS = raw ? parseInt(raw, 10) : 15000;
  return Number.isFinite(serverSelectionTimeoutMS)
    ? { serverSelectionTimeoutMS }
    : { serverSelectionTimeoutMS: 15000 };
}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const extras = mongoCommonOptions(configService);

        const uri = configService.get<string>('MONGODB_URI');
        if (uri) {
          return { uri, ...extras };
        }

        const username = configService.get<string>('DB_USERNAME');
        const password = configService.get<string>('DB_PASSWORD');
        const cluster = configService.get<string>('DB_CLUSTER');
        const dbName = configService.get<string>('DB_NAME') || 'ma3ak';

        if (username && password && cluster) {
          const encodedPassword = encodeURIComponent(password);
          return {
            uri: `mongodb+srv://${username}:${encodedPassword}@${cluster}/${dbName}?retryWrites=true&w=majority`,
            ...extras,
          };
        }

        const nodeEnv = configService.get<string>('NODE_ENV');
        if (nodeEnv === 'production') {
          throw new Error(
            'MongoDB (production) : définissez MONGODB_URI ou bien DB_USERNAME, DB_PASSWORD et DB_CLUSTER.',
          );
        }

        return {
          uri: 'mongodb://localhost:27017/ma3ak',
          ...extras,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
