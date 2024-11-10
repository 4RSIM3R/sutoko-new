import { Button } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";
import { IconPlus } from "justd-icons";

export default function MedicineIndex() {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Medicine</h1>
                    <p className="text-sm text-gray-500" >Manage all medicines</p>
                </div>
                <div>
                    <Link href={route('backoffice.medicine.create')}>
                        <Button appearance="outline" >
                            <IconPlus />
                            Add New
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )

}

MedicineIndex.layout = (page: any) => <AppLayout children={page} />;