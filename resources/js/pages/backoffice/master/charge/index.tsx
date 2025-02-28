import { BaseAction } from "@/components/base-action";
import { Column, DataTable } from "@/components/data-table";
import { Button } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { FormResponse } from "@/utils/constant/system";
import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { IconEye, IconPlus } from "justd-icons";
import { useState } from "react";

export default function ChargeIndex() {

    const [filters, setFilters] = useState<Record<string, any>>({});
    const [id, setId] = useState<any>();
    const { delete: destroy } = useForm();

    const onDelete = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        destroy(route('backoffice.charge.destroy', id), FormResponse);
    };

    const columns: Column<any>[] = [
        {
            id: 'id',
            header: 'ID',
            cell: (item) => item.satu_sehat_id,
            isRowHeader: true,
        },
        {
            id: 'name',
            header: 'Name',
            cell: (item) => item.name,
        },
        {
            id: 'desc',
            header: 'Description',
            cell: (item) => item.desc,
        },
        {
            id: 'pricing',
            header: 'Pricing',
            cell: (item) => (
                <Button size="extra-small" appearance="outline">
                    <IconEye />
                    Detail
                </Button>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (item) => (<BaseAction url="backoffice.charge.show" id={item.id} setId={setId} onDelete={onDelete} />),
            sortable: false
        }
    ];

    const fetchData = async (params: Record<string, any>) => {
        const response = await axios.get<Base<any[]>>(
            route('backoffice.charge.fetch', params)
        );
        return response.data;
    };

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Charge Book</h1>
                    <p className="text-sm text-gray-500" >Manage all payment method</p>
                </div>
                <div>
                    <Link href={route('backoffice.charge.create')}>
                        <Button appearance="outline" >
                            <IconPlus />
                            Add New
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                <DataTable
                    columns={columns}
                    fetchData={fetchData}
                    filters={filters}
                />
            </div>
        </div>
    )

}

ChargeIndex.layout = (page: any) => <AppLayout children={page} />;