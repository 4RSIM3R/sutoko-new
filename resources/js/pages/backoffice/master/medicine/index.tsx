import { BaseAction } from "@/components/base-action";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { Column, DataTable } from "@/components/data-table";
import { Button, Menu, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Medicine } from "@/types/medicine";
import { FormResponse } from "@/utils/constant/system";
import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { IconEye, IconPlus, IconSearch, IconTrash } from "justd-icons";
import { useState } from "react";


export default function MedicineIndex() {

    const [filters, setFilters] = useState({ name: '' });
    const [id, setId] = useState<any>();
    const { delete: destroy } = useForm();

    const onDelete = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        destroy(route('backoffice.medicine.destroy', id), FormResponse);
    };

    const columns: Column<Medicine>[] = [
        {
            id: 'id',
            header: 'ID',
            cell: (item) => item.id,

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

        },
        {
            id: 'current_stock',
            header: 'Current Stock',
            cell: (item) => item.current_stock,

        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (item) => (
                <BaseAction url="backoffice.medicine.show" id={item.id} setId={setId} onDelete={onDelete} />
            ),
        }
    ];

    const fetchData = async (params: Record<string, any>) => {
        const response = await axios.get<Base<Medicine[]>>(
            route('backoffice.medicine.fetch', params)
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
                    <h1 className="text-xl font-semibold" >Medicine</h1>
                    <p className="text-sm text-gray-600" >Manage All Medicine</p>
                </div>
                <div className="flex gap-4" >
                    <TextField
                        prefix={
                            <IconSearch />
                        }
                        placeholder="Search Medicine"
                        value={filters.name}
                        onChange={(val) => {
                            setFilters({ ...filters, name: val });
                        }}
                    />
                    <Link href={route('backoffice.medicine.create')} >
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
    )

}

MedicineIndex.layout = (page: any) => <AppLayout children={page} />;