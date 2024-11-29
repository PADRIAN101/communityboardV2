import {ComModel} from "@/models/Com";
import mongoose from "mongoose";
import Image from "next/image";

type PageProps = {
    params: {
        comId: string;
    };
};

export default async function SingleComPage(props:PageProps) {
    const comId = props.params.comId;
    await mongoose.connect(process.env.MONGO_URI as string);
    const comDoc = await ComModel.findById(comId);
    return (
        <div className="container mt-8 my-6">
            <div className="sm:flex">
                <div className="grow">
                    <h1 className="text-4xl mb-2">{comDoc.title}</h1>
                    <div className="capitalize text-sm text-emerald-800 mb-4">
                        {comDoc.initiatives}{' '}
                        &middot;{' '}{comDoc.initiatives}{' '}
                        &middot;{' '}{comDoc.initiatives}{' '}
                    </div>
                </div>
                <div>
                    <Image
                        src={comDoc?.orgIcon} alt={'org icon'}
                        width={500} height={500}
                        className="w-auto h-auto max-w-16 max-h-16"
                    />
                </div>
            </div>
            <div className="whitespace-pre-line text-sm text-gray-600">
                {comDoc.description}
            </div>
            <div className="mt-4 bg-gray-200 p-8 rounded-lg">
                <h3 className="font-bold mb-2">To support contact us</h3>
                <div className="flex gap-4">
                    <Image
                        src={comDoc.contactPhoto}
                        alt={'contact person'}
                        width={500} height={500}
                        className="w-auto h-auto max-w-24 max-h-24"
                    />
                    <div className="flex content-center items-center">
                        {comDoc.contactName}<br />
                        Email: {comDoc.contactEmail}<br />
                        Phone: {comDoc.contactPhone}
                    </div>
                </div>
            </div>
        </div>
    );
}