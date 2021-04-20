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

