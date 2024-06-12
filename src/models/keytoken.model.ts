import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';
const keySchema = new mongoose.Schema({
    name: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    publicKey: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

export const keyTokenModel =  model(DOCUMENT_NAME, keySchema);