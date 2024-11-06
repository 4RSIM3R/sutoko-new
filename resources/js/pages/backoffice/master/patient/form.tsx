import { Button } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { IconCircleQuestionmarkFill } from "justd-icons";

export default function PatientForm() {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Patient Form</h1>
                    <p className="text-sm text-gray-500" >Add new patient</p>
                </div>
                <div>
                    <Button appearance="outline" >
                        <IconCircleQuestionmarkFill />
                    </Button>
                </div>
            </div>
            <div className="my-4" >
                form here
            </div>
        </div>
    )

}

PatientForm.layout = (page: any) => <AppLayout children={page} />;