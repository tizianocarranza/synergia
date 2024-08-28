import OrganizationCard from "../../../ui/cards/organization-card";
import { OrganizationWithColors } from "@/app/lib/types/general";
import { LookForPage } from "@/app/ui/pages/pages";
import { hexToRGBA } from "@/app/lib/utils";
import { getAllOrganizations } from "@/app/lib/data/read";


export default async function Opportunities() {
    let organizations: OrganizationWithColors[] = [];
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