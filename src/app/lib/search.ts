import { specialties, areas } from "./types/general.ts";
import type { Specialty, Area } from "./types/general.ts";

export type RawSearchParams = Record<string, string | string[] | undefined>;

export const experienceRanges = {
    "1-2": [1, 2],
    "3-5": [3, 5],
    "6-10": [6, 10],
    "11-20": [11, 20],
} as const;
export type ExperienceRange = keyof typeof experienceRanges;

export type ProfessionalFilters = { q?: string; specialty?: Specialty; exp?: ExperienceRange; open: boolean };
export type OrganizationFilters = { q?: string; area?: Area };

const MAX_QUERY_LENGTH = 100;

function first(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

function parseQuery(value: string | string[] | undefined): string | undefined {
    const q = first(value)?.trim().slice(0, MAX_QUERY_LENGTH).trim();
    return q || undefined;
}

export function parseProfessionalFilters(params: RawSearchParams): ProfessionalFilters {
    const filters: ProfessionalFilters = { open: first(params.open) === "1" };
    const q = parseQuery(params.q);
    const specialty = first(params.specialty);
    const exp = first(params.exp);
    if (q) filters.q = q;
    if (specialty && (specialties as readonly string[]).includes(specialty)) filters.specialty = specialty as Specialty;
    if (exp && Object.hasOwn(experienceRanges, exp)) filters.exp = exp as ExperienceRange;
    return filters;
}

export function parseOrganizationFilters(params: RawSearchParams): OrganizationFilters {
    const filters: OrganizationFilters = {};
    const q = parseQuery(params.q);
    const area = first(params.area);
    if (q) filters.q = q;
    if (area && (areas as readonly string[]).includes(area)) filters.area = area as Area;
    return filters;
}

export function escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function textMatch(q: string) {
    const rx = { $regex: escapeRegex(q), $options: "i" };
    return [{ name: rx }, { description: rx }];
}

export function buildProfessionalQuery(f: ProfessionalFilters): Record<string, unknown> {
    const query: Record<string, unknown> = {};
    if (f.q) query.$or = textMatch(f.q);
    if (f.specialty) query.specialty = f.specialty;
    if (f.exp) {
        const [min, max] = experienceRanges[f.exp];
        query.experience = { $gte: min, $lte: max };
    }
    if (f.open) query.employmentStatus = "unemployed";
    return query;
}

export function buildOrganizationQuery(f: OrganizationFilters): Record<string, unknown> {
    const query: Record<string, unknown> = {};
    if (f.q) query.$or = textMatch(f.q);
    if (f.area) query.area = f.area;
    return query;
}

export function buildSearchHref(basePath: string, params: Record<string, string | undefined>): string {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value) search.set(key, value);
    }
    const qs = search.toString();
    return qs ? `${basePath}?${qs}` : basePath;
}
