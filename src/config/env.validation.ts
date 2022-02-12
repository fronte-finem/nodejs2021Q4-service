import { config as dotEnvBootstrap } from 'dotenv';
import { Expose, plainToClass, Transform } from 'class-transformer';
import {
  IsAscii,
  IsBoolean,
  IsEnum,
  IsLowercase,
  IsNumber,
  IsPort,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { LOG_LEVELS, WinstonLogLevel } from '../logger/logger.types';

enum NodeEnv {
  Development = 'development',
  Production = 'production',
}

export class EnvironmentVariables {
  @Expose()
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv = NodeEnv.Development;

  @Expose()
  get isProd(): boolean {
    return this.NODE_ENV === NodeEnv.Production;
  }

  @Expose()
  get isDev(): boolean {
    return this.NODE_ENV === NodeEnv.Development;
  }

  @Expose()
  @IsBoolean()
  USE_FASTIFY: boolean = false;

  @Expose()
  @IsString()
  @Length(1, 100)
  HOST: string = 'localhost';

  @Expose()
  @IsPort()
  PORT: string = '1234';

  @Expose()
  get address(): { port: number; host: string } {
    return { port: Number(this.PORT), host: this.HOST };
  }

  @Expose()
  @Transform(({ value }) => (value.toLowerCase() in LOG_LEVELS ? value : 'verbose'), {
    toClassOnly: true,
  })
  LOG_LEVEL: WinstonLogLevel = 'verbose';

  @Expose()
  @IsString()
  @Length(3, 12)
  @IsAscii()
  @IsLowercase()
  OPEN_API_ROUTE: string = 'doc';

  @Expose()
  @IsNumber()
  @Min(7)
  @Max(13)
  BCRYPT_HASH_ROUNDS: number = 10;

  @Expose()
  @IsString()
  @Length(7)
  JWT_KEY: string = 'jwt_key';

  @Expose()
  @IsString()
  @Matches(/^\d+\s?[a-z]*/)
  JWT_EXPIRES_IN: string = '24h';

  @Expose()
  @IsString()
  @Length(1)
  UPLOAD_DEST: string = 'uploads';

  @Expose()
  @IsString()
  @Length(3, 12)
  @IsAscii()
  @IsLowercase()
  UPLOAD_FORM_FIELD_NAME: string = 'filename';

  @Expose()
  @IsNumber()
  @Min(1024)
  @Max(1024 ** 3)
  UPLOAD_FILE_SIZE_LIMIT: number = 1024 ** 2 * 10;
}

export function validateEnvVars(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  });

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

dotEnvBootstrap({ debug: true });
export const envVars: EnvironmentVariables = validateEnvVars(process.env);
