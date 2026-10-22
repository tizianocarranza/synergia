import ProfessionalCard from "@/app/ui/cards/professional-card";
import { LookForPage } from "@/app/ui/pages/pages";
import SearchFilters from "@/app/ui/search/search-filters";
import { searchProfessionals, getTopSpecialties } from "@/app/lib/data/read";
import { parseProfessionalFilters, type RawSearchParams } from "@/app/lib/search";
import { specialties } from "@/app/lib/types/general";

export default async function Professionals({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
    const filters = parseProfessionalFilters(await searchParams);
    const [professionals, topSpecialties] = await Promise.all([
        searchProfessionals(filters),
        getTopSpecialties(6),
    ]);

    return (
        <LookForPage
            header="Professionals"
            count={professionals.length}
            clearHref="/professionals"
            filters={
                <SearchFilters
                    basePath="/professionals"
                    param="specialty"
                    current={{
                        q: filters.q,
                        specialty: filters.specialty,
                        exp: filters.exp,
                        open: filters.open ? "1" : undefined,
                    }}
                    topOptions={topSpecialties}
                    allOptions={specialties}
                    professionalControls
                />
            }
        >
            {professionals.map((professional) => (
                <ProfessionalCard key={professional._id} professional={professional} />
            ))}
        </LookForPage>
    )
}
