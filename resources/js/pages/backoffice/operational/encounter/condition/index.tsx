import { Button, Tabs } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Encounter } from "@/types/encounter";
import { IconCircleQuestionmarkFill } from "justd-icons";
import { Diagnose } from "./components/diagnose";
import { Treatment } from "./components/treatment";
import { Nutrition } from "./components/nutrition";
import { Medication } from "./components/medication";
import { FollowUp } from "./components/follow-up";

type ObservationIndexProps = {
    encounter: Encounter
}

export default function ConditionIndex({ encounter }: ObservationIndexProps) {

    return (
        <div className="w-full" >

            <Tabs className="" aria-label="Anamnesis Form" >
                <Tabs.List>
                    <Tabs.Tab id="diagnose">Diagnosa (ICD 10) </Tabs.Tab>
                    <Tabs.Tab id="service">Tindakan (ICD 9)</Tabs.Tab>
                    <Tabs.Tab id="nutrition">Nutrisi / Diet</Tabs.Tab>
                    <Tabs.Tab id="medication">Peresepan Obat</Tabs.Tab>
                    <Tabs.Tab id="follow-up">Rencana Tindak Lanjut</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel id="diagnose" >
                    <Diagnose encounter={encounter} />
                </Tabs.Panel>
                <Tabs.Panel id="service" >
                    <Treatment encounter={encounter} />
                </Tabs.Panel>
                <Tabs.Panel id="nutrition" >
                    <Nutrition encounter={encounter} />
                </Tabs.Panel>
                <Tabs.Panel id="medication" >
                    <Medication encounter={encounter} />
                </Tabs.Panel>
                <Tabs.Panel id="follow-up" >
                    <FollowUp encounter={encounter} />
                </Tabs.Panel>
            </Tabs>
        </div>
    )

}

ConditionIndex.layout = (page: any) => <AppLayout children={page} />;