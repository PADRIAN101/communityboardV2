import { ComModel } from "@/models/Com";
import mongoose from "mongoose";
import Image from "next/image";

type PageProps = {
    params: {
        comId: string;
    };
};

// Function to format initiatives
const formatInitiatives = (initiatives: string[]) => {
    return initiatives
        .map(initiative => initiative
            .replace(/[\[\]"]/g, '')  // Remove brackets and quotes
            .replace(/\s+/g, ' ')     // Replace multiple spaces with one
        )
        .join(' · ');                 // Join the initiatives with a middle dot (·)
};

export default async function SingleComPage(props: PageProps) {
    const comId = props.params.comId;

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI as string);

    // Fetch the community document
    const comDoc = await ComModel.findById(comId);

    // Safely handle cases where comDoc is not found
    if (!comDoc) {
        return <div>Community not found.</div>;
    }

    // Format initiatives
    const formattedInitiatives = comDoc.initiatives
        ? formatInitiatives(comDoc.initiatives)
        : "No initiatives available";

    return (
        <div className="container mt-8 my-6">
            <div className="sm:flex">
                <div className="grow">
                    <h1 className="text-4xl mb-2">{comDoc.title}</h1>
                    <div className="capitalize text-sm text-emerald-800 mb-4">
                        {formattedInitiatives} {/* Display the formatted initiatives */}
                    </div>
                </div>
                <div>
                    <Image
                        src={comDoc?.orgIcon}
                        alt={'org icon'}
                        width={500} height={500}
                        className="w-auto h-auto max-w-16 max-h-16"
                    />
                </div>
            </div>
            <div className="whitespace-pre-line text-sm text-gray-600">
                {comDoc.description}
            </div>
            <div className="flex gap-4">
            </div>
            <div className="mt-4 bg-gray-200 p-8 rounded-lg">
                <h3 className="font-bold mb-2">To support the community contact us:</h3>
                <div className="flex gap-4">
                    <Image
                        src={comDoc.contactPhoto}
                        alt={'contact person'}
                        width={500} height={500}
                        className="w-auto h-auto max-w-24 max-h-24"
                    />
                    <div className="flex content-center items-center">
                        {comDoc.contactName}<br/>
                        Email: {comDoc.contactEmail}<br/>
                        Phone: {comDoc.contactPhone}
                    </div>
                </div>
            </div>
        </div>
    );
}
