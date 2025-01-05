import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { Column, DataTable } from "@/components/data-table";
import { Button, Menu, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Practitioner } from "@/types/practioner";
import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { IconEye, IconPlus, IconSearch, IconTrash } from "justd-icons";
import { useState } from "react";
import { toast } from "sonner";


export default function PractionerIndex() {

    const [filters, setFilters] = useState({ name: '' });
    const [id, setId] = useState<any>();
    const { delete: destroy } = useForm();

    const onDelete = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        destroy(route('backoffice.practioner.destroy', id), {
            onSuccess: () => toast.success('Data deleted successfully'),
            onError: (error) => toast('Whoopsss....', { description: JSON.stringify(error) }),
        });
    };

    const columns: Column<Practitioner>[] = [
        {
            id: 'id',
            header: 'ID',
            cell: (item) => item.id,
            sortable: false,
            isRowHeader: true,
        },
        {
            id: 'name',
            header: 'Name',
            cell: (item) => item.name,
            sortable: true
        },
        {
            id: 'employee_id',
            header: 'Employee ID',
            cell: (item) => item.employee_id,
            sortable: false,
        },
        {
            id: 'occupation',
            header: 'Occupation',
            cell: (item) => <span>{item.occupation.toUpperCase()}</span>,
            sortable: true,
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
                        <Menu.Item href={route('backoffice.practioner.show', item.id)}>
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
                    <h1 className="text-xl font-semibold" >Bank</h1>
                    <p className="text-sm text-gray-600" >Master Data Bank</p>
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