import { Schema } from "joi";

import { Request, Response, NextFunction } from "express";
const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (!error) {
      next();
    } else {
      const { details } = error;
      const messages = details
        .map((i) => {
          if (i.type.includes(".unknown")) return null;
          if (i.type.includes(".empty") || i.type.includes(".required"))
            return `${i.context.label}_is_required`.toUpperCase();
          return i.message.toUpperCase();
        })
        .filter((f) => !!f);
      if (messages.length > 0) {
        res.status(400).json({ code: 400, messages });
      } else {
        next();
      }
    }
  };
};

export default validateRequest;
