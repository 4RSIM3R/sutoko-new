import { Button, buttonStyles, Checkbox, Label, Modal, Table, Textarea, TextField } from "@/components/ui"
import { Encounter } from "@/types/encounter";
import { fetchSnomed } from "@/utils/select"
import { useForm } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IconCircleQuestionmarkFill, IconEye } from "justd-icons";
import { useState } from "react";
import AsyncSelect from "react-select/async"
import { toast } from "sonner";

type MedicalHistoryProps = {
    encounter: Encounter;
}

type MedicalHistorySchema = {
    code?: any;
    display?: any;
    active?: boolean;
    onset_start?: any;
    onset_end?: any;
    notes?: any;
}

export const MedicalHistory = ({ encounter }: MedicalHistoryProps) => {

    const [local, setLocal] = useState<MedicalHistorySchema>();
    const { setData, post, data } = useForm<MedicalHistorySchema>();

    const query = useQuery({
        queryKey: ["medical-history", encounter.id],
        queryFn: async () => {
            const response = await axios.get(route('backoffice.encounter.medical-history', { id: encounter.id }));
            return response;
        }
    });

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        post(route('backoffice.encounter.medical-history', { id: encounter.id }), {
            onSuccess: (_) => {
                toast("Data berhasil disimpan", {
                    description: "Data berhasil disimpan",
                    important: true,
                });
            },
            onError: (error) => {
                toast("Whoopsss....", {
                    description: JSON.stringify(error),
                    important: true,
                });
            }
        });
    }

    return (
        <div className="w-full flex flex-col gap-4" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold">Riwayat Penyakit {encounter.patient?.name}</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Practioner : {encounter.practioner?.name}</p>
                </div>
                <div>
                    <Modal>
                        <Modal.Trigger className={buttonStyles({ appearance: "outline" })}>
                            <IconEye className="text-black" />
                        </Modal.Trigger>
                        <Modal.Content size="4xl" >
                            <Modal.Header>
                                <Modal.Title>Riwayat Penyakit {encounter.patient?.name}</Modal.Title>
                                <Modal.Description>
                                    Riwayat penyakit yang terekam oleh sistem
                                </Modal.Description>
                            </Modal.Header>
                            <Modal.Body>
                                <Table className="my-4" >
                                    <Table.Header className="w-full" >
                                        <Table.Column isRowHeader >Tanggal Rekam</Table.Column>
                                        <Table.Column>Code</Table.Column>
                                        <Table.Column>Display</Table.Column>
                                        <Table.Column>Onset</Table.Column>
                                        <Table.Column>Notes</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            query.data?.data.map((e: any) => (
                                                <Table.Row key={e.id} >
                                                    <Table.Cell>{e.created_at}</Table.Cell>
                                                    <Table.Cell>{e.code}</Table.Cell>
                                                    <Table.Cell>{e.display}</Table.Cell>
                                                    <Table.Cell>{e.onset_start} - {e.onset_end}</Table.Cell>
                                                    <Table.Cell>{e.notes}</Table.Cell>
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Modal.Close appearance="outline">Tutup</Modal.Close>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </div>
            </div>
            <form onSubmit={onSubmit} className="mt-4 grid grid-cols-12 gap-4">
                <div className="col-span-12 flex flex-col" >
                    <Label className="mb-1.5">Penyakit</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={fetchSnomed}
                        defaultOptions
                        value={{ value: local?.code, label: local?.display }}
                        isClearable
                        onChange={(value) => {
                            setData({ ...data, code: value?.value, display: value?.label });
                            setLocal({ ...local, code: value?.value, display: value?.label });
                        }}
                        placeholder="Search for by type name"
                    />
                </div>
                <div className="col-span-6 flex flex-col" >
                    <TextField
                        label="Onset Start"
                        placeholder="terjadi sejak penyakit tersebut?"
                        type="date"
                        value={local?.onset_start}
                        onChange={(value) => {
                            setData({ ...data, onset_start: value })
                            setLocal({ ...local, onset_start: value })
                        }}
                    />
                </div>
                <div className="col-span-6 flex flex-col" >
                    <TextField
                        label="Onset End"
                        placeholder="tanggal terakhir penyakit?"
                        type="date"
                        value={local?.onset_end}
                        onChange={(value) => {
                            setData({ ...data, onset_end: value })
                            setLocal({ ...local, onset_end: value })
                        }}
                    />
                </div>
                <Textarea
                    label="Keterangan"
                    placeholder="keterangan riwayat penyakit"
                    className="col-span-12"
                    value={local?.notes}
                    onChange={(value) => {
                        setData({ ...data, notes: value })
                        setLocal({ ...local, notes: value })
                    }}
                />
                <div className="col-span-12" >
                    <Checkbox
                        isSelected={local?.active}
                        onChange={(val) => {
                            setData({ ...data, active: val })
                            setLocal({ ...local, active: val })
                        }}
                    >
                        Masih mengidap penyakit tersebut?
                    </Checkbox>
                </div>
                <div className="col-span-6" >
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )

}