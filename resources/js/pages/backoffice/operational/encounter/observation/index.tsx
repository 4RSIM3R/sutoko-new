import { Button, Tabs } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Encounter } from "@/types/encounter";
import { IconCircleQuestionmarkFill } from "justd-icons";
import { TTV } from "./components/ttv";;
import { Psychological } from "./components/psychological";
import { HTT } from "./components/htt";
import { Summary } from "./components/summary";

type ObservationIndexProps = {
    encounter: Encounter
}

export default function ObservationIndex({ encounter }: ObservationIndexProps) {

    return (
        <div className="w-full" >

            <Tabs className="" aria-label="Observation Form" >
                <Tabs.List>
                    <Tabs.Tab id="ttv">Tanda Vital (Vital Sign)</Tabs.Tab>
                    <Tabs.Tab id="psychological">Psikologis</Tabs.Tab>
                    <Tabs.Tab id="htt">Head To Toe</Tabs.Tab>
                    <Tabs.Tab id="summary">Kesimpulan</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel id="ttv" >
                    <TTV encounter={encounter} />
                </Tabs.Panel>
                <Tabs.Panel id="psychological" >
                    <Psychological encounter={encounter} />
                </Tabs.Panel>
                <Tabs.Panel id="htt" >
                    <HTT encounter={encounter} />
                </Tabs.Panel>
                <Tabs.Panel id="summary" >
                    <Summary encounter={encounter} />
                </Tabs.Panel>
            </Tabs>
        </div>
    )

}

ObservationIndex.layout = (page: any) => <AppLayout children={page} />;