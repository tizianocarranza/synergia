import { getOrganizationById, getProfessionalById } from '@/app/lib/data/read'
import { auth } from '../../../../../../auth'
import React from 'react'
import { OrganizationEditProfileForm, ProfessionalEditProfileForm } from '@/app/ui/account/profile-forms';
import { MainPage } from '@/app/ui/pages/pages';
import { ProfileView } from '@/app/ui/profile/profile-view';

async function Page() {
    const session = await auth();
    let professional, organization;

    if (session?.user.type === "professional") {
        professional = await getProfessionalById(session?.user.id);
    } else if (session?.user.type === "organization") {
        organization = await getOrganizationById(session?.user.id);
    }

    if (professional) return <ProfileView user={professional} action={<ProfessionalEditProfileForm professional={professional} />} />
    if (organization) return <ProfileView user={organization} action={<OrganizationEditProfileForm organization={organization} />} />

    return <MainPage header="My profile">{null}</MainPage>
}

export default Page;
