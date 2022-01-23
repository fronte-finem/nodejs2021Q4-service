import { FastifySchema } from 'fastify';
import S, { StringSchema } from 'fluent-json-schema';

export const uuidKey: StringSchema = S.string().format('uuid');

export const foreignKey: StringSchema = uuidKey.raw({ nullable: true });

export const APP_SECURITY_SCHEME_ID = 'appSecurityScheme';

export const SECURITY_SCHEMA: FastifySchema = {
  security: [{ [APP_SECURITY_SCHEME_ID]: [] }],
};
