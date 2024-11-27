import CommunityRow from "@/app/components/CommunityRow";
import type {Com} from "@/models/Com"

export default function Jobscom ({header, coms}:{header:string, coms:Com[]}) {
    return (
       <div className="bg-slate-200 py-6 rounded-3xl ">
           <div className="container">
               <h2 className="font-bold mb-4"> {header|| 'Recent community posts'}</h2>
               <div className="flex flex-col gap-4">

                   {!coms?.length && (
                       <div>No community post found</div>
                   )}
                   {coms && coms.map(com => (
                       <CommunityRow comDoc={com}/>
                   ))}
               </div>

           </div>
       </div>
    );
}