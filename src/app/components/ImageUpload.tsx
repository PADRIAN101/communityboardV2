'use client';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@radix-ui/themes";
import {useRef} from "react";
import axios from "axios";

export async function ImageUpload({icon}:{icon:IconDefinition}){
    const fileInRef = useRef<HTMLInputElement>(null);

    async function upload(ev:Event){
        const input = ev.target as HTMLInputElement;
        if (input && input.files?.length && input.files.length > 0){
            const file=input.files[0];
            const data= new FormData;
            data.set('file',file);
            const response = await axios.post('/api/upload',data);
            console.log(response);
        }
    }

    return(
        <>
            <div className="rounded-md bg-gray-100 size-20 inline-flex items-center content-center justify-center">
                <FontAwesomeIcon className="h-10 text-gray-500" icon={icon}/>
            </div>
            <div className="mt-1">
                <input
                    onChange={upload}
                    ref ={fileInRef}
                    className="hidden"
                    type="file"
                />
                <Button
                    type="button"
                    onClick={()=> fileInRef.current?.click()}
                    variant="soft"
                    color="green">
                    select file
                </Button>
            </div>
        </>
    );
}