import { SchemaDefinitionProperty, Types } from "mongoose";
import { IBase } from "types";

export interface IAgora extends IBase {
    channelId: Types.ObjectId;
    agoraToken: string;
    expiredAt: SchemaDefinitionProperty<number>;
    startedAt: SchemaDefinitionProperty<number>;
    endedAt: SchemaDefinitionProperty<number>;
}
