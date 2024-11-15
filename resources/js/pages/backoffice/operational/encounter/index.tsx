import { Button, buttonStyles, Menu, Pagination, Table } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Encounter } from "@/types/encounter";
import { Link } from "@inertiajs/react";
import {
    IconCheck,
    IconGlasses,
    IconPencilBox,
    IconPlus,
    IconSearchSketchbook
} from "justd-icons";

type EncounterIndexProps = {
    encounters: Base<Encounter[]>
}

export default function EncounterIndex({ encounters }: EncounterIndexProps) {

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Encounter</h1>
                    <p className="text-sm text-gray-500" >Manage encounter and medical record</p>
                </div>
                <div className="flex" >
                    
                    <Link href={route('backoffice.encounter.create')}>
                        <Button appearance="outline" >
                            <IconPlus />
                            Add New
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="my-4" >
                <Table className="my-4" >
                    <Table.Header className="w-full" >
                        <Table.Column isRowHeader >Satu Sehat ID</Table.Column>
                        <Table.Column>Pasien</Table.Column>
                        <Table.Column>Dokter</Table.Column>
                        <Table.Column>Ruangan</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>Action</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            encounters.items.map((e: Encounter) => (
                                <Table.Row key={e.id} >
                                    <Table.Cell>{e.satu_sehat_id}</Table.Cell>
                                    <Table.Cell>{e.patient?.name}</Table.Cell>
                                    <Table.Cell>{e.practioner?.name}</Table.Cell>
                                    <Table.Cell>{e.location?.name}</Table.Cell>
                                    <Table.Cell>
                                        <Button className="capitalize" size="extra-small">
                                            {e.status}
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Menu>
                                            <Menu.Trigger className={buttonStyles({ appearance: "outline", size: "extra-small" })}>ACTION</Menu.Trigger>
                                            <Menu.Content placement="bottom" className="sm:min-w-48">
                                                <Menu.Item>
                                                    <Link className="flex flex-row items-center gap-2" href={`${route('backoffice.encounter.anamnesis', { id: e.id })}`}>
                                                        <IconPencilBox />
                                                        Anamnesis
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link className="flex flex-row items-center gap-2" href={`${route('backoffice.encounter.observation', { id: e.id })}`}>
                                                        <IconGlasses />
                                                        Observasi
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link className="flex flex-row items-center gap-2" href={`${route('backoffice.encounter.diagnose', { id: e.id })}`}>
                                                        <IconSearchSketchbook />
                                                        Diagnosis
                                                    </Link>
                                                </Menu.Item>
                                                {/* <Menu.Item>
                                                    <Link className="flex flex-row items-center gap-2" href={`${route('backoffice.encounter.medication', { id: e.id })}`}>
                                                        <IconPlus />
                                                        Resep Obat
                                                    </Link>
                                                </Menu.Item> */}
                                                <Menu.Item>
                                                    <Link className="flex flex-row items-center gap-2 font-medium" href={`${route('backoffice.encounter.anamnesis', { id: e.id })}`}>
                                                        <IconCheck />
                                                        Selesai
                                                    </Link>
                                                </Menu.Item>
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
                            encounters.prev_page &&
                            <Pagination.Item variant="previous" href={route('backoffice.encounter.index', { page: encounters.prev_page })} />
                        }
                        {
                            encounters.next_page &&
                            <Pagination.Item variant="next" href={route('backoffice.encounter.index', { page: encounters.next_page })} />
                        }
                    </Pagination.List>
                </Pagination>
            </div>
        </div>
    )

}

EncounterIndex.layout = (page: any) => <AppLayout children={page} />;