import { MainPage } from "@/app/ui/pages/pages";
import { LinkButton } from "@/app/ui/buttons/buttons";

export default function NotFound() {
    return (
        <MainPage
            header="Page not found"
            text="Ups! The page you're looking for doesn't exist."
        >
            <LinkButton href="/">Back to home</LinkButton>
        </MainPage>
    )
}
