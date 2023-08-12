import { IsEnum, IsString, IsNumber, validateSync } from 'class-validator';
import { plainToInstance, Transform } from 'class-transformer';

enum Environment {
  DEV = 'dev',
  QA = 'qa',
  STAGING = 'staging',
  PROD = 'prod',
  TEST = 'test',
}

export class EnvVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  PORT: number;

  @IsString()
  OWNERS_AND_CATS_DB: string;

  @IsString()
  WOLVES_DB: string;
}

/**
 * Define a synchronous validate function which attempts to validate our env variables that
 * have been merged into process.env object. If this function throws an error, it will
 * prevent our application from bootstrapping.
 */
export function validate(config: Record<string, unknown>) {
  const envVariables = plainToInstance(EnvVariables, config);

  const errors = validateSync(envVariables, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return envVariables;
}
