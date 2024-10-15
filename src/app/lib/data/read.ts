"use server"

import { dbConnect } from "@/app/lib/config/db"
import Professionals from "../config/models/professionals"
import Organizations from "../config/models/organizations"
import { formatOrganization, formatOrganizations, formatProfessional, formatProfessionals } from "../utils"
import { Organization, OrganizationWithColors, Professional, ProfessionalWithColors } from "../types/general"

//Professionals
export const getAllProfessionals = async() => {
    try {
/*     try loader    await new Promise((resolve) => setTimeout(resolve, 5000)); */
        await dbConnect();
        const rawProfessionals = await Professionals.find({});
        const formattedProfessionals = formatProfessionals(rawProfessionals);
        return formattedProfessionals;
    } catch(error)
    {
        console.error("Error while fetching all professionals: ", error)
        throw new Error("Unable to fetch professionals");
    }
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
export const getAllOrganizations = async() => {
    try {
        await dbConnect();
        const rawOrganizations = await Organizations.find({});
        const formattedOrganizations = formatOrganizations(rawOrganizations);
        return formattedOrganizations;
    } catch(error)
    {
        console.error("Error while fetching all organizations: ", error)
        throw new Error("Unable to fetch organizations");
    }
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
export const getUserById = async (id: String | undefined) => {
    try {
        await dbConnect();

        let rawUser;
        rawUser = await Professionals.findById(id);

        if(!rawUser) {
            rawUser = await Organizations.findById(id);

            if(!rawUser) throw new Error("Ups! user not found.");

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