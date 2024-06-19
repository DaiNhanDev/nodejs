import { pick } from "lodash";

export * from "./auth/auth.utils";
export * from "./encrypt";
export * from "./auth/auth.utils";

export const getInfoData = (fields: string[], object = {}) =>
  pick(object, fields);
