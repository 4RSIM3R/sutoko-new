import { Button, buttonStyles, Menu, Pagination, Table } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Medicine } from "@/types/medicine";
import { Link } from "@inertiajs/react";
import { IconPlus } from "justd-icons";

type MedicineIndexProps = {
    medicines: Base<Medicine[]>;
}

export default function MedicineIndex({ medicines }: MedicineIndexProps) {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Medicine</h1>
                    <p className="text-sm text-gray-500" >Manage all medicines</p>
                </div>
                <div>
                    <Link href={route('backoffice.medicine.create')}>
                        <Button appearance="outline" >
                            <IconPlus />
                            Add New
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                <Table className="my-4" >
                    <Table.Header className="w-full" >
                        <Table.Column isRowHeader>Trademark</Table.Column>
                        <Table.Column>KFA Code</Table.Column>
                        <Table.Column>Manufacturer</Table.Column>
                        <Table.Column>Unit of Measure</Table.Column>
                        <Table.Column>Action</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            medicines.items != null ? (medicines.items ?? []).map((medicine: Medicine) => (
                                <Table.Row key={medicine.kfa_code}>
                                    <Table.Cell>{medicine.trademark}</Table.Cell>
                                    <Table.Cell>{medicine.kfa_code}</Table.Cell>
                                    <Table.Cell>{medicine.manufacturer}</Table.Cell>
                                    <Table.Cell>{medicine.unit_of_meassurement}</Table.Cell>
                                    <Table.Cell>
                                        <Menu>
                                            <Menu.Trigger className={buttonStyles({ appearance: "outline", size: "extra-small" })}>ACTION</Menu.Trigger>
                                            <Menu.Content placement="bottom" className="sm:min-w-48">
                                                <Menu.Item>Riwayat Kunjungan</Menu.Item>
                                                <Menu.Item>Daftarkan Kunjungan</Menu.Item>
                                                <Menu.Separator />
                                                <Menu.Submenu>
                                                    <Menu.Item>Cetak</Menu.Item>
                                                    <Menu.Content>
                                                        <Menu.Item>Gelang Pasien</Menu.Item>
                                                        <Menu.Item>Kartu Pasien</Menu.Item>
                                                        <Menu.Item>General Consent</Menu.Item>
                                                    </Menu.Content>
                                                </Menu.Submenu>
                                            </Menu.Content>
                                        </Menu>
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
                        {
                            medicines.prev_page &&
                            <Pagination.Item variant="previous" href={route('backoffice.patient.index', { page: medicines.prev_page })} />
                        }
                        {
                            medicines.next_page &&
                            <Pagination.Item variant="next" href={route('backoffice.patient.index', { page: medicines.next_page })} />
                        }
                    </Pagination.List>
                </Pagination>
            </div>
        </div>
    )

}

MedicineIndex.layout = (page: any) => <AppLayout children={page} />;