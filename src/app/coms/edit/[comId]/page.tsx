import mongoose from "mongoose";
import {ComModel} from "@/models/Com"
import {withAuth} from "@workos-inc/authkit-nextjs";
import {WorkOS} from "@workos-inc/node";
import CommunityForm from "@/app/components/CommunityForm";


type PageProps = {
    params: {
        comId: string;
    };
};

export default async function EditComPage(pageProps:PageProps){
    const comId = pageProps.params.comId;
    await mongoose.connect(process.env.MONGO_URI as string);
    const comDoc = await ComModel.findById(comId);
    if (!comDoc){
        return 'Not Found';
    }

    const {user} = await withAuth();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    if (!user){
        return 'You need to be logged in';
    }

    const oms= await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
        organizationId: comDoc.orgId,
    });

    if(oms.data.length === 0){
        return 'Access denied';
    }
    return(
        <div>
            <CommunityForm orgId={comDoc.orgId} comDoc={comDoc}/>
        </div>
    );
}