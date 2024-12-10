import { WorkOS } from "@workos-inc/node";
import Jobscom from "@/app/components/Jobscom";
import { addOrgAndUserData, ComModel } from "@/models/Com";
import { withAuth } from "@workos-inc/authkit-nextjs";

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function OrganizationComsPage(props: PageProps) {
  const params = props.params;
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(params.orgId);
  const { user } = await withAuth();
  let comsDocs = JSON.parse(
    JSON.stringify(await ComModel.find({ orgId: org.id }))
  );
  comsDocs = await addOrgAndUserData(comsDocs, user);

  return (
    <div>
      <div className="container my-6">
        <h1 className="text-xl">{org.name} </h1>
      </div>
      <Jobscom coms={comsDocs} header={"Communities posted by " + org.name} />
    </div>
  );
}
