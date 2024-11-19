import { Button, buttonStyles, Checkbox, Label, Modal, Select, Table, Textarea } from "@/components/ui"
import { Encounter } from "@/types/encounter"
import { allergy_type } from "@/utils/constant"
import { fetchSnomed } from "@/utils/select"
import { useForm } from "@inertiajs/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { IconEye } from "justd-icons"
import { useState } from "react"
import AsyncSelect from "react-select/async"
import { toast } from "sonner"

type AllergyHistoryProps = {
    encounter: Encounter
}

type AllergyHistorySchema = {
    type?: string
    code?: string
    display?: string
    notes?: string
}

export const AllergyHistory = ({ encounter }: AllergyHistoryProps) => {

    const [local, setLocal] = useState<AllergyHistorySchema>();
    const { data, setData, post } = useForm<AllergyHistorySchema>();

    const query = useQuery({
        queryKey: ["allergy-history", encounter.id],
        queryFn: async () => {
            const response = await axios.get(route('backoffice.encounter.allergy-history', { id: encounter.id }));
            return response;
        }
    });

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        post(route('backoffice.encounter.allergy-history', { id: encounter.id }), {
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
                    <h1 className="text-xl font-semibold">Riwayat Alergi {encounter.patient?.name}</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Practioner : {encounter.practioner?.name}</p>
                </div>
                <div>
                    <Modal>
                        <Modal.Trigger className={buttonStyles({ appearance: "outline" })}>
                            <IconEye className="text-black" />
                        </Modal.Trigger>
                        <Modal.Content size="4xl" >
                            <Modal.Header>
                                <Modal.Title>Riwayat Alergi {encounter.patient?.name}</Modal.Title>
                                <Modal.Description>
                                    Riwayat Alergi yang terekam oleh sistem
                                </Modal.Description>
                            </Modal.Header>
                            <Modal.Body>
                                <Table className="my-4" >
                                    <Table.Header className="w-full" >
                                        <Table.Column isRowHeader >Tanggal Rekam</Table.Column>
                                        <Table.Column>Jenis</Table.Column>
                                        <Table.Column>Code</Table.Column>
                                        <Table.Column>Display</Table.Column>
                                        <Table.Column>Notes</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            query.data?.data.map((e: any) => (
                                                <Table.Row key={e.id} >
                                                    <Table.Cell>{e.created_at}</Table.Cell>
                                                    <Table.Cell>{e.type}</Table.Cell>
                                                    <Table.Cell>{e.code}</Table.Cell>
                                                    <Table.Cell>{e.display}</Table.Cell>
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
            <form onSubmit={onSubmit} className="grid grid-cols-12 gap-4">
                <div className="col-span-12" >
                    <Select
                        label="Jenis Alergi"
                        placeholder="Pilih Jenis Alergi"
                        selectedKey={local?.type}
                        onSelectionChange={(val) => {
                            setData('type', val.toString())
                            setLocal({ ...local, type: val.toString() })
                        }}
                    >
                        <Select.Trigger />
                        <Select.List items={allergy_type}>
                            {
                                allergy_type.map(e => (
                                    <Select.Option id={e.id} textValue={e.name}>
                                        {e.name}
                                    </Select.Option>
                                ))
                            }
                        </Select.List>
                    </Select>
                </div>
                <div className="col-span-12 flex flex-col" >
                    <Label className="mb-1.5">Alergen</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={fetchSnomed}
                        defaultOptions
                        isClearable
                        value={{ value: local?.code, label: local?.display }}
                        onChange={(value) => {
                            setData({ ...data, code: value?.value, display: value?.label })
                            setLocal({ ...local, code: value?.value, display: value?.label })
                        }}
                        placeholder="Search for by type name"
                    />
                </div>
                <Textarea
                    label="Keterangan"
                    placeholder="keterangan alergi"
                    className="col-span-12"
                    value={local?.notes}
                    onChange={(value) => {
                        setData({ ...data, notes: value })
                        setLocal({ ...local, notes: value })
                    }}
                />
                <div className="col-span-6" >
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}