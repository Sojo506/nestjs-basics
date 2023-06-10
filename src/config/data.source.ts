import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

// this config allows me to use the .env variables here
ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
})

const configService = new ConfigService()

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../.migrations/*{.ts,.js}'],
  synchronize: false, // This creates the tables automatically in each reset of the server
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy()
}

export const AppDS = new DataSource(DataSourceConfig)