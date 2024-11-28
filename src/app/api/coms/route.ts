import {ComModel} from "@/models/Com";
import mongoose from "mongoose";
import {NextRequest} from "next/server";

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    await mongoose.connect(process.env.MONGO_URI as string);
    await ComModel.deleteOne({
        _id: id,
    });
    return Response.json(true);
}