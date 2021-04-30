import * as mongoose from 'mongoose';

export const UrlSchema = new mongoose.Schema({
    urlHash: { type: String, required: true },
    urlCount: { type: Number, required: true }
});


export interface UrlCount extends mongoose.Document {
    id: string;
    urlHash: string;
    urlCount: number;
}

export const eventSchema = new mongoose.Schema({
    url: { type: String, required: true },
    hash: { type: String, required: true },
    createdBy: { type: String },
    createdAt: { type: Date },
    updatedBy: { type: String },
    updatedAt: { type: Date },
});


export interface eventsSchemaDb extends mongoose.Document {
    id: string;
    url: string;
    hash: string;
    createdBy: string;
    createdAt: mongoose.Date;
    updatedBy: string;
    updatedAt: mongoose.Date;
}