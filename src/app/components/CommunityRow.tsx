import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function CommunityRow () {
    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-sm relative">
                <div className="absolute cursor-pointer top-8 right-8">
                    <FontAwesomeIcon className="size-4 text-gray-300" icon={faHeart} />
                </div>
                <div className="flex grow gap-4">
                    <div className="conten-center">
                        <img
                            className="size-14"
                            src="https://upload.wikimedia.org/wikipedia/commons/9/92/Angat_Buhay_logo.svg" alt=""/>
                    </div>
                    <div className="grow md:flex">
                        <div className="grow">
                            <div className="text-gray-500 text-sm"> Angat Buhay</div>
                            <div className="font-bold mb-1 text-lg">Brgy.Mahirap, El Nido, Palawan, Philippines</div>
                            <div className="text-gray-400 text-sm">
                                Dental Mission &middot; Volunteers &middot; Feeding Program
                            </div>
                        </div>
                        <div className="content-end text-gray-500 text-sm">
                            2 weeks ago
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}