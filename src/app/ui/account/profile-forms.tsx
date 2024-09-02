"use client"

import { specialties, areas, ProfessionalWithColors, OrganizationWithColors } from "@/app/lib/types/general";
import { PrimaryButton } from "../buttons/buttons";
import { ProfessionalEditProfileState, professionalEditProfileFormAction, organizationEditProfileFormAction, OrganizationEditProfileState } from "@/app/lib/data/actions";
import { useActionState, useEffect, useState } from "react";

export function ProfessionalEditProfileForm({ professional }: { professional: ProfessionalWithColors }) {
    const [editMode, setEditMode] = useState(false);
    const [formMessage, setFormMessage] = useState("");

    const handleChangeEditMode = () => setEditMode(!editMode);

    const initialState: ProfessionalEditProfileState = {
        errors: null,
        message: null,
    };

    const professionalEditProfileFormActionWithId = professionalEditProfileFormAction.bind(null, professional._id) /* For a given function, creates a bound function that has the same body as the original function. The this object of the bound function is associated with the specified object, and has the specified initial parameters.*/
    const [state, formAction] = useActionState(professionalEditProfileFormActionWithId, initialState);

    useEffect(() => {
        setFormMessage(state.message ? state.message : "");

        if (!state.errors) setTimeout(() => {
            /* handleChangeEditMode(); Si uso esto, al reenderizarse por primera vez, se abrira asi que hago directamente setEditMode(false);*/
            setEditMode(false);
            setFormMessage("");
        }, 3000);

    }, [state])

    return (
        <div className="flex flex-col justify-center gap-14 w-full">
            {
                editMode && (
                    <div className="fixed flex justify-center top-0 left-0 h-screen w-screen backdrop-blur-lg backdrop-brightness-50 z-20 scroll-y-container">
                        <div className="flex justify-center h-screen w-80 lg:w-96">

                            <form className={`flex flex-col gap-8 w-10/12 py-20`} action={formAction}>

                                <h2 className="text-2xl font-bold mb-4 text-center">Edit your profile</h2>

                                {/* Name */}
                                <div className="flex flex-col">
                                    <label htmlFor="name">What&apos;s your first name?</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        defaultValue={professional.name}
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
                                        defaultValue={professional.specialty}
                                        aria-describedby="specialty-error"
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
                                        defaultValue={professional.experience}
                                        aria-describedby="experience-error"
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
                                                defaultChecked={professional.employmentStatus === "employed"}
                                                aria-describedby="employmentStatus-error"
                                            />
                                            <label htmlFor="employed">Employed</label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="employmentStatus"
                                                id="unemployed"
                                                value="unemployed"
                                                defaultChecked={professional.employmentStatus === "unemployed"}
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
                                        defaultValue={professional.description}
                                        aria-describedby="description-error"
                                    />
                                    <div id="description-error" aria-live="polite" aria-atomic="true">
                                        {state.errors?.description &&
                                            state.errors.description.map((error: string) => (
                                                <p className="input-error" key={error}>{error}</p>
                                            ))
                                        }
                                    </div>
                                </div>


                                <div className="flex flex-col gap-5">
                                    <div className="flex gap-5">
                                        <PrimaryButton type="submit">Save</PrimaryButton>
                                        <PrimaryButton action={handleChangeEditMode}>Cancel</PrimaryButton>
                                    </div>
                                    {
                                        formMessage && <p className={`text-center ${state.errors ? "form-error" : "form-success"}`}>{formMessage}</p>
                                    }
                                </div>

                                <div className="flex flex-col gap-5 lg:hidden">
                                    <div></div>
                                    <div></div>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {
                !editMode &&
                <PrimaryButton action={handleChangeEditMode}>Edit profile</PrimaryButton>
            }
        </div>
    );
}


export function OrganizationEditProfileForm({ organization }: { organization: OrganizationWithColors }) {
    const [editMode, setEditMode] = useState(false);
    const [formMessage, setFormMessage] = useState("");

    const handleChangeEditMode = () => setEditMode(!editMode);

    const initialState: OrganizationEditProfileState = {
        errors: null,
        message: null,
    };

    const organizationEditProfileFormActionWithId = organizationEditProfileFormAction.bind(null, organization._id) /* For a given function, creates a bound function that has the same body as the original function. The this object of the bound function is associated with the specified object, and has the specified initial parameters.*/
    const [state, formAction] = useActionState(organizationEditProfileFormActionWithId, initialState);

    useEffect(() => {
        setFormMessage(state.message ? state.message : "");

        if (!state.errors) setTimeout(() => {

            /* handleChangeEditMode(); Si uso esto, al reenderizarse por primera vez, se abrira asi que hago directamente setEditMode(false);*/
            setEditMode(false);
            setFormMessage("")

        }, 3000);

    }, [state])


    return (
        <div className="flex flex-col justify-center items-center gap-14 w-full">
            {
                editMode && (
                    <form className={`flex flex-col gap-8 w-full`} action={formAction}>

                        <h2 className="text-2xl font-bold mb-4">Edit organization&apos;s profile</h2>

                        {/* Name */}
                        <div className=" flex flex-col">
                            <label htmlFor="name">What&apos;s the organization&apos;s name?</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                defaultValue={organization.name}
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
                                defaultValue={organization.area}
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

                        {/* Website */}
                        <div className=" flex flex-col">
                            <label htmlFor="website">Does the organization have a website?</label>
                            <input
                                type="url"
                                name="website"
                                id="website"
                                defaultValue={organization.website}
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
                                defaultValue={organization.description}
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


                        <div className="flex flex-col gap-5">
                            <div className="flex gap-5">
                                <PrimaryButton type="submit">Save</PrimaryButton>
                                <PrimaryButton action={handleChangeEditMode}>Cancel</PrimaryButton>
                            </div>
                            {
                                formMessage && <p className={`text-center ${state.errors ? "form-error" : "form-success"}`}>{formMessage}</p>
                            }
                        </div>

                    </form>
                )
            }
            {
                !editMode &&
                <PrimaryButton action={handleChangeEditMode}>Edit profile</PrimaryButton>
            }
        </div>
    )


}
