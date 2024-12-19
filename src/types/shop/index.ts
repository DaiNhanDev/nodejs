import { RoleType } from "constants/index";
import { Entity } from "types";

export interface IShop extends Entity {
  name: string;
  email: string;
  password: string;
  status: "inactive" | "active";
  verify: boolean;
  roles: RoleType[];
}
