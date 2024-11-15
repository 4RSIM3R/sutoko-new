import { Button, Tabs } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Encounter } from "@/types/encounter";
import { IconCircleQuestionmarkFill } from "justd-icons";
import { Diagnose } from "./components/diagnose";
import { RiskAssessment } from "./components/risk-assessment";
import { Service } from "./components/service";
import { Nutrition } from "./components/nutrition";
import { Medication } from "./components/medication";
import { FollowUp } from "./components/follow-up";

type ObservationIndexProps = {
    encounter: Encounter
}

export default function ConditionIndex({ encounter }: ObservationIndexProps) {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Diagnose Form</h1>
                    <p className="text-sm text-gray-500" >Diagnose for patient {encounter.patient?.name}</p>
                </div>
                <div>
                    <Button appearance="outline" >
                        <IconCircleQuestionmarkFill />
                    </Button>
                </div>
            </div>
            <Tabs className="mt-4" aria-label="Anamnesis Form" >
                <Tabs.List>
                    <Tabs.Tab id="diagnose">Diagnosa</Tabs.Tab>
                    <Tabs.Tab id="risk-assessment">Penilaian Resiko</Tabs.Tab>
                    <Tabs.Tab id="service">Tindakan</Tabs.Tab>
                    <Tabs.Tab id="nutrition">Nutrisi / Diet</Tabs.Tab>
                    <Tabs.Tab id="medication">Peresepan Obat</Tabs.Tab>
                    <Tabs.Tab id="follow-up">Rencana Tindak Lanjut</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel id="diagnose" >
                    <Diagnose />
                </Tabs.Panel>
                <Tabs.Panel id="risk-assessment" >
                    <RiskAssessment />
                </Tabs.Panel>
                <Tabs.Panel id="service" >
                    <Service />
                </Tabs.Panel>
                <Tabs.Panel id="nutrition" >
                    <Nutrition />
                </Tabs.Panel>
                <Tabs.Panel id="medication" >
                    <Medication />
                </Tabs.Panel>
                <Tabs.Panel id="follow-up" >
                    <FollowUp />
                </Tabs.Panel>
            </Tabs>
        </div>
    )

}

ConditionIndex.layout = (page: any) => <AppLayout children={page} />;