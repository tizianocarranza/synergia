import { getOrganizationById, getProfessionalById } from '@/app/lib/data/read'
import { auth } from '../../../../../../auth'
import React from 'react'
import { LookForPage, MainPage } from '@/app/ui/pages/pages';
import ProfessionalCard from '@/app/ui/cards/professional-card';
import OrganizationCard from '@/app/ui/cards/organization-card';

async function Page() {
    const session = await auth();
    let professional, organization;

    if (session?.user.type === "professional") {
        professional = await getProfessionalById(session?.user.id);
    } else if (session?.user.type === "organization") {
        organization = await getOrganizationById(session?.user.id);
    }

    return (
        <MainPage header='Profile (comming up)'>
            {
                professional && <ProfessionalCard professional={professional} />
            }
            {
                organization && <OrganizationCard organization={organization} />
            }
        </MainPage>
    )
}

export default Page;