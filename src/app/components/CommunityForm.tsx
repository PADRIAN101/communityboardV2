'use client';
import React, { useState } from "react";
import { CheckboxGroup, TextArea, TextField, Button, Theme } from "@radix-ui/themes";
import { faImages, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faUser, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageUpload from "@/app/components/ImageUpload";
import { redirect } from "next/navigation";
import { saveComAction } from "@/app/actions/comActions";
import type { Com } from "@/models/Com";

export default function ComForm({ orgId, comDoc }: { orgId: string; comDoc?: Com }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [checked, setChecked] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [items, setItems] = useState<unknown[]>([]);

    async function handleSaveCom(data: FormData) {
        // Convert initiatives into an array
        const initiatives = data.getAll("initiatives"); // Fetch all selected initiatives
        data.set("initiatives", JSON.stringify(initiatives)); // Store as JSON string for backend
        data.set("orgId", orgId);

        const savedComDoc = await saveComAction(data);
        redirect(`/coms/${savedComDoc.orgId}`);
    }

    // Remove punctuation and return a string joined by '·'
    const formatInitiatives = (initiatives: string[]) => {
        return initiatives
            .map(initiative => initiative.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' '))
            .join(' · ');
    };

    return (
        <div>
            <Theme>
                <form
                    action={handleSaveCom}
                    className="container mt-6 flex flex-col gap-3.5"
                >
                    {comDoc && (
                        <input type="hidden" name="id" value={comDoc?._id} />
                    )}

                    <TextField.Root
                        name="title"
                        placeholder="Name of community (format: Brgy.10, town or city, province, country)"
                        defaultValue={comDoc?.title || ""}
                    />
                    <div className="flex sm:flex">
                        <div className="w-1/3">
                            <h3>Organization Logo</h3>
                            <ImageUpload name="orgIcon" icon={faImages} defaultValue={comDoc?.orgIcon || ""} />
                        </div>

                        <div className="grow">
                            <h3>Contact person</h3>
                            <div className="flex gap-2">
                                <div>
                                    <ImageUpload
                                        name="contactPhoto"
                                        icon={faAddressBook}
                                        defaultValue={comDoc?.contactPhoto || ""}
                                    />
                                </div>
                                <div className="grow flex flex-col gap-1">
                                    <TextField.Root
                                        name="contactName"
                                        placeholder="Juan Dela Cruz"
                                        defaultValue={comDoc?.contactName || ""}
                                    >
                                        <TextField.Slot>
                                            <FontAwesomeIcon height="16" width="16" icon={faUser} />
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root
                                        name="contactPhone"
                                        placeholder="Phone"
                                        type="tel"
                                        defaultValue={comDoc?.contactPhone || ""}
                                    >
                                        <TextField.Slot>
                                            <FontAwesomeIcon height="16" width="16" icon={faPhone} />
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root
                                        name="contactEmail"
                                        placeholder="Email"
                                        type="email"
                                        defaultValue={comDoc?.contactEmail || ""}
                                    >
                                        <TextField.Slot>
                                            <FontAwesomeIcon height="16" width="16" icon={faEnvelope} />
                                        </TextField.Slot>
                                    </TextField.Root>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TextArea
                        defaultValue={comDoc?.description || ""}
                        placeholder="About the community (Share your recent experience with the target community, highlighting their specific healthcare needs, observed challenges or your story for supporting a community.)"
                        resize="vertical"
                        name="description"
                    />
                    <div className="flex-col-2 gap-4">
                        <div>
                            Healthcare initiatives?
                            <div className="flex gap-10 bg-emerald-50 rounded-md border border-gray-150">
                                <div className="grow">
                                    <CheckboxGroup.Root
                                        color="green"
                                        name="initiatives"
                                        defaultValue={comDoc?.initiatives || []} // Default to array
                                    >
                                        <CheckboxGroup.Item value="dental mission">Dental mission</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="medical mission">Medical mission</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="volunteers">Volunteers</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="medicine supplies">Medicine supplies</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="feeding program">Feeding program</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="vaccinations">Vaccinations</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="awareness drives">Awareness drives</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="first-aid training">First-aid training</CheckboxGroup.Item>
                                    </CheckboxGroup.Root>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-white text-sm capitalize">
                        {/* Display the formatted initiatives without punctuation */}
                        {formatInitiatives(comDoc?.initiatives || []) || 'No initiatives'}
                    </div>
                    <div className="flex justify-center ">
                        <Button size="3" color="green">
                            <span className="px-8">Save</span>
                        </Button>
                    </div>
                </form>
            </Theme>
        </div>
    );
}
