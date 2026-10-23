import OrganizationCard from "@/app/ui/cards/organization-card";
import { LookForPage } from "@/app/ui/pages/pages";
import SearchFilters from "@/app/ui/search/search-filters";
import { searchOrganizations, getTopAreas } from "@/app/lib/data/read";
import { parseOrganizationFilters, type RawSearchParams } from "@/app/lib/search";
import { areas } from "@/app/lib/types/general";

export default async function Opportunities({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
    const filters = parseOrganizationFilters(await searchParams);
    const [organizations, topAreas] = await Promise.all([
        searchOrganizations(filters),
        getTopAreas(6),
    ]);

    return (
        <LookForPage
            header="Opportunities"
            count={organizations.length}
            clearHref="/opportunities"
            hasFilters={Boolean(filters.q || filters.area)}
            filters={
                <SearchFilters
                    basePath="/opportunities"
                    param="area"
                    current={{ q: filters.q, area: filters.area }}
                    topOptions={topAreas}
                    allOptions={areas}
                    professionalControls={false}
                />
            }
        >
            {organizations.map((organization) => (
                <OrganizationCard key={organization._id} organization={organization} />
            ))}
        </LookForPage>
    )
}
