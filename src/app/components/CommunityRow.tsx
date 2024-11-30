'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Com } from "@/models/Com";
import TimeAgo from "@/app/components/TimeAgo";
import Link from "next/Link";
import axios from "axios";

export default function CommunityRow({ comDoc }: { comDoc: Com }) {
    // Helper function to format initiatives with " · " separator
    const formatInitiatives = (initiatives: string[]) => {
        return initiatives
            .map(initiative => initiative
                .replace(/[\[\]"]/g, '')  // Remove brackets and quotes
                .replace(/\s+/g, ' ')     // Replace multiple spaces with one
                .trim()                   // Remove leading/trailing spaces
            )
            .join(', ')                   // Join the initiatives with a comma (before replacing it)
            .replace(/,/g, ' · ');        // Replace commas with middle dot (·)
    };

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-sm relative">
                <div className="absolute cursor-pointer top-8 right-8">
                    <FontAwesomeIcon className="size-4 text-gray-300" icon={faHeart} />
                </div>
                <div className="flex grow gap-4">
                    <div className="content-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className="size-12"
                            src={comDoc?.orgIcon} alt=""/>
                    </div>
                    <div className="grow md:flex">
                        <div className="grow">
                            <div>
                                <Link href={`/coms/${comDoc.orgId}`} className="hover:underline text-gray-500 text-sm">{comDoc.orgName || '?'}</Link>
                            </div>
                            <div className="font-bold mb-1 text-lg">
                                <Link className="hover:underline" href={'/show/'+comDoc._id}>{comDoc.title}</Link>
                            </div>
                            <div className="text-gray-400 text-sm capitalize">
                                {/* Format initiatives and display */}
                                {comDoc.initiatives?.length ? formatInitiatives(comDoc.initiatives) : 'No initiatives'}

                                {/* Admin actions (Edit and Delete) */}
                                {comDoc.isAdmin && (
                                    <>
                                        {' · '}
                                        <Link href={'/coms/edit/' + comDoc._id}>Edit</Link>
                                        {' · '}
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                await axios.delete('/api/coms?id=' + comDoc._id);
                                                window.location.reload();
                                            }}>
                                            Delete
                                        </button>
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
