import { pick } from "lodash";
import { Types } from "mongoose";
export * from "./auth/auth.utils";
export * from "./encrypt";
export * from "./auth/auth.utils";

export const getInfoData = (fields: string[], object = {}) =>
  pick(object, fields);

export const getSelectData = (select: string[] = []) =>
  Object.fromEntries(select.map((m) => [m, 1]));

export const getUnSelectData = (select: string[] = []) =>
  Object.fromEntries(select.map((m) => [m, 0]));

export const removeUndefinedObject = (obj: any) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] === null || obj[k] === undefined) {
      delete obj[k];
    }
  });

  return obj;
};

export const updateNestedObjectParser = (obj: any) => {
  const final = {};

  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === "object" && !Array.isArray(obj[k])) {
      const response: any = updateNestedObjectParser(obj[k]);

      Object.keys(response).forEach((a) => {
        final[`${k}.${a}`] = response[a];
      });
    } else {
      final[k] = obj[k];
    }
  });

  return final;
};

export const convertToObjectId = (id: string) => new Types.ObjectId(id);
