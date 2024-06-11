import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose

const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops';
const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 150
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

export const shopModel =  model(DOCUMENT_NAME, shopSchema);