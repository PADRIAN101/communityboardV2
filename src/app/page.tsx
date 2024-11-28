import Hero from "@/app/components/Hero";
import Jobscom from "@/app/components/Jobscom";
import {addOrgAndUserData, ComModel} from "@/models/Com";
import {withAuth} from "@workos-inc/authkit-nextjs";



export default async function Home() {
    const {user} = await withAuth()
    const latestComs = await addOrgAndUserData(
        await ComModel.find({},{},{Limit:5,sort:'-createdAt'}),
        user,

    );
  return (
      <>
          <Hero />
          <Jobscom header={''} coms={latestComs} />
      </>


        );
        }