import React from 'react'
import { getProfessionalById, getOrganizationById, getUserById } from '@/app/lib/data/read';
import ProfessionalCard from '@/app/ui/cards/professional-card';
import OrganizationCard from '@/app/ui/cards/organization-card';
import { MainPage } from '@/app/ui/pages/pages';

async function Page({ params }: { params: { id: String }}) {

    const user = await getUserById(params.id);
    
    

  return (
    <MainPage header={user.formattedProfessional ? user.formattedProfessional.name : user.formattedOrganization.name}>
    {
        user.formattedProfessional && (
            <div className='flex flex-col items-center justify-center gap-20 w-2/3'>
                <div className='flex flex-1 flex-col gap-5 w-80 lg:w-96'>
                    <ProfessionalCard professional={user.formattedProfessional} />
                </div>
            </div>
        )
    }
    {
        user.formattedOrganization && (
            <div className='flex flex-col items-center justify-center gap-20 w-2/3'>
                <div className='flex flex-1 flex-col gap-5 w-80 lg:w-96'>
                    <OrganizationCard organization={user.formattedOrganization} />
                </div>
            </div>
        )
    }
</MainPage>
  )
}

export default Page;