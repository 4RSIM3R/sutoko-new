import { Breadcrumbs, Button, buttonStyles, Menu, Pagination, Table } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Patient } from "@/types/patient";
import { Link } from "@inertiajs/react";
import { IconPlus } from "justd-icons";

type PatientIndexProps = {
    patiens: Base<Patient[]>;
}

export default function PatientIndex({ patiens }: PatientIndexProps) {

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
                        <Table.Column>Satu Sehat ID</Table.Column>
                        <Table.Column>Nama</Table.Column>
                        <Table.Column>Alamat</Table.Column>
                        <Table.Column>Tanggal Lahir</Table.Column>
                        <Table.Column>ACTION</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            patiens.items.map((patient: Patient) => (
                                <Table.Row key={patient.id}>
                                    <Table.Cell>{patient.nik}</Table.Cell>
                                    <Table.Cell>{patient.satu_sehat_id}</Table.Cell>
                                    <Table.Cell>{patient.name}</Table.Cell>
                                    <Table.Cell>{patient.address}</Table.Cell>
                                    <Table.Cell>{patient.birth_date}</Table.Cell>
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
                            patiens.prev_page &&
                            <Pagination.Item variant="previous" href={route('backoffice.patient.index', { page: patiens.prev_page })} />
                        }
                        {
                            patiens.next_page &&
                            <Pagination.Item variant="next" href={route('backoffice.patient.index', { page: patiens.next_page })} />
                        }
                    </Pagination.List>
                </Pagination>
            </div>
        </div>
    );
}

PatientIndex.layout = (page: any) => <AppLayout children={page} />;