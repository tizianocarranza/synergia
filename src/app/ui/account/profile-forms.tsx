"use client"

import { specialties, areas, ProfessionalWithColors, OrganizationWithColors } from "@/app/lib/types/general";
import { PrimaryButton } from "../buttons/buttons";
import { ProfessionalEditProfileState, professionalEditProfileFormAction, organizationEditProfileFormAction, OrganizationEditProfileState } from "@/app/lib/data/actions";
import { useActionState, useEffect, useRef, useState } from "react";

/* Foco del modal de edición: al abrir va al primer campo, Escape cierra (igual que Cancel)
   y al cerrar el foco vuelve a "Edit profile" */
function useEditDialog(open: boolean, setOpen: (open: boolean) => void) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const wasOpen = useRef(false);

    useEffect(() => {
        if (!open) {
            if (wasOpen.current) {
                wasOpen.current = false;
                triggerRef.current?.focus();
            }
            return;
        }
        wasOpen.current = true;
        dialogRef.current?.querySelector<HTMLElement>("input, textarea, select")?.focus();
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, setOpen]);

    return { dialogRef, triggerRef };
}

export function ProfessionalEditProfileForm({ professional }: { professional: ProfessionalWithColors }) {
    const [editMode, setEditMode] = useState(false);
    const [formMessage, setFormMessage] = useState("");

    const handleChangeEditMode = () => setEditMode(!editMode);
    const { dialogRef, triggerRef } = useEditDialog(editMode, setEditMode);

    const initialState: ProfessionalEditProfileState = {
        errors: null,
        message: null,
    };

    /* El mensaje y el cierre del modal se manejan al terminar el action (no en un useEffect) */
    const [state, formAction] = useActionState(async (prevState: ProfessionalEditProfileState, formData: FormData) => {
        const result = await professionalEditProfileFormAction(prevState, formData);
        setFormMessage(result.message ? result.message : "");

        if (!result.errors) setTimeout(() => {
            setEditMode(false);
            setFormMessage("");
        }, 3000);

        return result;
    }, initialState);

    return (
        <div>
            {
                editMode && (
                    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" className="fixed inset-0 bg-paper/95 z-[70] overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center px-5 py-10">

                            <form className="flex flex-col gap-6 w-full max-w-lg bg-white border-2 border-ink rounded-[6px] p-6 shadow-hard" action={formAction}>

                                <h2 id="edit-profile-title" className="display text-3xl">Edit your profile</h2>

                                {/* Name */}
                                <div className="flex flex-col">
                                    <label className="label mb-1.5" htmlFor="name">What&apos;s your first name?</label>
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
                                    <label className="label mb-1.5" htmlFor="specialty">What are you good at?</label>
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
                                    <label className="label mb-1.5" htmlFor="experience">How many years of experience do you have?</label>
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
                                    <label className="label mb-1.5" htmlFor="employmentStatus">What&apos;s your current employment status?</label>
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
                                            <label className="font-semibold" htmlFor="employed">Employed</label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="employmentStatus"
                                                id="unemployed"
                                                value="unemployed"
                                                defaultChecked={professional.employmentStatus === "unemployed"}
                                            />
                                            <label className="font-semibold" htmlFor="unemployed">Unemployed</label>
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
                                    <label className="label mb-1.5" htmlFor="description">Give us a brief description of yourself as a professional</label>
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
                                        <PrimaryButton action={handleChangeEditMode} variant="light">Cancel</PrimaryButton>
                                    </div>
                                    {
                                        formMessage && <p className={`${state.errors ? "form-error" : "form-success"}`}>{formMessage}</p>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {
                !editMode &&
                <PrimaryButton ref={triggerRef} action={handleChangeEditMode}>Edit profile</PrimaryButton>
            }
        </div>
    );
}


export function OrganizationEditProfileForm({ organization }: { organization: OrganizationWithColors }) {
    const [editMode, setEditMode] = useState(false);
    const [formMessage, setFormMessage] = useState("");

    const handleChangeEditMode = () => setEditMode(!editMode);
    const { dialogRef, triggerRef } = useEditDialog(editMode, setEditMode);

    const initialState: OrganizationEditProfileState = {
        errors: null,
        message: null,
    };

    /* El mensaje y el cierre del modal se manejan al terminar el action (no en un useEffect) */
    const [state, formAction] = useActionState(async (prevState: OrganizationEditProfileState, formData: FormData) => {
        const result = await organizationEditProfileFormAction(prevState, formData);
        setFormMessage(result.message ? result.message : "");

        if (!result.errors) setTimeout(() => {
            setEditMode(false);
            setFormMessage("");
        }, 3000);

        return result;
    }, initialState);


    return (
        <div>
            {
                editMode && (
                    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" className="fixed inset-0 bg-paper/95 z-[70] overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center px-5 py-10">

                            <form className="flex flex-col gap-6 w-full max-w-lg bg-white border-2 border-ink rounded-[6px] p-6 shadow-hard" action={formAction}>

                                <h2 id="edit-profile-title" className="display text-3xl">Edit organization&apos;s profile</h2>

                                {/* Name */}
                                <div className=" flex flex-col">
                                    <label className="label mb-1.5" htmlFor="name">What&apos;s the organization&apos;s name?</label>
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
                                    <label className="label mb-1.5" htmlFor="area">What&apos;s the organization&apos;s operative area?</label>
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
                                    <label className="label mb-1.5" htmlFor="website">Does the organization have a website?</label>
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
                                    <label className="label mb-1.5" htmlFor="description">Give us a brief description of the organization</label>
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
                                        <PrimaryButton action={handleChangeEditMode} variant="light">Cancel</PrimaryButton>
                                    </div>
                                    {
                                        formMessage && <p className={`${state.errors ? "form-error" : "form-success"}`}>{formMessage}</p>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {
                !editMode &&
                <PrimaryButton ref={triggerRef} action={handleChangeEditMode}>Edit profile</PrimaryButton>
            }
        </div>
    )


}
