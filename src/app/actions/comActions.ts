'use server';

import {ComModel} from "@/models/Com";
import mongoose from "mongoose";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";


export async function saveComAction(data: FormData) {
    await mongoose.connect(process.env.MONGO_URI as string);

    const comDoc = await ComModel.create (Object.fromEntries(data));
    if ('orgId' in data){
        revalidatePath('/coms/'+data?.orgId);
    }


    return JSON.parse( JSON.stringify(comDoc));
}