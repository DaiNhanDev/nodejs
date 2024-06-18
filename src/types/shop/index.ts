import { RoleType } from "constants/index";
import { IBase } from "types";

export interface IShop extends IBase {
  name: string;
  email: string;
  password: string;
  status: "inactive" | "active";
  verify: boolean;
  roles: RoleType[];
}
