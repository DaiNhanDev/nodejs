import { Schema, SchemaDefinitionProperty } from "mongoose";

export interface IBase {
  _id: Schema.Types.ObjectId;
  createdAt: SchemaDefinitionProperty<number>;
  updatedAt: SchemaDefinitionProperty<number>;
}
