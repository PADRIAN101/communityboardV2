'use server';
import {withAuth} from "@workos-inc/authkit-nextjs";
import {WorkOS} from "@workos-inc/node"
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";

export default async function NewComPage(){

    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const {user} = await withAuth();

    if (!user) {
        return (
            <div className="container">
                <div> You need to be logged in to post a community</div>
            </div>
        );
    }

    const organizationMemberships= await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
    });

    const activeOrganizationMemberships = organizationMemberships.data.filter(om => om.status === 'active');
    const organizationsNames: {[key: string]: string} = {};
    for (const activeMembership of activeOrganizationMemberships) {
        const organization = await workos.organizations.getOrganization(activeMembership.organizationId);
        organizationsNames[organization.id] = organization.name;
    }

    return (
        <div className= "container">
            <div>
                <h2 className="text-lg mt-6">Your organizations</h2>
                <p className="text-sm"> Select an organization you want to access</p>
                {Object.keys(organizationsNames).map(orgId=> (
                    <div>
                        {organizationsNames[orgId]}
                    </div>
                ))}


                {organizationMemberships.data.length === 0 && (
                    <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
                        No company found for this user
                    </div>
                )}

                <Link
                    className="inline-flex gap-2 items-centered bg-gray-200 px-4 py-2 rounded-md mt-6"
                    href={'/new-org'}>
                    Create a new organization
                    <FontAwesomeIcon className="h-5 " icon={faBuilding}/>
                </Link>
            </div>
        </div>
    );
}