'use server';
import {withAuth} from "@workos-inc/authkit-nextjs";
import {WorkOS} from "@workos-inc/node"
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
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
                <h2 className="text-lg mt-6">Your Organizations</h2>
                <p className="text-sm text-gray-500 mb-2"> Select an organization you want to access</p>
                <div>
                    <div className="border rounded-md inline-block">
                        {Object.keys(organizationsNames).map(orgId => (
                            <Link
                                key={orgId} // Add the unique key prop
                                href={'/new-com/' + orgId}
                                className={
                                    "py-2 px-4 flex gap-2 items-center "
                                    +(Object.keys(organizationsNames)[0] === orgId ? '' : 'border-t')
                                }>
                                <FontAwesomeIcon className="h-5 " icon={faBuilding}/>
                                {organizationsNames[orgId]}
                            </Link>
                        ))}
                    </div>
                </div>


                {organizationMemberships.data.length === 0 && (
                    <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
                        No company found for this user
                    </div>
                )}

                <Link
                    className="inline-flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md mt-6"
                    href={'/new-org'}>
                    Create a new organization
                    <FontAwesomeIcon className="h-5 " icon={faCirclePlus}/>
                </Link>
            </div>
        </div>
    );
}