import S, { StringSchema } from 'fluent-json-schema';

export const uuidKey: StringSchema = S.string().format('uuid');

export const foreignKey: StringSchema = uuidKey.raw({ nullable: true });
