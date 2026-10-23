import React from 'react'
import { notFound } from 'next/navigation';
import { getUserById } from '@/app/lib/data/read';
import { ProfileView } from '@/app/ui/profile/profile-view';

async function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const user = await getUserById(id);

    if (!user) notFound();

    const profile = user.formattedProfessional ?? user.formattedOrganization;
    if (!profile) notFound();

    return <ProfileView user={profile} />
}

export default Page;
