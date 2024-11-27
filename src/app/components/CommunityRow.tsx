import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Com } from "@/models/Com";
import TimeAgo from "@/app/components/TimeAgo";


export default async function CommunityRow ({comDoc}:{comDoc:Com}) {

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-sm relative">
                <div className="absolute cursor-pointer top-8 right-8">
                    <FontAwesomeIcon className="size-4 text-gray-300" icon={faHeart} />
                </div>
                <div className="flex grow gap-4">
                    <div className="content-center">
                        <img
                            className="size-14"
                            src="https://upload.wikimedia.org/wikipedia/commons/9/92/Angat_Buhay_logo.svg" alt=""/>
                    </div>
                    <div className="grow md:flex">
                        <div className="grow">
                            <div className="text-gray-500 text-sm">{comDoc.orgName}</div>
                            <div className="font-bold mb-1 text-lg">{comDoc.title}</div>
                            <div className="text-gray-400 text-sm capitalize">
                                {comDoc.initiatives}{' '}&middot;{' '}{comDoc.initiatives}{' '}&middot;{' '}{comDoc.initiatives}{' '}
                                {comDoc.isAdmin && (
                                    <>
                                        {' '}&middot;{' '}
                                        <button>Edit</button>
                                        {' '}&middot;{' '}
                                        <button>Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                        {comDoc.createdAt && (
                            <div className="content-end text-gray-500 text-sm">
                                <TimeAgo createdAt={comDoc.createdAt} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}