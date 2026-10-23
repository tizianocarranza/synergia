import { MainPage } from "@/app/ui/pages/pages";

const tiles = [
    <>Through an intuitive interface and advanced tools, Synergia allows <span className="text-brand">developers</span> to showcase their skills, specialties, and experiences through customizable profiles.</>,
    <><span className="text-brand">Organizations,</span> on the other hand, can efficiently search for and engage with top talent, streamlining the hiring process.</>,
    <>Whether you&apos;re a developer looking to expand your career or you represent an organization seeking the best candidates, Synergia provides the platform to <span className="text-brand">synergize</span> and succeed.</>,
];

export default function About() {
    return (
        <MainPage
            header={<>Synergia<span className="text-brand">?</span> Whaaat!?</>}
        >
            <div className="grid gap-6 md:grid-cols-3">
                <p className="md:col-span-3 text-2xl font-semibold max-w-4xl">
                    Synergia is an innovative web application designed to connect and enhance <span className="text-brand">collaboration</span> between developers and organizations in the tech industry.
                </p>
                {tiles.map((tile, i) => (
                    <div key={i} className="flex flex-col gap-4 border-2 border-ink rounded-[6px] bg-white p-6">
                        <span className="label">{String(i + 1).padStart(2, "0")}</span>
                        <p className="text-lg">{tile}</p>
                    </div>
                ))}
            </div>
        </MainPage>
    );
}
