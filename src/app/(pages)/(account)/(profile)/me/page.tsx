import { getOrganizationById, getProfessionalById } from '@/app/lib/data/read'
import { auth } from '../../../../../../auth'
import React from 'react'
import ProfessionalCard from '@/app/ui/cards/professional-card';
import OrganizationCard from '@/app/ui/cards/organization-card';
import { OrganizationEditProfileForm, ProfessionalEditProfileForm } from '@/app/ui/account/profile-forms';

async function Page() {
    const session = await auth();
    let professional, organization;

    if (session?.user.type === "professional") {
        professional = await getProfessionalById(session?.user.id);
    } else if (session?.user.type === "organization") {
        organization = await getOrganizationById(session?.user.id);
    }

    return (
        <div className='flex justify-center w-full'>
            {
                professional && (
                    <div className='flex flex-col items-center justify-center gap-20 w-2/3'>

                        <div className='flex flex-1 flex-col gap-5 w-80 lg:w-96'>
                            <ProfessionalCard professional={professional} />
                        </div>
                        
                        {/* Buttons */}
                        <div className='flex flex-1 flex-col gap-5 w-80 lg:w-96'>
                            <ProfessionalEditProfileForm professional={professional} />
                        </div>

                    </div>
                )
            }
            {
                organization && (
                    <div className='flex flex-col items-center justify-center gap-20 w-2/3'>

                        <div className='flex flex-1 flex-col gap-5 w-80 lg:w-96'>
                            <OrganizationCard organization={organization} />
                        </div>

                        {/* Buttons */}
                        <div className='flex flex-1 flex-col gap-5 w-80 lg:w-96'>
                            <OrganizationEditProfileForm organization={organization} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Page;