import { MainPage } from "@/app/ui/pages/pages";
import { LinkButton } from "@/app/ui/buttons/buttons";

export default function Inbox() {
    return (
        <MainPage
            header={<>In<span className="text-brand">box</span></>}
            text="Messages between professionals and organizations are coming soon."
        >
            <LinkButton href="/professionals">Browse professionals</LinkButton>
        </MainPage>
    );
}
