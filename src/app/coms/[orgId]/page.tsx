import {AutoPaginatable, OrganizationMembership, WorkOS} from "@workos-inc/node";
import Jobscom from "@/app/components/Jobscom";
import {ComModel} from "@/models/Com";
import mongoose from "mongoose";
import {withAuth} from "@workos-inc/authkit-nextjs";

type PageProps = {
    params: {
        orgId: string;
    }
};

export default async function OrganizationComsPage (props:PageProps){
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const org = await workos.organizations.getOrganization(props.params.orgId);
    const {user} = await withAuth();
    await mongoose.connect(process.env.MONGO_URI as string);
    const comsDocs= JSON.parse(JSON.stringify(await ComModel.find({orgId:org.id})));
    let oms:AutoPaginatable<OrganizationMembership>|null = null;

    if(user){
        oms = await workos.userManagement.listOrganizationMemberships({
            userId: user.id,
        });

    }

    for (const com of comsDocs){
        const org= await workos.organizations.getOrganization(com.orgId);
        com.orgName = org.name;
        if (oms && oms.data.length > 0){
            com.isAdmin= !!oms.data.find(om => om.organizationId === com.orgId);
        }

    }

    return(
        <div>

            <div className="container my-6">
                <h1 className="text-xl">{org.name} </h1>
            </div>
            <Jobscom coms={comsDocs} header={"Communities posted by "+org.name}/>
        </div>

    );

}