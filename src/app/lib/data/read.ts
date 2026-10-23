"use server"

import { dbConnect } from "@/app/lib/config/db"
import { isValidObjectId } from "mongoose"
import Professionals from "../config/models/professionals"
import Organizations from "../config/models/organizations"
import { formatOrganization, formatOrganizations, formatProfessional, formatProfessionals } from "../utils"
import { Area, Organization, OrganizationWithColors, Professional, ProfessionalWithColors, Specialty } from "../types/general"
import { buildOrganizationQuery, buildProfessionalQuery, OrganizationFilters, ProfessionalFilters } from "../search"
import { summarizeHomeStats } from "../home-stats"

//Professionals
export const searchProfessionals = async (filters: ProfessionalFilters): Promise<ProfessionalWithColors[]> => {
    try {
        await dbConnect();
        const rawProfessionals = await Professionals.find(buildProfessionalQuery(filters)).sort({ _id: -1 });
        return formatProfessionals(rawProfessionals) as ProfessionalWithColors[];
    } catch(error)
    {
        console.error("Error while searching professionals: ", error)
        throw new Error("Unable to fetch professionals");
    }
}

export const getAllProfessionals = async() => {
    return searchProfessionals({ open: false });
}

export const getProfessionalById = async (id: String) => {
    try {
        await dbConnect();

        let rawProfessional;
        rawProfessional = await Professionals.findById(id);

        if(!rawProfessional) {
            throw new Error("Ups! professional not found.");
        }

        const formattedProfessional = formatProfessional(rawProfessional);
        return formattedProfessional as ProfessionalWithColors;
    } catch (error) {

        console.error("Failed to fetch professional: ", error);
        throw new Error("Failed to fetch professional");
    }
}



//Organizations
export const searchOrganizations = async (filters: OrganizationFilters): Promise<OrganizationWithColors[]> => {
    try {
        await dbConnect();
        const rawOrganizations = await Organizations.find(buildOrganizationQuery(filters)).sort({ _id: -1 });
        return formatOrganizations(rawOrganizations) as OrganizationWithColors[];
    } catch(error)
    {
        console.error("Error while searching organizations: ", error)
        throw new Error("Unable to fetch organizations");
    }
}

export const getAllOrganizations = async() => {
    return searchOrganizations({});
}

export const getOrganizationById = async (id: String) => {
    try {
        await dbConnect();

        let rawOrganization;
        rawOrganization = await Organizations.findById(id);

        if(!rawOrganization) {
            throw new Error("Ups! organization not found.");
        }

        const formattedOrganization = formatOrganization(rawOrganization);
        return formattedOrganization as OrganizationWithColors;
    } catch (error) {

        console.error("Failed to fetch organization: ", error);
        throw new Error("Failed to fetch organization");
    }
}


//Profile
export const getUserById = async (id: string | undefined) => {
    /* Cualquier ruta desconocida cae en /[id], asi que un id invalido no es un error */
    if (!id || !isValidObjectId(id)) return null;

    try {
        await dbConnect();

        let rawUser;
        rawUser = await Professionals.findById(id);

        if(!rawUser) {
            rawUser = await Organizations.findById(id);

            if(!rawUser) return null; /* La pagina decide que hacer (notFound) */

            const formattedOrganization = formatOrganization(rawUser);
            return { formattedOrganization: formattedOrganization as OrganizationWithColors, formattedProfessional: null };
        }

        const formattedProfessional = formatProfessional(rawUser);
        return { formattedProfessional: formattedProfessional as ProfessionalWithColors, formattedOrganization: null };

    } catch (error) {

        console.error("Failed to fetch user: ", error);
        throw new Error("Failed to fetch user");
    }
}


//Login
export const getUserByEmail = async (email: string) => {
    try {
        await dbConnect();

        let user;
        user = await Professionals.findOne({ email: email });

        if(!user) {
            user = await Organizations.findOne({ email: email });

            return user as Organization;
        }

        if(!user) throw new Error("Ups! Invalid email");

        return user as Professional;

    } catch (error) {

        console.error("Failed to fetch user: ", error);

        throw new Error("Failed to fetch user");
    }
}


//Home / top values
export const getTopSpecialties = async (limit: number): Promise<Specialty[]> => {
    try {
        await dbConnect();
        const rows = await Professionals.aggregate([
            { $group: { _id: "$specialty", count: { $sum: 1 } } },
            { $sort: { count: -1, _id: 1 } },
            { $limit: limit },
        ]);
        return rows.map((row) => row._id as Specialty);
    } catch (error) {
        console.error("Failed to fetch top specialties: ", error);
        throw new Error("Failed to fetch top specialties");
    }
}

export const getTopAreas = async (limit: number): Promise<Area[]> => {
    try {
        await dbConnect();
        const rows = await Organizations.aggregate([
            { $group: { _id: "$area", count: { $sum: 1 } } },
            { $sort: { count: -1, _id: 1 } },
            { $limit: limit },
        ]);
        return rows.map((row) => row._id as Area);
    } catch (error) {
        console.error("Failed to fetch top areas: ", error);
        throw new Error("Failed to fetch top areas");
    }
}

export const getHomeStats = async () => {
    try {
        await dbConnect();
        const [openProfessionals, organizations, specialtyCounts, rawFeatured] = await Promise.all([
            Professionals.countDocuments({ employmentStatus: "unemployed" }),
            Organizations.countDocuments({}),
            Professionals.aggregate([{ $group: { _id: "$specialty", count: { $sum: 1 } } }]),
            Professionals.findOne({ employmentStatus: "unemployed" }).sort({ _id: -1 }),
        ]);

        return summarizeHomeStats({
            openProfessionals,
            organizations,
            specialtyCounts,
            featured: rawFeatured ? (formatProfessional(rawFeatured) as ProfessionalWithColors) : null,
        });
    } catch (error) {
        console.error("Failed to fetch home stats: ", error);
        throw new Error("Failed to fetch home stats");
    }
}
