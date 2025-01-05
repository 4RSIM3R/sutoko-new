import { Column, DataTable } from "@/components/data-table";
import { Button, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { IconPlus, IconSearch } from "justd-icons";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function MedicineForm() {

    const [filters, setFilters] = useState({ name: '', type: 'farmasi' });
    const [params] = useDebounce(filters, 250);
    const { post, data } = useForm();

    const columns: Column<KfaItem>[] = [
        {
            id: 'kfa_code',
            header: 'KFA Code',
            cell: (item) => item.kfa_code,
            sortable: false,
            isRowHeader: true,
        },
        {
            id: 'name',
            header: 'Name',
            cell: (item) => (
                <div className="whitespace-break-spaces" >
                    {item.nama_dagang}
                </div>
            ),
            sortable: false,
        },
        {
            id: 'manufacturer',
            header: 'Manufacturer',
            cell: (item) => item.manufacturer,
            sortable: false,
        },
        {
            id: 'unit_of_meassurement',
            header: 'Unit of Measurement',
            cell: (item) => (
                <>
                    {item.uom?.name}
                </>
            ),
            sortable: false,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (item) => (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    router.post(route('backoffice.medicine.store'), item);
                }}>
                    <Button size="extra-small" type="submit" appearance="outline">
                        <IconPlus />
                        Tambahkan
                    </Button>
                </form>
            ),
            sortable: false
        }

    ];

    const fetchData = async (params: Record<string, any>): Promise<Base<KfaItem[]>> => {
        const response = await axios.get<Base<KfaItem[]>>(
            route('backoffice.medicine.kfa_browser', params)
        );
        return response.data;
    };

    return (
        <div>
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >KFA Browser</h1>
                    <p className="text-sm text-gray-500" >Add New Medicine Item</p>
                </div>
                <TextField
                    prefix={
                        <IconSearch />
                    }
                    placeholder="Search Practioner"
                    value={filters.name}
                    onChange={(val) => {
                        // add debounce here
                        setFilters({ ...filters, name: val });
                    }}
                />
            </div>
            <div className="my-4 flex flex-col gap-2" >
                <DataTable
                    columns={columns}
                    fetchData={fetchData}
                    filters={params}
                />
            </div>
        </div>
    )

}

MedicineForm.layout = (page: any) => <AppLayout children={page} />;