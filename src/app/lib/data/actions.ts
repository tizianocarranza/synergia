"use server"

import { dbConnect } from "../config/db";
import Professionals from "../config/models/professionals";
import Organizations from "../config/models/organizations";
import { z } from "zod"
import { areas, specialties } from "../definitions";
import bcrypt from "bcrypt";
import { signIn } from "@/../auth";
import { AuthError } from "next-auth";
import { error } from "console";

const saltRounds = 10;


/* Form Schemas */
const userFormSchema = z.object({
    name: z.string().min(2, "Please enter a valid name."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password should have at least 8 characters."),
    description: z.string().min(50, "Tell us a bit more! Description should be at least 50 characters long."),
    image: z.string().optional()
});

const professionalFormSchema = userFormSchema.extend({
    experience: z.coerce.number().gt(0, { /* Coerce pasa a number el string que recibe del form */
        message: "Please enter a valid number of years of experience (at least 1 year).",
    }).lt(21, {
        message: "Please enter a valid number of years of experience (maximum 20 years)."
    }),
    specialty: z.enum(specialties, { 
        message: "Please select your area of specialty.",
        invalid_type_error: "Oops! That doesn't seem like a valid specialty. Please select one from the list."
    }),
    employmentStatus: z.enum(["employed", "unemployed"], {
        message: "Please select your current employment status.", 
        invalid_type_error: "Please select your current employment status from the available options."
    })
});

const organizationFormSchema = userFormSchema.extend({
    area: z.enum(areas, {
        message: "Please select the organization's operative area.",
        invalid_type_error: "Oops! That doesn't seem like a valid organization's operative area. Please select one from the list."
    }),
    website: z.string().url("Please enter a valid URL (this field is optional).").optional().or(z.literal("")) //Para manejar cuando se envia vacio porque URL espera un string valido
})


//Form States
    /* Professional */
    export type ProfessionalState = {
        errors?: {
            name?: string[];
            email?: string[];
            password?: string[];
            description?: string[];
            image?: string[];
            experience?: string[];
            specialty?: string[];
            employmentStatus?: string[];

            server?: string[];
        } | null;
        message?: string | null;
    };
    /* Organization */
    export type OrganizationState = {
        errors?: {
            name?: string[];
            email?: string[];
            password?: string[];
            description?: string[];
            image?: string[];
            area?: string[];
            website?: string[];

            server?: string[];
        } | null;

        message?: string | null;
    }

    /* Sign in */
    export type SignInState = {
        error?: boolean;
        message?: string | null;
    }


/* Form Actions */
export const professionalSignUpFormAction = async (prevState: ProfessionalState, formData: FormData) => {

    const rawProfessionalFormData = Object.fromEntries(formData.entries());
    const validatedProfessionalFormData = professionalFormSchema.safeParse(rawProfessionalFormData); //Llamar al form-control

    if (!validatedProfessionalFormData.success) {
        return {
            ...prevState, 
            errors: validatedProfessionalFormData.error.flatten().fieldErrors,
            message: "Missing Fields, please submit the required information to create a professional's account."
        } as ProfessionalState;
    }

    const hashedPass = await bcrypt.hash(validatedProfessionalFormData.data.password, saltRounds)
    const professional = { ...validatedProfessionalFormData.data, password: hashedPass};
    

    try {
        await dbConnect();

        await Professionals.create({ ...professional });

        return { 
            ...prevState,
            errors: null,
            message: "Professional's account created succesfully."
        } as ProfessionalState;

    } catch (error) {
        console.error("Error creating professional: ", error);

        let errorMessage = "Something went wrong while creating the professional's account.";

        if (error instanceof Error) {
            errorMessage = error.message; //Si es un tipo Error se le asigna el error.message sino el por defecto
        }

        return { 
            ...prevState,
            errors: { server: [errorMessage] },
            message: errorMessage,
        } as ProfessionalState;
    }
}

export const organizationSignUpFormAction = async (prevState: OrganizationState, formData: FormData) => {

    const rawOrganizationFormData = Object.fromEntries(formData.entries());
    const validatedOrganizationFormData = organizationFormSchema.safeParse(rawOrganizationFormData);

    if(!validatedOrganizationFormData.success) {
        return {
            ...prevState,
            errors: validatedOrganizationFormData.error.flatten().fieldErrors,
            message: "Missing Fields, please submit the required information to create an organization's account."
        } as OrganizationState;
    }

    const hashedPass = await bcrypt.hash(validatedOrganizationFormData.data.password, saltRounds);
    const organization = { ...validatedOrganizationFormData.data, password: hashedPass };

    try {
        await dbConnect();
        await Organizations.create({...organization});

        return {
            ...prevState,
            errors: null,
            message: "Organization's account created succesfully."
        } as OrganizationState;

    } catch (error) {
        console.error("Error while creating organization's account: ", error);

        let errorMessage = "Something went wrong while creating organization's account."
        if(error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            ...prevState,
            errors: { server: [errorMessage]},
            message: errorMessage
        } as OrganizationState;
    }
}

export const autheticationFormAction = async (prevState: SignInState, formData: FormData) => {
    try 
    {
        await signIn("credentials", formData)
        return { error: false, message: "Signed in succesfully" } as SignInState;
    } 
    catch (error) 
    {
        if(error instanceof AuthError) 
        {
            switch(error.type) 
            {
                case "CredentialsSignin":
                    return { error: true, message: "Invalid credentials." } as SignInState;
                default:
                    return { error: true, message: "Something went wrong." } as SignInState;
            }
        }
        throw error;
    }
}