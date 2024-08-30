"use server"

import { dbConnect } from "../config/db";
import Professionals from "../config/models/professionals";
import Organizations from "../config/models/organizations";
import { z } from "zod"
import { areas, specialties } from "../types/general";
import bcrypt from "bcrypt";
import { signIn } from "@/../auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

const saltRounds = 10;


/* Form Schemas */
const userFormSchema = z.object({
    name: z.string().min(2, "Please enter a valid name."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password should have at least 8 characters."),
    description: z.string().min(50, "Tell us a bit more! Description should be at least 50 characters long."),
    image: z.string().optional()
});


/* Professionals */
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

/* Edit profile */
const professionalProfileFormSchema = professionalFormSchema.omit({ email: true, password: true })


const organizationFormSchema = userFormSchema.extend({
    area: z.enum(areas, {
        message: "Please select the organization's operative area.",
        invalid_type_error: "Oops! That doesn't seem like a valid organization's operative area. Please select one from the list."
    }),
    website: z.string().url("Please enter a valid URL (this field is optional).").optional().or(z.literal("")) //Para manejar cuando se envia vacio porque URL espera un string valido
})

const organizationProfileFormSchema = organizationFormSchema.omit({ email: true, password: true });


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

export type ProfessionalEditProfileState = {
    errors?: {
        name?: string[];
        description?: string[];
        image?: string[];
        experience?: string[];
        specialty?: string[];
        employmentStatus?: string[];

        server?: string[];
    } | null;
    message?: string | null;
}


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

export type OrganizationEditProfileState = {
    errors?: {
        name?: string[];
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

    /* Professionals */
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
        const professional = { ...validatedProfessionalFormData.data, password: hashedPass, type: "professional" };


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

            /*         
                    if (error instanceof Error) {
                        errorMessage = error.message; Si es un tipo Error se le asigna el error.message sino el por defecto
                    }
            */
            return {
                ...prevState,
                errors: { server: [errorMessage] },
                message: errorMessage,
            } as ProfessionalState;
        }
    }

    export const professionalEditProfileFormAction = async (id: String, prevstate: ProfessionalEditProfileState, formData: FormData) => {
        const rawProfessionalProfileFormData = Object.fromEntries(formData.entries());
        const validatedProfessionalProfileFormData = professionalProfileFormSchema.safeParse(rawProfessionalProfileFormData);

        if (!validatedProfessionalProfileFormData.success) {
            return {
                errors: validatedProfessionalProfileFormData.error.flatten().fieldErrors,
                message: "Please don't leave empty fields"
            } as ProfessionalEditProfileState;
        }

        const professionalUpdateData = validatedProfessionalProfileFormData.data;

        try {
            await dbConnect();
            await Professionals.findByIdAndUpdate(id, professionalUpdateData);

        } catch (error) {

            console.error("Error while updating professionals profile: ", error);
            let errorMessage = "Something went wrong while updating profile";

            return {
                errors: { server: [errorMessage] },
                message: errorMessage
            } as ProfessionalEditProfileState;
        }

        revalidatePath("/profile/me"); /* Esto funciona tirando un error, por eso no lo puedo poner en el trycatch */

        /* Hay que retornar despues para que se pueda ejecutar el revalidate path */
        return {
            errors: null,
            message: "Profile updated succesfully!"
        } as ProfessionalEditProfileState;
    }

    /* Organizations */
    export const organizationSignUpFormAction = async (prevState: OrganizationState, formData: FormData) => {

        const rawOrganizationFormData = Object.fromEntries(formData.entries());
        const validatedOrganizationFormData = organizationFormSchema.safeParse(rawOrganizationFormData);

        if (!validatedOrganizationFormData.success) {
            return {
                ...prevState,
                errors: validatedOrganizationFormData.error.flatten().fieldErrors,
                message: "Missing Fields, please submit the required information to create an organization's account."
            } as OrganizationState;
        }

        const hashedPass = await bcrypt.hash(validatedOrganizationFormData.data.password, saltRounds);
        const organization = { ...validatedOrganizationFormData.data, password: hashedPass, type: "organization" };

        try {
            await dbConnect();
            await Organizations.create({ ...organization });

            return {
                ...prevState,
                errors: null,
                message: "Organization's account created succesfully."
            } as OrganizationState;

        } catch (error) {
            console.error("Error while creating organization's account: ", error);

            let errorMessage = "Something went wrong while creating organization's account."

            /*
            Too much detail?
            
            if(error instanceof Error) {
                        errorMessage = error.message;
                    }  
            */

            return {
                ...prevState,
                errors: { server: [errorMessage] },
                message: errorMessage
            } as OrganizationState;
        }
    }

    export const organizationEditProfileFormAction = async (id: String, prevstate: OrganizationEditProfileState, formData: FormData) => {
        const rawOrganizationProfileFormData = Object.fromEntries(formData.entries());
        const validatedOrganizationProfileFormData = organizationProfileFormSchema.safeParse(rawOrganizationProfileFormData);

        if (!validatedOrganizationProfileFormData.success) {
            return {
                errors: validatedOrganizationProfileFormData.error.flatten().fieldErrors,
                message: "Please don't leave empty fields"
            } as OrganizationEditProfileState;
        }

        const organizationUpdateData = validatedOrganizationProfileFormData.data;

        try {
            await dbConnect();

            await Organizations.findByIdAndUpdate(id, organizationUpdateData);
        } catch (error) {

            console.error("Error while updating organizations profile: ", error);
            let errorMessage = "Something went wrong while updating profile";

            return {
                errors: { server: [errorMessage] },
                message: errorMessage
            } as OrganizationEditProfileState;
        }

        revalidatePath("/profile/me"); /* Esto funciona tirando un error, por eso no lo puedo poner en el trycatch */

        /* Hay que retornar despues para que se pueda ejecutar el revalidate path */
        return {
            errors: null,
            message: "Profile updated succesfully!"
        } as OrganizationEditProfileState;
    }


    /* Auth */
    export const autheticationFormAction = async (prevState: SignInState, formData: FormData) => {
        try {
            await signIn("credentials", formData)
            return { error: false, message: "Signed in succesfully" } as SignInState;
        }
        catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return { error: true, message: "Invalid credentials." } as SignInState;
                    default:
                        return { error: true, message: "Something went wrong." } as SignInState;
                }
            }
            throw error;
        }
    }
