'use client';
import React from "react"; // Ensure React is imported for type definitions
import {CheckboxGroup, TextArea, TextField, Button, Theme} from "@radix-ui/themes";
import {faImages,faAddressBook} from "@fortawesome/free-solid-svg-icons";
import {faUser,faPhone,faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ImageUpload from "@/app/components/ImageUpload";
import { redirect } from "next/navigation";
import {saveComAction} from "@/app/actions/comActions";



export default function ComForm({orgId}:{orgId:string}) {

    async function handleSaveCom(data:FormData){
        data.set('orgId', orgId);
    const comDoc = await saveComAction (data);
        redirect(`/coms/${comDoc.orgId}`);
    }


    return (
        <div>
            <Theme>
                <form
                    action={handleSaveCom}
                    className="container mt-6 flex flex-col gap-3.5">
                    <TextField.Root name="title" placeholder="Name of community (format: Brgy.10, town or city, province, country)"/>
                    <div className="flex sm:flex">
                        <div className="w-1/3">
                            <h3>Organization Logo</h3>
                            <ImageUpload name="orgIcon" icon={faImages} defaultValue= "https://example.com/default-image.png"/>
                        </div>

                        <div className="grow">
                            <h3>Contact person</h3>
                            <div className="flex gap-2">
                                <div>
                                    <ImageUpload name="contactPhoto" icon={faAddressBook} defaultValue="https://example.com/default-image.png"/>
                                </div>
                                <div className="grow flex flex-col gap-1">
                                    <TextField.Root name="contactName" placeholder="Juan Dela Cruz">
                                        <TextField.Slot>
                                            <FontAwesomeIcon height="16" width="16" icon={faUser}/>
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root name="contactPhone" placeholder="Phone" type="tel">
                                        <TextField.Slot>
                                            <FontAwesomeIcon height="16" width="16" icon={faPhone}/>
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root name="contactEmail" placeholder="Email" type="email">
                                        <TextField.Slot>
                                            <FontAwesomeIcon height="16" width="16" icon={faEnvelope}/>
                                        </TextField.Slot>
                                    </TextField.Root>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TextArea placeholder="About the community (Share your recent experience with the target community, highlighting their specific healthcare needs, observed challenges or your story for supporting a community.)"
                              resize="vertical" name="description"/>
                    <div className="flex-col-2 gap-4">
                        <div>
                            Healthcare initiatives?
                            <div className="flex gap-10 bg-emerald-50 rounded-md border border-gray-150">
                                <div className="grow">
                                    <CheckboxGroup.Root color="green" defaultValue={["dental mission"]} name="initiatives">
                                        <CheckboxGroup.Item value="dental mission">Dental mission</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="medical mission">Medical mission</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="volunteers">Volunteers</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="medicine supplies">Medicine supplies</CheckboxGroup.Item>
                                    </CheckboxGroup.Root>
                                </div>
                                <div className="grow">
                                    <CheckboxGroup.Root color="green" defaultValue={["feeding program"]} name="initiatives">
                                        <CheckboxGroup.Item value="feeding program">Feeding program</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="vaccinations">Vaccinations</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="awareness drives">Awareness drives</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="first-aid training">First-aid training</CheckboxGroup.Item>
                                    </CheckboxGroup.Root>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 ">
                            <h1> Community images </h1>
                            <div className="flex grow gap-3">
                                <div>
                                    <ImageUpload name="ComPhoto" icon={faImages}
                                                 defaultValue="https://example.com/default-image.png"/>
                                </div>
                                <div>
                                    <ImageUpload name="ComPhoto" icon={faImages}
                                                 defaultValue="https://example.com/default-image.png"/>
                                </div>
                                <div>
                                    <ImageUpload name="ComPhoto" icon={faImages}
                                                 defaultValue="https://example.com/default-image.png"/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-center mt-4">
                        <Button size="3" color="green">
                            <span className="px-8">
                                Save
                            </span>
                        </Button>
                    </div>

                </form>
            </Theme>
        </div>
    );
}