import { AutoPaginatable, OrganizationMembership, User, WorkOS } from "@workos-inc/node";
import mongoose, { model, models, Schema } from 'mongoose';


export type Com = {
    [x: string]: Key | null | undefined;
    _id: string;
    title: string;
    description: string;
    orgName?: string;
    orgIcon: string;
    contactPhoto: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    initiatives: string[];
    comPhotoOne: string;
    comPhotoTwo: string;
    comPhotoThree: string;
    orgId: string;
    createdAt: string;
    updatedAt: string;
    isAdmin?: boolean;
};

const ComSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    orgIcon: { type: String },
    orgId: { type: String },
    contactPhoto: { type: String },
    contactName: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactEmail: { type: String, required: true },
    initiatives: { type: [String], required: true },
    comPhotoOne: { type: String },
    comPhotoTwo: { type: String },
    comPhotoThree: { type: String },
}, {
    timestamps: true,
});

export async function addOrgAndUserData(comsDocs: Com[], user: User | null) {
    comsDocs = JSON.parse(JSON.stringify(comsDocs));

    await mongoose.connect(process.env.MONGO_URI as string);

    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    let oms: AutoPaginatable<OrganizationMembership> | null = null;
    if (user) {
        oms = await workos.userManagement.listOrganizationMemberships({
            userId: user?.id,
        });
    }
    for (const com of comsDocs) {
        const org = await workos.organizations.getOrganization(com.orgId);
        com.orgName = org.name;
        if (oms && oms.data.length > 0) {
            com.isAdmin = !!oms.data.find(om => om.organizationId === com.orgId);
        }
    }
    return comsDocs;
}

export const ComModel = models?.Com || model('Com', ComSchema);
