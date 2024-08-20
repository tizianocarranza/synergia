import OrganizationCard from "../../../ui/cards/organization-card";
import { organizationWithColors } from "@/app/lib/definitions";
import { LookForPage } from "@/app/ui/pages/pages";
import { hexToRGBA } from "@/app/lib/utils";
import { getAllOrganizations } from "@/app/lib/data/read";


export default async function Opportunities() {
    let organizations: organizationWithColors[] = [];
    organizations = await getAllOrganizations()

    return (
        <LookForPage header="Opportunities">
                {
                    organizations.map(organization => (
                        <OrganizationCard
                        key={organization._id}
                        organization={organization}
                        />
                    ))
                }
        </LookForPage>
    )
}