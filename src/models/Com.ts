import {model, models, Schema} from 'mongoose';

/*
export type Com = {
    _id: string;
    title: string;
    description: string;
    orgName?: string;
    orgIcon: string;
    contactPhoto: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    initiatives: string;
    comPhoto: string;
    orgId: string;
    createdAt: string;
    updatedAt: string;
    isAdmin?: boolean;
};
*/

const ComSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    orgIcon: {type: String},
    orgId: {type: String},
    contactPhoto: {type: String},
    contactName: {type: String, required: true},
    contactPhone: {type: String, required: true},
    contactEmail: {type: String, required: true},
    initiatives: {type: [String], required: true },
    comPhoto: {type: String},

    });
export const ComModel = models?.Com || model('Com', ComSchema);