import { Breadcrumbs, Button, buttonStyles, Menu, Modal, Pagination, Table } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Patient } from "@/types/patient";
import { Link } from "@inertiajs/react";
import { IconFilter, IconPlus } from "justd-icons";

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
                            <Modal.Body>
                                <p>Hello</p>
                                <div>
                                    <Button>
                                        Submit
                                    </Button>
                                </div>
                            </Modal.Body>
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
            <div>

            </div>
        </div>
    );
}

PatientIndex.layout = (page: any) => <AppLayout children={page} />;