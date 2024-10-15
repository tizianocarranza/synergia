import { areaColors, Area, OrganizationWithColors, ProfessionalWithColors, Specialty, specialtyColors } from "./types/general";
import bcrypt from "bcrypt"

export const hexToRGBA = (hex: string, opacity: number) => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        throw new Error(`Invalid HEX color format: ${hex}`);
    }

    const hexValue = hex.replace("#", ""); //Le saca el #

    const r = parseInt(hexValue.substring(0, 2), 16); //Toma el valor del rojo en hexadecimal y lo pasa a entero
    const g = parseInt(hexValue.substring(2, 4), 16); //Toma el valor del verde en hexadecimal y lo pasa a entero
    const b = parseInt(hexValue.substring(4, 6), 16); //Toma el valor del azul en hexadecimal y lo pasa a entero

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}


const CARD_BG_OPACITY = 0.7;
export const formatProfessional = (rawProfesional: any) => {
    const specialty: Specialty = rawProfesional.specialty;
    
    const formattedProfessional: ProfessionalWithColors = {
        _id: rawProfesional._id ? rawProfesional._id.toString() : "",
        type: rawProfesional.type,
        name: rawProfesional.name,
        email: rawProfesional.email,
        password: rawProfesional.password,
        description: rawProfesional.description,
        image: rawProfesional.image || undefined,
        experience: rawProfesional.experience,
        employmentStatus: rawProfesional.employmentStatus,
        specialty: specialty,
        color: specialtyColors[specialty],
        cardColor: hexToRGBA(specialtyColors[specialty], CARD_BG_OPACITY),
    }

    return formattedProfessional;
}

export const formatOrganization = (rawOrganization: any) => {
    const area: Area = rawOrganization.area;

    const formattedOrganization: OrganizationWithColors = {
        _id: rawOrganization._id ? rawOrganization._id.toString() : "",
        type: rawOrganization.type,
        name: rawOrganization.name,
        email: rawOrganization.email,
        password: rawOrganization.password,
        description: rawOrganization.description,
        image: rawOrganization.image || undefined,
        website: rawOrganization.website || undefined,
        area: area,
        color: areaColors[area],
        cardColor: hexToRGBA(areaColors[area], CARD_BG_OPACITY),
    }

    return formattedOrganization;
}

export const formatProfessionals = (rawProfessionals : any | any[]) => {
    if (Array.isArray(rawProfessionals)) {
        return rawProfessionals.map(professional => formatProfessional(professional));
    } else {
        return [formatProfessional(rawProfessionals)];
    }
}

export const formatOrganizations = (rawOrganizations: any | any[]) => {
    if(Array.isArray(rawOrganizations)) {
        return rawOrganizations.map(organization => formatOrganization(organization));
    } else {
        return [formatOrganization(rawOrganizations)]; /*  Devuelve un array aunque haya una sola org */
    }
}