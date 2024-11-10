import { Button, buttonStyles, Menu, Pagination, Table } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Practitioner } from "@/types/practioner";
import { Link } from "@inertiajs/react";
import { IconPlus } from "justd-icons";

type PractionerIndexProps = {
    practioners: Base<Practitioner[]>;
}

export default function PractionerIndex({ practioners }: PractionerIndexProps) {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Practioners</h1>
                    <p className="text-sm text-gray-500" >Manage all practioners</p>
                </div>
                <div>
                    <Link href={route('backoffice.practioner.create')}>
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
                        <Table.Column isRowHeader>NIK</Table.Column>
                        <Table.Column>Nama</Table.Column>
                        <Table.Column>Role</Table.Column>
                        <Table.Column>Satu Sehat ID</Table.Column>
                        <Table.Column>Action</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            practioners.items.map((practitioner: Practitioner) => (
                                <Table.Row key={practitioner.id}>
                                    <Table.Cell>{practitioner.nik}</Table.Cell>
                                    <Table.Cell>{practitioner.name}</Table.Cell>
                                    <Table.Cell>{practitioner.role}</Table.Cell>
                                    <Table.Cell>{practitioner.satu_sehat_id}</Table.Cell>
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
                            practioners.prev_page &&
                            <Pagination.Item variant="previous" href={route('backoffice.practioner.index', { page: practioners.prev_page })} />
                        }
                        {
                            practioners.next_page &&
                            <Pagination.Item variant="next" href={route('backoffice.practioner.index', { page: practioners.next_page })} />
                        }
                    </Pagination.List>
                </Pagination>
            </div>
        </div>
    );

}

PractionerIndex.layout = (page: any) => <AppLayout children={page} />;