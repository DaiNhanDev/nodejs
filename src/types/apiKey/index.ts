import { Entity } from "types";

export interface IApiKeys extends Entity {
  key: string;
  status: boolean;
  permissions: string[];
  // expired: number;
}
