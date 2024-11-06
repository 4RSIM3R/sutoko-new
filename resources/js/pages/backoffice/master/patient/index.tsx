import { Breadcrumbs, Button, buttonStyles, Menu, Pagination, Table } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";
import { IconPlus } from "justd-icons";

export default function PatientIndex() {



    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Patients</h1>
                    <p className="text-sm text-gray-500" >Manage all patients</p>
                </div>
                <div>
                    <Link href={route('backoffice.patient.create')}>
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
                        <Table.Column>NO RM</Table.Column>
                        <Table.Column>Nama</Table.Column>
                        <Table.Column>Alamat</Table.Column>
                        <Table.Column>Tanggal Lahir</Table.Column>
                        <Table.Column>ACTION</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>1234567890123456</Table.Cell>
                            <Table.Cell>000006</Table.Cell>
                            <Table.Cell>Muhammad Ilzam Mulkhaq</Table.Cell>
                            <Table.Cell>JL Singomerto 1234</Table.Cell>
                            <Table.Cell>25 Maret 2003</Table.Cell>
                            <Table.Cell>
                                <Menu>
                                    <Menu.Trigger className={buttonStyles({ appearance: "outline", size: "extra-small" })}>ACTION</Menu.Trigger>
                                    <Menu.Content placement="bottom" className="sm:min-w-48">
                                        <Menu.Item>Dashboard</Menu.Item>
                                        <Menu.Item>Reports</Menu.Item>
                                        <Menu.Separator />
                                        <Menu.Submenu>
                                            <Menu.Item>Settings</Menu.Item>
                                            <Menu.Content>
                                                <Menu.Item>General</Menu.Item>
                                                <Menu.Item>Security</Menu.Item>
                                                <Menu.Item>Privacy</Menu.Item>
                                                <Menu.Item>Data Sharing</Menu.Item>
                                            </Menu.Content>
                                        </Menu.Submenu>
                                        <Menu.Item>Help</Menu.Item>
                                    </Menu.Content>
                                </Menu>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Pagination>
                    <Pagination.List>
                        <Pagination.Item variant="previous" href="#" />
                        <Pagination.Item variant="next" href="#" />
                    </Pagination.List>
                </Pagination>
            </div>
        </div>
    );
}

PatientIndex.layout = (page: any) => <AppLayout children={page} />;