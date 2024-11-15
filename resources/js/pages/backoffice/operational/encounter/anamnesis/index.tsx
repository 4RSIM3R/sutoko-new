import { Button, Tabs } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Encounter } from "@/types/encounter";
import { IconCircleQuestionmarkFill } from "justd-icons";
import { MainComplaint } from "./components/main";
import { AccompanyComplain } from "./components/accompany";
import { MedicalHistory } from "./components/medical-history";
import { FamilyHistory } from "./components/family-history";
import { AllergyHistory } from "./components/allergy-history";

type AnamnesisIndexProps = {
    encounter: Encounter
}

export default function AnamnesisIndex({ encounter }: AnamnesisIndexProps) {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Anamesis Form</h1>
                    <p className="text-sm text-gray-500" >Anamnesis for patient {encounter.patient?.name}</p>
                </div>
                <div>
                    <Button appearance="outline" >
                        <IconCircleQuestionmarkFill />
                    </Button>
                </div>
            </div>
            <Tabs className="mt-4" aria-label="Anamnesis Form" >
                <Tabs.List>
                    <Tabs.Tab id="main">Keluhan</Tabs.Tab>
                    <Tabs.Tab id="history">Riwayat Penyakit</Tabs.Tab>
                    <Tabs.Tab id="family-history">Riwayat Penyakit Keluarga</Tabs.Tab>
                    <Tabs.Tab id="allergy">Riwayat Alergi</Tabs.Tab>
                    <Tabs.Tab id="medication">Riwayat Pengobatan</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel id="main" >
                    <MainComplaint />
                </Tabs.Panel>
                <Tabs.Panel id="history" >
                    <MedicalHistory />
                </Tabs.Panel>
                <Tabs.Panel id="family-history" >
                    <FamilyHistory />
                </Tabs.Panel>
                <Tabs.Panel id="allergy" >
                    <AllergyHistory />
                </Tabs.Panel>
                <Tabs.Panel id="medication" >
                    <MedicalHistory />
                </Tabs.Panel>
            </Tabs>
        </div>
    )

}

AnamnesisIndex.layout = (page: any) => <AppLayout children={page} />;