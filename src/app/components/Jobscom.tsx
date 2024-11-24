import CommunityRow from "@/app/components/CommunityRow";

export default function Jobscom () {
    return (
       <div className="bg-slate-200 py-6 rounded-3xl ">
           <div className="container">
               <h2 className="font-bold mb-4"> Recent community posts</h2>
               <div className="flex flex-col gap-4">
                   <CommunityRow />
                   <CommunityRow />
                   <CommunityRow />
                   <CommunityRow />
                   <CommunityRow />
               </div>
           </div>
       </div>
    );
}