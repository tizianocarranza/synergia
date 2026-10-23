import type { ProfessionalWithColors, Specialty } from "./types/general.ts";

export type HomeStats = {
    openProfessionals: number;
    organizations: number;
    topSpecialty: { name: Specialty; count: number } | null;
    featured: ProfessionalWithColors | null;
};

export function summarizeHomeStats(input: {
    openProfessionals: number;
    organizations: number;
    specialtyCounts: { _id: Specialty; count: number }[];
    featured: ProfessionalWithColors | null;
}): HomeStats {
    // Mayor count; si empatan, la primera alfabeticamente
    const top = [...input.specialtyCounts].sort(
        (a, b) => b.count - a.count || a._id.localeCompare(b._id),
    )[0];

    return {
        openProfessionals: input.openProfessionals,
        organizations: input.organizations,
        topSpecialty: top ? { name: top._id, count: top.count } : null,
        featured: input.featured,
    };
}
