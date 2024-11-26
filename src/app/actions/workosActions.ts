'use server';
import {WorkOS} from "@workos-inc/node";
import {revalidatePath} from "next/cache";
import { redirect } from "next/dist/client/components/redirect";
const workos = new WorkOS(process.env.WORKOS_API_KEY);


export async function createOrganization(orgName: string, userId:string){
    'use server';
    const org = await workos.organizations.createOrganization({name: orgName});
    await workos.userManagement.createOrganizationMembership({
        userId,
        organizationId: org.id,
        roleSlug: 'admin',
    })
    revalidatePath('/new-com')
    redirect('/new-com');
}