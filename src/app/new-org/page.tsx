import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {createOrganization} from "@/app/actions/workosActions";
import {withAuth} from "@workos-inc/authkit-nextjs";

export default async function NewOrganizationPage(){

    const {user} = await withAuth();

    async function handleNewOrgFormSubmit(data:FormData){
        'use server';
        if (user) {
            await createOrganization(data.get('newOrganizationName') as string, user.id);
        }
    }


    if(!user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        'Login to use this page';
    }

    return (
        <div className="container">
            <h2 className="text-lg mt-6">Create a new organization</h2>
            <p className="text-sm">To create community, you need an account</p>
            <form
                action={handleNewOrgFormSubmit}
                className="flex gap-2">
                <input
                    name="newOrganizationName"
                    className="p-2 border border-gray-400 rounded-md"
                    type="text"
                    placeholder="organization name"/>
                <button type="submit" className="flex gap-2 bg-gray-200 px-4 py-2 rounded-md">
                    Create Profile
                    <FontAwesomeIcon className="h-5 text-gray-500" icon={faUser}/>
                </button>
            </form>
        </div>
    )
}