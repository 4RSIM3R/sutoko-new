import { Button } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { IconCircleQuestionmarkFill } from "justd-icons";

export default function EncounterForm() {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Encounter Form</h1>
                    <p className="text-sm text-gray-500" >Register new patient encounter</p>
                </div>
                <div>
                    <Button appearance="outline" >
                        <IconCircleQuestionmarkFill />
                    </Button>
                </div>
            </div>
            <form action="">
                {/* add react-select */}
            </form>
        </div>
    )

}

EncounterForm.layout = (page: any) => <AppLayout children={page} />;