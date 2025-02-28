import { BaseAction } from "@/components/base-action";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { Column, DataTable } from "@/components/data-table";
import { Button, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Practitioner } from "@/types/practioner";
import { FormResponse } from "@/utils/constant/system";
import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { IconPlus, IconSearch } from "justd-icons";
import { useState } from "react";


export default function PractionerIndex() {

    const [filters, setFilters] = useState({ name: '' });
    const [id, setId] = useState<any>();
    const { delete: destroy } = useForm();

    const onDelete = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        destroy(route('backoffice.practioner.destroy', id), FormResponse);
    };

    const columns: Column<any>[] = [
        {
            id: 'satu_sehat_id',
            header: 'Satu Sehat ID',
            cell: (item) => item.satu_sehat_id,
            isRowHeader: true,
        },
        {
            id: 'nip',
            header: 'NIP',
            cell: (item) => item.nip,
        },
        {
            id: 'name',
            header: 'Name',
            cell: (item) => `${item.prefix}, ${item.name} ${item.suffix}`,
            sortable: true
        },
        {
            id: 'occupation',
            header: 'Occupation',
            cell: (item) => item.occupation,
            sortable: true,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (item) => (<BaseAction url="backoffice.practioner.show" id={item.id} setId={setId} onDelete={onDelete} />),
            sortable: false
        }
    ];

    const fetchData = async (params: Record<string, any>) => {
        const response = await axios.get<Base<Practitioner[]>>(
            route('backoffice.practioner.fetch', params)
        );
        return response.data;
    };

    return (
        <>
            <ConfirmationDialog
                isOpen={id}
                onClose={() => setId(null)}
                onDelete={(e) => onDelete(e)}
            />
            <div className="flex justify-between" >
                <div>
                    <h1 className="text-xl font-semibold" >Practioner</h1>
                    <p className="text-sm text-gray-600" >Manage All Practioner</p>
                </div>
                <div className="flex gap-4" >
                    <TextField
                        prefix={
                            <IconSearch />
                        }
                        placeholder="Search Practioner"
                        value={filters.name}
                        onChange={(val) => {
                            setFilters({ ...filters, name: val });
                        }}
                    />
                    <Link href={route('backoffice.practioner.create')} >
                        <Button>
                            <IconPlus />
                            Add Data
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="my-4 flex flex-col gap-2" >
                <DataTable
                    columns={columns}
                    fetchData={fetchData}
                    filters={filters}
                />
            </div>
        </>
    );

}

PractionerIndex.layout = (page: any) => <AppLayout children={page} />;