"use server"

import { dbConnect } from "@/app/lib/config/db"
import Professionals from "../config/models/professionals"
import Organizations from "../config/models/organizations"
import { formatOrganizations, formatProfessionals } from "../utils"

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