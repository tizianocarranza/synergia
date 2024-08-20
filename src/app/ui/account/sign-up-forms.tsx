import { specialties, areas } from "@/app/lib/definitions"
import { PrimaryButton } from "../buttons/buttons"

export function ProfessionalSignUpForm() {
    return (
        <form action="" className="flex flex-col gap-14 w-80">

            <div className="flex flex-col gap-8">
                <div className=" flex flex-col">
                    <label htmlFor="name">What&apos;s your first name?</label>
                    <input type="text" name="name" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="specialty">What are you good at?</label>
                    <input list="specialties" name="specialty" />
                    <datalist id="specialties">
                        {
                            specialties.map(specialty => (
                                <option key={specialty}>{specialty}</option>
                            ))
                        }
                    </datalist>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="years">How many years of experience do you have?</label>
                    <input max={20} min={1} type="number" name="years" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description">Give us a brief description of yourself as a professional</label>
                    <textarea name="description" rows={4} minLength={50} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Write your email</label>
                    <input type="email" name="email" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Create a password</label>
                    <input type="password" name="password" />
                </div>
            </div>

            <PrimaryButton type="submit">
                <p className="text-brand">Create account</p>
            </PrimaryButton>
        </form>
    )
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