'use server';

import {ComModel} from "@/models/Com";
import mongoose from "mongoose";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";


export async function saveComAction(formdata: FormData) {
    await mongoose.connect(process.env.MONGO_URI as string);
    const{id, ...comData} = Object.fromEntries(formdata);
    const comDoc = (id)
        ? await ComModel.findByIdAndUpdate(id, comData)
        : await ComModel.create(comData);

    if ('orgId' in comData){
        revalidatePath('/coms/'+comData?.orgId);
    }


    return JSON.parse( JSON.stringify(comDoc));
}