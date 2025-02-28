import { Button, buttonStyles, Checkbox, Label, Modal, Select, Table, Textarea } from "@/components/ui"
import { Encounter } from "@/types/encounter";
import { family_member } from "@/utils/constant/hl7";
import { FormResponse } from "@/utils/constant/system";
import { fetchSnomed } from "@/utils/select"
import { useForm } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IconEye } from "justd-icons";
import { useState } from "react";
import AsyncSelect from "react-select/async"
import { toast } from "sonner";

type FamilyHistoryProps = {
    encounter: Encounter
}

type FamilyHistorySchema = {
    relation_code?: any;
    relation_display?: any;
    disease_code?: any;
    disease_display?: any;
    outcome_code?: any;
    outcome_display?: any;
    contributed_to_death?: boolean;
    notes?: any;
}

export const FamilyHistory = ({ encounter }: FamilyHistoryProps) => {

    const [local, setLocal] = useState<FamilyHistorySchema>();

    const { setData, post, data } = useForm<FamilyHistorySchema>({
        contributed_to_death: false,
    } satisfies FamilyHistorySchema);

    const query = useQuery({
        queryKey: ["family-history", encounter.id],
        queryFn: async () => {
            const response = await axios.get(route('backoffice.encounter.family-history', { id: encounter.id }));
            return response;
        }
    });

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        post(route('backoffice.encounter.family-history', { id: encounter.id }), FormResponse);
    }

    return (
        <div className="w-full flex flex-col gap-4" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold">Riwayat Penyakit Keluarga {encounter.patient?.name}</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Practioner : {encounter.practioner?.name}</p>
                </div>
                <div>
                    <Modal>
                        <Modal.Trigger className={buttonStyles({ appearance: "outline" })}>
                            <IconEye className="text-black" />
                        </Modal.Trigger>
                        <Modal.Content size="4xl" >
                            <Modal.Header>
                                <Modal.Title>Riwayat Penyakit Keluarga {encounter.patient?.name}</Modal.Title>
                                <Modal.Description>
                                    Riwayat penyakit keluarga yang terekam oleh sistem
                                </Modal.Description>
                            </Modal.Header>
                            <Modal.Body>
                                <Table className="my-4" >
                                    <Table.Header className="w-full" >
                                        <Table.Column isRowHeader >Tanggal Rekam</Table.Column>
                                        <Table.Column>Relation</Table.Column>
                                        <Table.Column>Code</Table.Column>
                                        <Table.Column>Display</Table.Column>
                                        <Table.Column>Notes</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            query.data?.data.map((e: any) => (
                                                <Table.Row key={e.id} >
                                                    <Table.Cell>{e.created_at}</Table.Cell>
                                                    <Table.Cell>{e.relation_code}</Table.Cell>
                                                    <Table.Cell>{e.disease_code}</Table.Cell>
                                                    <Table.Cell>{e.disease_display}</Table.Cell>
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
                <div className="col-span-12 flex flex-col" >
                    <Label className="mb-1.5">Penyakit</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={fetchSnomed}
                        defaultOptions
                        isClearable
                        value={{ value: local?.disease_code, label: local?.disease_display }}
                        onChange={(value) => {
                            setData({ ...data, disease_code: value?.value, disease_display: value?.label });
                            setLocal({ ...local, disease_code: value?.value, disease_display: value?.label });
                        }}
                        placeholder="Search for by type name"
                    />
                </div>
                <div className="col-span-12 flex flex-col" >
                    <Label className="mb-1.5">Outcome</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={fetchSnomed}
                        defaultOptions
                        isClearable
                        value={{ value: local?.outcome_code, label: local?.outcome_display }}
                        onChange={(value) => {
                            setData({ ...data, outcome_code: value?.value, outcome_display: value?.label });
                            setLocal({ ...local, outcome_code: value?.value, outcome_display: value?.label });
                        }}
                        placeholder="Search for by type name"
                    />
                </div>
                <Select
                    className="col-span-12"
                    label="Hubungan"
                    placeholder="Pilih Hubungan Keluarga"
                    selectedKey={local?.relation_code}
                    onSelectionChange={(val) => {
                        setData({ ...data, relation_code: val, relation_display: family_member.find(e => e.id === val)?.name });
                        setLocal({ ...local, relation_code: val, relation_display: family_member.find(e => e.id === val)?.name });
                    }}
                >
                    <Select.Trigger />
                    <Select.List items={family_member}>
                        {
                            family_member.map(e => (
                                <Select.Option id={e.id} textValue={e.name}>
                                    {e.name}
                                </Select.Option>
                            ))
                        }
                    </Select.List>
                </Select>
                <Textarea
                    label="Keterangan"
                    placeholder="keterangan riwayat penyakit keluarga"
                    className="col-span-12"
                    onChange={(value) => {
                        setData({ ...data, notes: value })
                        setLocal({ ...local, notes: value })
                    }}
                />
                <div className="col-span-12" >
                    <Checkbox
                        isSelected={local?.contributed_to_death}
                        onChange={(val) => {
                            setData({ ...data, contributed_to_death: val })
                            setLocal({ ...local, contributed_to_death: val })
                        }}
                    >
                        Berkontribusi pada kematian?
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