import ProfessionalCard from "../../../ui/cards/professional-card";
import { professionalWithColors } from "@/app/lib/definitions";
import { LookForPage } from "@/app/ui/pages/pages";
import { getAllProfessionals } from "@/app/lib/data/read";


export default async function Professionals() {

    let professionals: professionalWithColors[] = [];
    professionals = await getAllProfessionals();

    return (
        <LookForPage header="Professionals">
                {
                    professionals.map((professional) => (
                        <ProfessionalCard 
                        key={professional._id} 
                        professional={professional}  
                        />
                    ))
                }
        </LookForPage>
    )
}