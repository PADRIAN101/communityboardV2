'use server';

import {ComModel} from "@/models/Com";
import mongoose from "mongoose";


export async function saveComAction(data: FormData) {
    await mongoose.connect(process.env.MONGO_URI as string);

    const comDoc = await ComModel.create (Object.fromEntries(data));
    return JSON.parse( JSON.stringify(comDoc));
}