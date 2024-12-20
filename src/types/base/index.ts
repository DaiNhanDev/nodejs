import { SchemaDefinitionProperty, ObjectId } from "mongoose";

export interface Entity {
  _id?: ObjectId;
  createdAt: SchemaDefinitionProperty<number>;
  updatedAt: SchemaDefinitionProperty<number>;
}

export type UpdatedModel = {
  matchedCount: number;
  modifiedCount: number;
  acknowledged: boolean;
  upsertedId: unknown | ObjectId;
  upsertedCount: number;
};

export type RemovedModel = {
  deletedCount: number;
  deleted: boolean;
};

export type CreatedModel = {
  _id: ObjectId;
  created: boolean;
};

export type CreatedOrUpdateModel = {
  _id: ObjectId;
  created: boolean;
  updated: boolean;
};

export enum DatabaseOperationEnum {
  EQUAL = 'equal',
  NOT_EQUAL = 'not_equal',
  NOT_CONTAINS = 'not_contains',
  CONTAINS = 'contains'
}

export type DatabaseOperationCommand<T> = {
  property: keyof T;
  value: unknown[];
  command: DatabaseOperationEnum;
};
