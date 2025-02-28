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


export default function AssuranceIndex() {

    const [filters, setFilters] = useState();
    const [id, setId] = useState<any>();
    const { delete: destroy } = useForm();

    const onDelete = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        destroy(route('backoffice.assurance.destroy', id), FormResponse);
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
            id: 'contact',
            header: 'Contact',
            cell: (item) => item.contact,
        },
        {
            id: 'coverage',
            header: 'Coverage',
            cell: (item) => (
                <Button size="extra-small" appearance="outline">0 Coverage</Button>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (item) => (<BaseAction url="backoffice.assurance.show" id={item.id} setId={setId} onDelete={onDelete} />),
            sortable: false
        }
    ];

    const fetchData = async (params: Record<string, any>) => {
        const response = await axios.get<Base<any[]>>(
            route('backoffice.assurance.fetch', params)
        );
        return response.data;
    };

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Assurance</h1>
                    <p className="text-sm text-gray-500" >Manage all Assurance</p>
                </div>
                <div>
                    <Link href={route('backoffice.assurance.create')}>
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

AssuranceIndex.layout = (page: any) => <AppLayout children={page} />;