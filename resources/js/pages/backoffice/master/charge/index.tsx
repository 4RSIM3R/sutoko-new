import { Button, buttonStyles, Menu, Pagination, Table } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Charge } from "@/types/charge";
import { Link } from "@inertiajs/react";
import { IconPlus } from "justd-icons";

type ChargeIndexProps = {
    charges: Base<Charge[]>;
}

export default function ChargeIndex({ charges }: ChargeIndexProps) {

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
                <Table className="my-4" >
                    <Table.Header className="w-full" >
                        <Table.Column isRowHeader >ID</Table.Column>
                        <Table.Column  >Name</Table.Column>
                        <Table.Column>Payment Method</Table.Column>
                        <Table.Column>Harga</Table.Column>
                        <Table.Column>Action</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            charges.items.map((patient: Charge) => (
                                <Table.Row key={patient.id} >
                                    <Table.Cell>{patient.id}</Table.Cell>
                                    <Table.Cell>{patient.name}</Table.Cell>
                                    <Table.Cell>{patient.payment_assurance?.name}</Table.Cell>
                                    <Table.Cell>{parseInt(patient.price).toLocaleString()}</Table.Cell>
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
                            ))
                        }
                    </Table.Body>
                </Table>
                <Pagination>
                    <Pagination.List>
                        {
                            charges.prev_page &&
                            <Pagination.Item variant="previous" href={route('backoffice.charge.index', { page: charges.prev_page })} />
                        }
                        {
                            charges.next_page &&
                            <Pagination.Item variant="next" href={route('backoffice.charge.index', { page: charges.next_page })} />
                        }
                    </Pagination.List>
                </Pagination>
            </div>
        </div>
    )

}

ChargeIndex.layout = (page: any) => <AppLayout children={page} />;