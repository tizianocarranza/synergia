"use server"

import { dbConnect } from "@/app/lib/config/db"
import Professionals from "../config/models/professionals"
import Organizations from "../config/models/organizations"
import { formatOrganization, formatOrganizations, formatProfessional, formatProfessionals } from "../utils"
import { organization, organizationWithColors, professional, professionalWithColors } from "../definitions"

//Professionals
export const getAllProfessionals = async() => {
    try {
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


//Profile
export const getUserById = async (id: string | undefined) => {
    try {
        await dbConnect();

        let rawUser;
        rawUser = await Professionals.findById(id);

        if(!rawUser) {
            rawUser = await Organizations.findById(id);

            if(!rawUser) throw new Error("Ups! user not found.");

            const formattedOrganization = formatOrganization(rawUser);
            return { formattedOrganization: formattedOrganization as organizationWithColors, formattedProfessional: null };
        }

        const formattedProfessional = formatProfessional(rawUser);
        return { formattedProfessional: formattedProfessional as professionalWithColors, formattedOrganization: null };

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

            return user as organization;
        }

        if(!user) throw new Error("Ups! Invalid email");

        return user as professional;

    } catch (error) {

        console.error("Failed to fetch user: ", error);

        throw new Error("Failed to fetch user");
    }
}