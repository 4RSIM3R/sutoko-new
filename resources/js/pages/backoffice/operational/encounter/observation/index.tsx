import { Button, Tabs } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Encounter } from "@/types/encounter";
import { IconCircleQuestionmarkFill } from "justd-icons";
import { TTV } from "./components/ttv";
import { Awareness } from "./components/awareness";
import { Anthropometry } from "./components/anthropometry";
import { Psychological } from "./components/psychological";
import { HTT } from "./components/htt";
import { Summary } from "./components/summary";

type ObservationIndexProps = {
    encounter: Encounter
}

export default function ObservationIndex({ encounter }: ObservationIndexProps) {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Observation Form</h1>
                    <p className="text-sm text-gray-500" >Observation for patient {encounter.patient?.name}</p>
                </div>
                <div>
                    <Button appearance="outline" >
                        <IconCircleQuestionmarkFill />
                    </Button>
                </div>
            </div>
            <Tabs className="mt-4" aria-label="Observation Form" >
                <Tabs.List>
                    <Tabs.Tab id="ttv">Tanda Vital (Vital Sign)</Tabs.Tab>
                    <Tabs.Tab id="awareness">Tingkat Kesadaran</Tabs.Tab>
                    <Tabs.Tab id="anthropometry">Antropometri</Tabs.Tab>
                    <Tabs.Tab id="psychological">Psikologis</Tabs.Tab>
                    <Tabs.Tab id="htt">Head To Toe</Tabs.Tab>
                    <Tabs.Tab id="summary">Kesimpulan</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel id="ttv" >
                    <TTV />
                </Tabs.Panel>
                <Tabs.Panel id="awareness" >
                    <Awareness />
                </Tabs.Panel>
                <Tabs.Panel id="anthropometry" >
                    <Anthropometry />
                </Tabs.Panel>
                <Tabs.Panel id="psychological" >
                    <Psychological />
                </Tabs.Panel>
                <Tabs.Panel id="htt" >
                    <HTT />
                </Tabs.Panel>
                <Tabs.Panel id="summary" >
                    <Summary />
                </Tabs.Panel>
            </Tabs>
        </div>
    )

}

ObservationIndex.layout = (page: any) => <AppLayout children={page} />;