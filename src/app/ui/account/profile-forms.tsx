"use client"

import { specialties, areas } from "@/app/lib/definitions";
import { PrimaryButton } from "../buttons/buttons";
import { organizationSignUpFormAction, OrganizationState, ProfessionalState, professionalSignUpFormAction } from "@/app/lib/data/actions";
import { useActionState } from "react";

export function ProfessionalProfileForm() {
    const initialState: ProfessionalState = {
        errors: null,
        message: null,
    };

    const [state, formAction] = useActionState(professionalSignUpFormAction, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-14 w-80">
            <div className="flex flex-col gap-8">

                {/* Name */}
                <div className="flex flex-col">
                    <label htmlFor="name">What&apos;s your first name?</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        aria-describedby="name-error"
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.name &&
                            state.errors.name.map((error: string) => (
                                <p className="input-error" key={error}>{error}</p>
                            ))
                        }
                    </div>
                </div>
                

                {/* Specialty */}
                <div className="flex flex-col">
                    <label htmlFor="specialty">What are you good at?</label>
                    <input
                        list="specialties"
                        name="specialty"
                        id="specialty"
                    />
                    <datalist id="specialties">
                        {specialties.map(specialty => (
                            <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                    </datalist>
                    <div id="specialty-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.specialty &&
                            state.errors.specialty.map((error: string) => (
                                <p className="input-error" key={error}>{error}</p>
                            ))
                        }
                    </div>
                </div>
                
                {/* Experience */}
                <div className="flex flex-col">
                    <label htmlFor="experience">How many years of experience do you have?</label>
                    <input
                        type="number"
                        name="experience"
                        id="experience"
                        min={1}
                        max={20}
                    />
                    <div id="experience-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.experience &&
                            state.errors.experience.map((error: string) => (
                                <p className="input-error" key={error}>{error}</p>
                            ))
                        }
                    </div>
                </div>
                

                {/* Employment Status */}
                <div className="flex flex-col">
                    <label htmlFor="employmentStatus">What&apos;s your current employment status?</label>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="employmentStatus"
                                id="employed"
                                value="employed"
                            />
                            <label htmlFor="employed">Employed</label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="employmentStatus"
                                id="unemployed"
                                value="unemployed"
                            />
                            <label htmlFor="unemployed">Unemployed</label>
                        </div>
                    </div>
                    <div id="employmentStatus-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.employmentStatus &&
                            state.errors.employmentStatus.map((error: string) => (
                                <p className="input-error" key={error}>{error}</p>
                            ))
                        }
                    </div>
                </div>
                

                {/* Description */}
                <div className="flex flex-col">
                    <label htmlFor="description">Give us a brief description of yourself as a professional</label>
                    <textarea
                        name="description"
                        id="description"
                        rows={4}
                        minLength={50}
                    />
                    <div id="description-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.description &&
                            state.errors.description.map((error: string) => (
                                <p className="input-error" key={error}>{error}</p>
                            ))
                        }
                    </div>
                </div>
                

                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email">Write your email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                    />
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.email &&
                            state.errors.email.map((error: string) => (
                                <p className="input-error" key={error}>{error}</p>
                            ))
                        }
                    </div>
                </div>

                
                {/* Password */}
                <div className="flex flex-col">
                    <label htmlFor="password">Create a password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                    />
                    <div id="password-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.password &&
                            state.errors.password.map((error: string) => (
                                <p className="input-error" key={error}>{error}</p>
                            ))
                        }
                    </div>
                </div>
            </div>

        
            <div>
                <PrimaryButton type="submit">
                    <p className="text-brand">Create account</p>
                </PrimaryButton>

                {state.message && (
                    <p className={state.errors ? "form-error" : "form-success"}>{state.message}</p>
                )}
            </div>
        </form>
    );
}


export function OrganizationProfileForm() {

    const initialState: OrganizationState = {
        errors: null,
        message: null,
    }
    const [state, formAction] = useActionState(organizationSignUpFormAction, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-14 w-80">
            <div className="flex flex-col gap-8">

                {/* Name */}
                <div className=" flex flex-col">
                    <label htmlFor="name">What&apos;s the organization&apos;s name?</label>
                    <input 
                    type="text" 
                    name="name"
                    id="name"
                    aria-describedby="name-error" 
                    />

                    <div id="name-error" aria-atomic="true" aria-live="polite">
                        {
                            state.errors?.name && 
                            state.errors.name.map((error: string) => (
                                <p className="input-error" key={error}>{error}</p>
                            ))
                        }
                    </div>
                </div>


                {/* Area */}
                <div className="flex flex-col">
                    <label htmlFor="area">What&apos;s the organization&apos;s operative area?</label>
                    <input 
                    list="areas" 
                    name="area" 
                    id="area"
                    aria-describedby="area-error"
                    />
                    <datalist id="areas">
                        {
                            areas.map(area => (
                                <option key={area}>{area}</option>
                            ))
                        }
                    </datalist>
                    <div id="area-error" aria-atomic="true" aria-live="polite">
                        {
                            state.errors?.area &&
                            state.errors.area.map((error: string) => (
                                <p className="input-error" key={error}>{error}</p>
                            ))
                        }
                    </div>
                </div>

                {/* Name */}
                <div className=" flex flex-col">
                    <label htmlFor="website">Doe&apos;s the organization have a website?</label>
                    <input 
                    type="url" 
                    name="website"
                    id="website"
                    aria-describedby="website-error" 
                    />

                    <div id="website-error" aria-atomic="true" aria-live="polite">
                        {
                            state.errors?.website && 
                            state.errors.website.map((error: string) => (
                                <p className="input-error" key={error}>{error}</p>
                            ))
                        }
                    </div>
                </div>


                {/* Description */}
                <div className="flex flex-col ">
                    <label htmlFor="description">Give us a brief description of the organization</label>
                    <textarea 
                    name="description" 
                    id="description"
                    rows={4}
                    aria-describedby="description-error" 
                    />

                    <div id="description-error" aria-atomic="true" aria-live="polite">
                        {
                            state.errors?.description &&
                            state.errors.description.map((error: string) => (
                                <div className="input-error" key={error}>{error}</div>
                            ))
                        }
                    </div>
                </div>


                {/* Email */}
                <div className="flex flex-col ">
                    <label htmlFor="email">Assign an email to the organization&apos;s profile</label>
                    <input 
                    type="email"
                    id="email"
                    name="email" 
                    aria-describedby="email-error" 
                    />

                    <div id="email-error" aria-atomic="true" aria-live="polite">
                    {
                        state.errors?.email && 
                        state.errors.email.map((error: string) => (
                            <p className="input-error" key={error}>{error}</p>
                        ))
                    }
                    </div>
                </div>


                {/* Password */}
                <div className="flex flex-col ">
                    <label htmlFor="password">Assign password to the organization&apos;s profile</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password"
                    aria-describedby="password-error"
                    />

                    <div id="password-error" aria-atomic="true" aria-live="polite">
                        {
                            state.errors?.password && 
                            state.errors.password.map((error: string) => (
                                <p className="input-error" key={error}>{error}</p>
                            ))
                        }
                    </div>
                </div>
            </div>


            <div>
                <PrimaryButton type="submit">
                    <p className="text-brand">Create account</p>
                </PrimaryButton>

                {
                    state.message && (
                        <p className={state.errors ? "form-error" : "form-success"}>{state.message}</p>
                    )
                }
            </div>

        </form>
    )
}