import { Button, Pagination, Table, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { router } from "@inertiajs/react";
import { IconPlus } from "justd-icons";
import { useState } from "react";

type MedicineFormProps = {
    medicines: {
        total: number;
        page: number;
        size: number;
        items: {
            data?: KfaItem[];
        }
    }
}

export default function MedicineForm({ medicines }: MedicineFormProps) {

    const [search, setSearh] = useState("");

    const onSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        router.get('', {
            name: search,
            page: 1,
        })
    }

    return (
        <div>
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >KFA Browser</h1>
                    <p className="text-sm text-gray-500" >Add new medicine item</p>
                </div>
                <form onSubmit={onSearch} className="flex gap-4" >
                    <TextField value={search} onChange={(v) => setSearh(v)} placeholder="Search..." />
                    <Button type="submit" appearance="outline">
                        Search
                    </Button>
                </form>
            </div>
            <div>
                <Table className="my-4" >
                    <Table.Header className="w-full" >
                        <Table.Column isRowHeader>Trademark</Table.Column>
                        <Table.Column>KFA Code</Table.Column>
                        <Table.Column>Manufacturer</Table.Column>
                        <Table.Column>Unit of Measure</Table.Column>
                        <Table.Column>Nomer Izin Edar</Table.Column>
                        <Table.Column>Action</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            medicines.items != null ? (medicines.items.data ?? []).map((medicine: KfaItem) => (
                                <Table.Row key={medicine.kfa_code}>
                                    <Table.Cell>{medicine.nama_dagang}</Table.Cell>
                                    <Table.Cell>{medicine.kfa_code}</Table.Cell>
                                    <Table.Cell>{medicine.manufacturer}</Table.Cell>
                                    <Table.Cell>{medicine.uom?.name}</Table.Cell>
                                    <Table.Cell>{medicine.nie}</Table.Cell>
                                    <Table.Cell>
                                        <form action={route('backoffice.medicine.store')} method="post">
                                            <input type="hidden" name="medicine" value={medicine.kfa_code} />
                                            <Button type="submit" appearance="outline">
                                                <IconPlus />
                                                Tambahkan
                                            </Button>
                                        </form>
                                    </Table.Cell>
                                </Table.Row>
                            )) : (
                                <>
                                    <p>Empty result...</p>
                                </>
                            )
                        }
                    </Table.Body>
                </Table>
                <Pagination>
                    <Pagination.List>

                    </Pagination.List>
                </Pagination>
            </div>
        </div>
    )

}

MedicineForm.layout = (page: any) => <AppLayout children={page} />;