'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@radix-ui/themes";
import { useRef, useState } from "react";

export default function UploadFiles({ icon }: { icon: IconDefinition }) {
    const fileInRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files)); // Convert FileList to an array
        }
    };

    return (
        <>
            <div className="rounded-md bg-gray-100 size-20 inline-flex items-center content-center justify-center">
                <FontAwesomeIcon className="h-10 text-gray-500" icon={icon} />
            </div>
            <div className="mt-1">
                <input
                    ref={fileInRef}
                    type="file"
                    className="hidden"
                    multiple // Allows multiple file selection
                    onChange={handleFileChange}
                />
                <Button
                    type="button"
                    onClick={() => fileInRef.current?.click()}
                    variant="soft"
                    color="green"
                >
                    Select files
                </Button>
            </div>
            {files.length > 0 && (
                <div className="mt-2">
                    <h4>Selected Files:</h4>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
