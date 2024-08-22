"use server"

import { dbConnect } from "../config/db";
import Professionals from "../config/models/professionals";
import { z } from "zod"
import { specialties } from "../definitions"

/* Form Schemas */
const userFormSchema = z.object({
    name: z.string().min(2, "Please enter your name."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Your password should have at least 8 characters."),
    description: z.string().min(50, "Tell us a bit more! Your description should be at least 50 characters long."),
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

//Form States
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
    } | null;
    message?: string | null;
};


export const professionalSignUpFormAction = async (prevState: ProfessionalState, formData: FormData) => {

    const rawProfessionalFormData = Object.fromEntries(formData.entries());
    const validatedProfessionalFormData = professionalFormSchema.safeParse(rawProfessionalFormData); //Llamar al form-control

    if (!validatedProfessionalFormData.success) {
        return {
            ...prevState, 
            errors: validatedProfessionalFormData.error.flatten().fieldErrors,
            message: "Missing Fields, please submit the required information to create an account."
        }
    }
    
    const newState = { 
        ...prevState,
        errors: null,
        message: null,
    }
    
    const professional = validatedProfessionalFormData.data;

    console.log(professional)

    try {
        await dbConnect();

        await Professionals.create({ ...professional });

        return {
            ...newState,
            message: "Account created succesfully"
        }

    } catch (error) {
        console.error("Error creating professional: ", error);

        return {
            ...newState,
            message: "An error occurred while creating the account."
        }
    }

}