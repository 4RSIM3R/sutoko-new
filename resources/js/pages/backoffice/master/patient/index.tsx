import { BaseAction } from "@/components/base-action";
import { Column, DataTable } from "@/components/data-table";
import { Breadcrumbs, Button, buttonStyles, Menu, Modal, Pagination, Table, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Patient } from "@/types/patient";
import { FormResponse } from "@/utils/constant/system";
import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { IconFilter, IconPlus } from "justd-icons";
import { useState } from "react";

type PatientIndexProps = {
    patiens: Base<Patient[]>;
}

export default function PatientIndex({ patiens }: PatientIndexProps) {

    const [filters, setFilters] = useState();
    const [id, setId] = useState<any>();
    const { delete: destroy } = useForm();

    const onDelete = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        destroy(route('backoffice.patient.destroy', id), FormResponse);
    };

    const columns: Column<any>[] = [
        {
            id: 'satu_sehat_id',
            header: 'Satu Sehat ID',
            cell: (item) => item.satu_sehat_id,
            isRowHeader: true,
        },
        {
            id: 'nik',
            header: 'NIK',
            cell: (item) => item.nik,
        },
        {
            id: 'name',
            header: 'Name',
            cell: (item) => item.name,
        },
        {
            id: 'gender',
            header: 'Gender',
            cell: (item) => item.gender,
        },
        {
            id: 'phone_number',
            header: 'Phone Number',
            cell: (item) => item.phone_number,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (item) => (
                <BaseAction url="backoffice.patient.show" id={item.id} setId={setId} onDelete={onDelete} />
            ),
            sortable: false
        }
    ];


    const fetchData = async (params: Record<string, any>) => {
        const response = await axios.get<Base<any[]>>(
            route('backoffice.patient.fetch', params)
        );
        return response.data;
    };

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Patients</h1>
                    <p className="text-sm text-gray-500" >Manage all patients</p>
                </div>
                <div className="flex flex-row gap-2" >
                    <Modal>
                        <Button appearance="outline" >
                            <IconFilter />
                            Filter
                        </Button>
                        <Modal.Content>
                            <Modal.Header>
                                <Modal.Title>Filter Patient</Modal.Title>
                                <Modal.Description>You can filter patient by name, nik, etc..</Modal.Description>
                            </Modal.Header>

                            <div className="px-4 grid grid-cols-12 gap-4 mb-3" >
                                <TextField
                                    className="col-span-12"
                                    label="Name"
                                />
                                <div className="col-span-12" >
                                    <Button>
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Modal.Content>
                    </Modal>
                    <Link href={route('backoffice.patient.create')}>
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
    );
}

PatientIndex.layout = (page: any) => <AppLayout children={page} />;