"use client"

import { specialties, areas } from "@/app/lib/definitions";
import { PrimaryButton } from "../buttons/buttons";
import { professionalSignUpFormAction } from "@/app/lib/data/actions";
import { useActionState } from "react";
import { ProfessionalState } from "@/app/lib/data/actions";

export function ProfessionalSignUpForm() {
    const initialState: ProfessionalState = {
        errors: {},
        message: null,
    };

    const [state, formAction] = useActionState(professionalSignUpFormAction, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-14 w-80">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <label htmlFor="name">What&apos;s your first name?</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        aria-describedby="name-error"
                        className="border p-2"
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.name &&
                            state.errors.name.map((error: string, index: number) => (
                                <p className="input-error" key={index}>{error}</p>
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="specialty">What are you good at?</label>
                    <input
                        list="specialties"
                        name="specialty"
                        id="specialty"
                        className="border p-2"
                    />
                    <datalist id="specialties">
                        {specialties.map(specialty => (
                            <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                    </datalist>
                    <div id="specialty-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.specialty &&
                            state.errors.specialty.map((error: string, index: number) => (
                                <p className="input-error" key={index}>{error}</p>
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="experience">How many years of experience do you have?</label>
                    <input
                        type="number"
                        name="experience"
                        id="experience"
                        min={1}
                        max={20}
                        className="border p-2"
                    />
                    <div id="experience-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.experience &&
                            state.errors.experience.map((error: string, index: number) => (
                                <p className="input-error" key={index}>{error}</p>
                            ))
                        }
                    </div>
                </div>

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
                            state.errors.employmentStatus.map((error: string, index: number) => (
                                <p className="input-error" key={index}>{error}</p>
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description">Give us a brief description of yourself as a professional</label>
                    <textarea
                        name="description"
                        id="description"
                        rows={4}
                        minLength={50}
                        className="border p-2"
                    />
                    <div id="description-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.description &&
                            state.errors.description.map((error: string, index: number) => (
                                <p className="input-error" key={index}>{error}</p>
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email">Write your email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="border p-2"
                    />
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.email &&
                            state.errors.email.map((error: string, index: number) => (
                                <p className="input-error" key={index}>{error}</p>
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password">Create a password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="border p-2"
                    />
                    <div id="password-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.password &&
                            state.errors.password.map((error: string, index: number) => (
                                <p className="input-error" key={index}>{error}</p>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="">
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


export function OrganizationSignUpForm() {
    return (
        <form action="" className="flex flex-col gap-14 w-80">

            <div className="flex flex-col gap-8">
                <div className=" flex flex-col">
                    <label htmlFor="name">What&apos;s the organization&apos;s name?</label>
                    <input type="text" name="name" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="specialty">What&apos;s the organization&apos;s operative area?</label>
                    <input list="areas" name="area" />
                    <datalist id="areas">
                        {
                            areas.map(area => (
                                <option key={area}>{area}</option>
                            ))
                        }
                    </datalist>
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="description">Give us a brief description of the organization</label>
                    <textarea name="description" rows={4} />
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="email">Assign an email to the organization&apos;s profile</label>
                    <input type="email" name="email" />
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="password">Assign password to the organization&apos;s profile</label>
                    <input type="password" name="password" />
                </div>
            </div>

            <PrimaryButton type="submit">
                <p className="text-brand">Create account</p>
            </PrimaryButton>
        </form>
    )
}