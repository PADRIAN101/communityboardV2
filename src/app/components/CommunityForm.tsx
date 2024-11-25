import {CheckboxGroup, TextArea, TextField, Button, Theme} from "@radix-ui/themes";
import {faImages,faAddressBook,faUser,faPhone,faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CommunityForm(){
    return (
        <div>
            <Theme>
                <form
                    action=""
                    className="container mt-6 flex flex-col gap-3.5">
                    <TextField.Root placeholder="Name of community (format: Brgy.10, town or city, province, country)"/>
                    <div className="flex">
                        <div className="w-1/3">
                            <h3>Community images</h3>
                            <div className="rounded-md bg-gray-100 size-20 inline-flex items-center content-center justify-center">
                                <FontAwesomeIcon className="h-10 text-gray-500" icon={faImages}/>
                            </div>
                            <div className="mt-1">
                                <Button variant="soft" color="green">select file</Button>
                            </div>
                        </div>

                        <div className="grow">
                            <h3>Contact person</h3>
                            <div className="flex gap-4">
                                <div>
                                    <div
                                        className="rounded-md bg-gray-100 size-20 inline-flex items-center content-center justify-center">
                                        <FontAwesomeIcon className="h-10 text-gray-500" icon={faAddressBook}/>
                                    </div>
                                    <div className="mt-1">
                                        <Button variant="soft" color="green">select file</Button>
                                    </div>
                                </div>
                                <div className="grow flex flex-col gap-1">
                                    <TextField.Root placeholder="Juan Dela Cruz">
                                        <TextField.Slot>
                                            <FontAwesomeIcon icon={faUser}/>
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root placeholder="Phone" type="tel">
                                        <TextField.Slot>
                                            <FontAwesomeIcon icon={faPhone}/>
                                        </TextField.Slot>
                                    </TextField.Root>
                                    <TextField.Root placeholder="Email" type="email">
                                        <TextField.Slot>
                                            <FontAwesomeIcon icon={faEnvelope}/>
                                        </TextField.Slot>
                                    </TextField.Root>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TextArea placeholder="About the community (Share your recent experience with the target community, highlighting their specific healthcare needs, observed challenges, or your story for supporting a community.)"
                              resize="vertical"/>
                    <div className="flex-col-2 gap-4">
                        <div>
                            Healthcare initiatives?
                            <div className="mt-1 flex gap-10 bg-emerald-50 rounded-md border border-gray-150">
                                <div className="grow">
                                    <CheckboxGroup.Root color="green" defaultValue={["0"]} name="example">
                                        <CheckboxGroup.Item value="1">Dental mission</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="2">Medical mission</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="3">Call for volunteers</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="4">Medicine supplies</CheckboxGroup.Item>
                                    </CheckboxGroup.Root>
                                </div>
                                <div className="grow">
                                    <CheckboxGroup.Root color="green" defaultValue={["0"]} name="example">
                                        <CheckboxGroup.Item value="5">Feeding program</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="6">Vaccinations</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="7">Awareness drives</CheckboxGroup.Item>
                                        <CheckboxGroup.Item value="8">First aid seminars</CheckboxGroup.Item>
                                    </CheckboxGroup.Root>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4" >
                        <Button size="3" color="green" >
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