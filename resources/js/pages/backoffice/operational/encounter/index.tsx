import { Button } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";
import { IconPlus } from "justd-icons";

export default function EncounterIndex() {

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Encounter</h1>
                    <p className="text-sm text-gray-500" >Manage encounter and medical record</p>
                </div>
                <div>
                    <Link href={route('backoffice.encounter.create')}>
                        <Button appearance="outline" >
                            <IconPlus />
                            Add New
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="my-4" >

            </div>
        </div>
    )

}

EncounterIndex.layout = (page: any) => <AppLayout children={page} />;