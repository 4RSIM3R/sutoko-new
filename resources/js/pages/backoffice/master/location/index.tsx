import { Button } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";
import { IconPlus } from "justd-icons";

export default function LocationIndex() {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Charge Book</h1>
                    <p className="text-sm text-gray-500" >Manage all payment method</p>
                </div>
                <div>
                    <Link href={route('backoffice.location.create')}>
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

LocationIndex.layout = (page: any) => <AppLayout children={page} />;