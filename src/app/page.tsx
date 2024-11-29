import mongoose from 'mongoose';
import Hero from "@/app/components/Hero";
import Jobscom from "@/app/components/Jobscom";
import { addOrgAndUserData, ComModel } from "@/models/Com";
import { withAuth } from "@workos-inc/authkit-nextjs";

async function initializeDatabase() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });
    }
}

export default async function Home() {
    try {
        await initializeDatabase();
        const { user } = await withAuth();
        const latestComs = await addOrgAndUserData(
            await ComModel.find({}, {}, { limit: 5, sort: '-createdAt' }),
            user,
        );
        return (
            <>
                <Hero />
                <Jobscom header={''} coms={latestComs} />
            </>
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return (
            <>
                <Hero />
                <p>Error loading data. Please try again later.</p>
            </>
        );
    }
}
