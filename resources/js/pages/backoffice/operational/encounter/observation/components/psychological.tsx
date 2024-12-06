import { Button, buttonStyles, Label, Modal } from "@/components/ui"
import { Encounter } from "@/types/encounter";
import { fetchSnomed } from "@/utils/select"
import { useForm } from "@inertiajs/react";
import { IconEye } from "justd-icons";
import { useState } from "react";
import AsyncSelect from "react-select/async"

type PhyschologicalProps = {
    encounter: Encounter
}

type PsychologicalFormSchema = {
    code?: any,
    display?: any,
};

export const Psychological = ({ encounter }: PhyschologicalProps) => {

    const [local, setLocal] = useState<PsychologicalFormSchema>();
    const { data, setData, post } = useForm();

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    }

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold">Psikologis {encounter.patient?.name}</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Practioner : {encounter.practioner?.name}</p>
                </div>
                <div>
                    <Modal>
                        <Modal.Trigger className={buttonStyles({ appearance: "outline" })}>
                            <IconEye className="text-black" />
                        </Modal.Trigger>
                        <Modal.Content size="4xl" >
                            <Modal.Header>
                                <Modal.Title>Riwayat Psikologis {encounter.patient?.name}</Modal.Title>
                                <Modal.Description>
                                    Riwayat Alergi yang terekam oleh sistem
                                </Modal.Description>
                            </Modal.Header>
                            <Modal.Body>
                            </Modal.Body>
                            <Modal.Footer>
                                <Modal.Close appearance="outline">Tutup</Modal.Close>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </div>
            </div>
            <form onSubmit={onSubmit} className="py-2 grid grid-cols-12 gap-4">
                <div className="col-span-12 flex flex-col" >
                    <Label className="mb-1.5">Kondisi Psikologis</Label>
                    <AsyncSelect
                        className="col-span-12 text-black"
                        cacheOptions
                        loadOptions={fetchSnomed}
                        defaultOptions
                        isClearable
                        defaultValue={{ value: local?.code, label: local?.display }}
                        onChange={(value) => {
                            setData({ ...data, code: value?.value, display: value?.label });
                            setLocal({ ...local, code: value?.value, display: value?.label });
                        }}
                        placeholder="Search for by type name"
                    />
                </div>
                <div className="col-span-12" >
                    <Button>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}