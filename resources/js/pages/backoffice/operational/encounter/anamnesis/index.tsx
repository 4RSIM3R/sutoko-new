import { Button, Tabs } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Encounter } from "@/types/encounter";
import { IconCircleQuestionmarkFill } from "justd-icons";
import { MainComplaint } from "./components/main-complaint";
import { MedicalHistory } from "./components/medical-history";
import { FamilyHistory } from "./components/family-history";
import { AllergyHistory } from "./components/allergy-history";

type AnamnesisIndexProps = {
    encounter: Encounter
}

export default function AnamnesisIndex({ encounter }: AnamnesisIndexProps) {

    return (
        <div className="w-full" >
       
            <Tabs className="" aria-label="Anamnesis Form" >
                <Tabs.List>
                    <Tabs.Tab id="main">Keluhan</Tabs.Tab>
                    <Tabs.Tab id="history">Riwayat Penyakit</Tabs.Tab>
                    <Tabs.Tab id="family-history">Riwayat Penyakit Keluarga</Tabs.Tab>
                    <Tabs.Tab id="allergy">Riwayat Alergi</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel id="main" >
                    <MainComplaint encounter={encounter} />
                </Tabs.Panel>
                <Tabs.Panel id="history" >
                    <MedicalHistory encounter={encounter} />
                </Tabs.Panel>
                <Tabs.Panel id="family-history" >
                    <FamilyHistory id={encounter.id} />
                </Tabs.Panel>
                <Tabs.Panel id="allergy" >
                    <AllergyHistory id={encounter.id} />
                </Tabs.Panel>
            </Tabs>
        </div>
    )

}

AnamnesisIndex.layout = (page: any) => <AppLayout children={page} />;