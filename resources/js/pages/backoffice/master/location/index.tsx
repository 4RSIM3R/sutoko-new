import { Button, buttonStyles, Menu, Pagination, Table } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Location } from "@/types/location";
import { Link } from "@inertiajs/react";
import { IconPlus } from "justd-icons";

type LocationIndexProps = {
    locations: Base<Location[]>;
}

export default function LocationIndex({ locations }: LocationIndexProps) {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Charge Book</h1>
                    <p className="text-sm text-gray-500" >Manage all payment method</p>
                </div>
                <div>
                    <Link href={route('backoffice.location.create')}>
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
                        <Table.Column>Name</Table.Column>
                        <Table.Column>Type</Table.Column>
                        <Table.Column>Aksi</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            locations.items.map((location: Location) => (
                                <Table.Row key={location.satu_sehat_id} >
                                    <Table.Cell>{location.satu_sehat_id}</Table.Cell>
                                    <Table.Cell>{location.name}</Table.Cell>
                                    <Table.Cell>{location.physical_type_name}</Table.Cell>
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
                            locations.prev_page &&
                            <Pagination.Item variant="previous" href={route('backoffice.charge.index', { page: locations.prev_page })} />
                        }
                        {
                            locations.next_page &&
                            <Pagination.Item variant="next" href={route('backoffice.charge.index', { page: locations.next_page })} />
                        }
                    </Pagination.List>
                </Pagination>
            </div>
        </div>
    )

}

LocationIndex.layout = (page: any) => <AppLayout children={page} />;