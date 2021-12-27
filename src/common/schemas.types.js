import S from 'fluent-json-schema';

export const uuidKey = S.string().format('uuid');

export const foreignKey = uuidKey.raw({ nullable: true });
