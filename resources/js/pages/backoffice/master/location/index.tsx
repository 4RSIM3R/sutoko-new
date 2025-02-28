import { BaseAction } from "@/components/base-action";
import { Column, DataTable } from "@/components/data-table";
import { Button } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { FormResponse } from "@/utils/constant/system";
import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { IconPlus } from "justd-icons";
import { useState } from "react";

export default function LocationIndex() {

    const [filters, setFilters] = useState<Record<string, any>>({});
    const [id, setId] = useState<any>();
    const { delete: destroy } = useForm();

    const onDelete = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        destroy(route('backoffice.location.destroy', id), FormResponse);
    };

    const columns: Column<any>[] = [
        {
            id: 'id',
            header: 'ID',
            cell: (item) => item.id,
            sortable: false,
            isRowHeader: true,
        },
        {
            id: 'trademark',
            header: 'Trademark',
            cell: (item) => item.trademark,
            sortable: true
        },
        {
            id: 'kfa_code',
            header: 'KFA Code',
            cell: (item) => item.kfa_code,
            sortable: false,
        },
        {
            id: 'current_stock',
            header: 'Current Stock',
            cell: (item) => item.current_stock,
            sortable: false,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (item) => (
                <BaseAction url="backoffice.medicine.show" id={item.id} setId={setId} onDelete={onDelete} />
            ),
            sortable: false
        }
    ];

    const fetchData = async (params: Record<string, any>) => {
        const response = await axios.get<Base<any[]>>(
            route('backoffice.location.fetch', params)
        );
        return response.data;
    };

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Charge Book</h1>
                    <p className="text-sm text-gray-500" >Manage all charge book</p>
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
            <div>
                <DataTable
                    columns={columns}
                    fetchData={fetchData}
                    filters={filters ?? {}}
                />
            </div>
        </div>
    )

}

LocationIndex.layout = (page: any) => <AppLayout children={page} />;