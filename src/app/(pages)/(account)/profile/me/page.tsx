import { getUserById } from '@/app/lib/data/read'
import { organizationWithColors, professionalWithColors } from '@/app/lib/definitions'
import { auth } from '../../../../../../auth'
import React from 'react'
import { LookForPage, MainPage } from '@/app/ui/pages/pages';
import ProfessionalCard from '@/app/ui/cards/professional-card';
import OrganizationCard from '@/app/ui/cards/organization-card';

async function Page() {
    const session = await auth();
    const { formattedProfessional, formattedOrganization } = await getUserById(session?.user?.id);

    return (
        <MainPage header='Profile (comming up)'>
            {
                formattedProfessional && <ProfessionalCard professional={formattedProfessional} /> 
            }
            {
                formattedOrganization && <OrganizationCard organization={formattedOrganization} /> 
            }
        </MainPage>
    )
}

export default Page;