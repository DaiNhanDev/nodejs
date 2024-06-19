import { Schema } from "mongoose";
import { IBase } from "types";

export interface IApiKeys extends IBase {
  key: string;
  status: boolean;
  permissions: string[];
  // expired: number;
}
