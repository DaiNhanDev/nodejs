import { IBase } from "types/base";

export interface IShop extends IBase {
  name: string;
  email: string;
  password: string;
  status: 'inactive' | 'active' ;
  verify: boolean;
  roles: string[];
}