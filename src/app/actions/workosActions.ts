'use server';
import {WorkOS} from "@workos-inc/node";
const workos = new WorkOS(process.env.WORKOS_API_KEY);


export async function createOrganization(orgName: string, userId:string){
    'use server';
    const org = await workos.organizations.createOrganization({name: orgName});
    return await workos.userManagement.createOrganizationMembership({
        userId,
        organizationId: org.id,
        roleSlug: 'admin',
    })
}