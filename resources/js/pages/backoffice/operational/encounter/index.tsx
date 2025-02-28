import { Column, DataTable } from "@/components/data-table";
import { Button, buttonStyles, Menu, Modal } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Encounter } from "@/types/encounter";
import { Link } from "@inertiajs/react";
import axios from "axios";
import {
    IconCheck,
    IconEye,
    IconGlasses,
    IconPencilBox,
    IconPlus,
    IconSearchSketchbook
} from "justd-icons";
import { useState } from "react";

type EncounterIndexProps = {
    encounters: Base<Encounter[]>
}

export default function EncounterIndex({ encounters }: EncounterIndexProps) {

    const [filters, setFilters] = useState<Record<string, any>>({});

    const columns: Column<any>[] = [
        {
            id: 'id',
            header: 'ID',
            cell: (item) => item.satu_sehat_id,
            isRowHeader: true,
        },
        {
            id: 'patient',
            header: 'Patient',
            cell: (item) => item.patient.name,
        },
        {
            id: 'practioner',
            header: 'Practioner',
            cell: (item) => item.practioner.name,
        },
        {
            id: 'location',
            header: 'Location',
            cell: (item) => item.location.name,
        },
        {
            id: 'bills',
            header: 'Bills',
            cell: (item) => (
                <Modal>
                    <Button size="extra-small" appearance="outline">
                        <IconEye />
                        Detail
                    </Button>
                    <Modal.Content>
                        <Modal.Header>
                            <Modal.Title>Detail</Modal.Title>
                            <Modal.Description>
                                Detail
                            </Modal.Description>
                        </Modal.Header>
                        <Modal.Body className="px-4 pb-4" >
                            {
                                item.bills.map((e: any) => (
                                    <div key={e.id} className="flex flex-row justify-between" >
                                        <div className="flex flex-col gap-1" >
                                            <div className="text-sm font-medium">{e.type}</div>
                                            <div className="text-xs text-gray-500">{e.desc}</div>
                                        </div>
                                        <div className="text-sm font-medium">{e.amount}</div>
                                    </div>
                                ))
                            }
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (item) => (
                <Menu>
                    <Menu.Trigger className={buttonStyles({ appearance: "outline", size: "extra-small" })}>ACTION</Menu.Trigger>
                    <Menu.Content placement="bottom" className="sm:min-w-48">
                        <Menu.Item>
                            <Link className="flex flex-row items-center gap-2" href={`${route('backoffice.encounter.anamnesis', { id: item.id })}`}>
                                <IconPencilBox />
                                Anamnesis
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link className="flex flex-row items-center gap-2" href={`${route('backoffice.encounter.observation', { id: item.id })}`}>
                                <IconGlasses />
                                Observasi
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link className="flex flex-row items-center gap-2" href={`${route('backoffice.encounter.diagnose', { id: item.id })}`}>
                                <IconSearchSketchbook />
                                Diagnosis
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link className="flex flex-row items-center gap-2 font-medium" href="">
                                <IconCheck />
                                Selesai
                            </Link>
                        </Menu.Item>
                    </Menu.Content>
                </Menu>
            ),
            sortable: false
        }
    ];

    const fetchData = async (params: Record<string, any>) => {
        const response = await axios.get<Base<any[]>>(
            route('backoffice.encounter.fetch', params)
        );

        return response.data;
    }

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
                <DataTable
                    columns={columns}
                    fetchData={fetchData}
                    filters={filters ?? {}}
                />
            </div>
        </div>
    )

}

EncounterIndex.layout = (page: any) => <AppLayout children={page} />;