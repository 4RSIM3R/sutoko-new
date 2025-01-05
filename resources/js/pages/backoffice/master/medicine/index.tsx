import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { Column, DataTable } from "@/components/data-table";
import { Button, buttonStyles, Menu, Pagination, Table, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Medicine } from "@/types/medicine";
import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { IconEye, IconPlus, IconSearch, IconTrash } from "justd-icons";
import { useState } from "react";
import { toast } from "sonner";


export default function MedicineIndex() {

    const [filters, setFilters] = useState({ name: '' });
    const [id, setId] = useState<any>();
    const { delete: destroy } = useForm();

    const onDelete = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        destroy(route('backoffice.medicine.destroy', id), {
            onSuccess: () => toast.success('Data deleted successfully'),
            onError: (error) => toast('Whoopsss....', { description: JSON.stringify(error) }),
        });
    };

    const columns: Column<Medicine>[] = [
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
                <Menu>
                    <Menu.Trigger>
                        <Button size="extra-small" appearance="outline">Action</Button>
                    </Menu.Trigger>
                    <Menu.Content>
                        <Menu.Item href={route('backoffice.medicine.show', item.id)}>
                            <IconEye />
                            Detail
                        </Menu.Item>
                        <Menu.Item onAction={() => setId(item.id)}>
                            <IconTrash />
                            Delete
                        </Menu.Item>
                    </Menu.Content>
                </Menu>
            ),
            sortable: false
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