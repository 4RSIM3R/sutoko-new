import { Button, buttonStyles, Label, Modal, TextField } from "@/components/ui"
import { Encounter } from "@/types/encounter"
import { fetchSnomed } from "@/utils/select"
import { useForm } from "@inertiajs/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { IconEye } from "justd-icons"
import { useState } from "react"
import AsyncSelect from "react-select/async"
import { toast } from "sonner"

type TTVProps = {
    encounter: Encounter
}

type TTVFormSchema = {
    systolic?: any,
    diastolic?: any,
    body_temperature?: any,
    heart_rate?: any,
    breathing_rate?: any,
    consciousness_code?: any,
    consciousness_display?: any,
    weight?: any,
    height?: any,
};

export const TTV = ({ encounter }: TTVProps) => {

    const [local, setLocal] = useState<TTVFormSchema>();
    const { data, setData, post } = useForm<TTVFormSchema>();

    // const query = useQuery({
    //     queryKey: ["vital-sign", encounter.id],
    //     queryFn: async () => {
    //         const response = await axios.get(route('backoffice.encounter.vital-sign', { id: encounter.id }));
    //         return response;
    //     }
    // });

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        post(route('backoffice.encounter.vital-sign', { id: encounter.id }), {
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
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold">TTV {encounter.patient?.name}</h1>
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
                            </Modal.Body>
                            <Modal.Footer>
                                <Modal.Close appearance="outline">Tutup</Modal.Close>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </div>
            </div>
            <form onSubmit={onSubmit} className="py-2 grid grid-cols-12 gap-4">
                <div className="col-span-6" >
                    <TextField
                        inputMode="numeric"
                        label="Sistolik"
                        placeholder=""
                        name="systolic"
                        value={data.systolic}
                        onChange={(val) => setData('systolic', val)}
                        suffix={
                            <p>mm[Hg]</p>
                        }
                    />
                </div>
                <div className="col-span-6" >
                    <TextField
                        inputMode="numeric"
                        label="Diastolik"
                        placeholder=""
                        name="diastolic"
                        value={data.diastolic}
                        onChange={(val) => setData('diastolic', val)}
                        suffix={
                            <p>mm[Hg]</p>
                        }
                    />
                </div>
                <div className="col-span-6" >
                    <TextField
                        inputMode="numeric"
                        label="Suhu Tubuh"
                        placeholder=""
                        value={data.body_temperature}
                        onChange={(val) => setData('body_temperature', val)}
                        suffix={
                            <p>°C</p>
                        }
                    />
                </div>
                <div className="col-span-6" >
                    <TextField
                        inputMode="numeric"
                        label="Denyut Jantung"
                        placeholder=""
                        value={data.heart_rate}
                        onChange={(val) => setData('heart_rate', val)}
                        suffix={
                            <p>beats/min</p>
                        }
                    />
                </div>
                <div className="col-span-6" >
                    <TextField
                        inputMode="numeric"
                        label="Pernafasan"
                        placeholder=""
                        value={data.breathing_rate}
                        onChange={(val) => setData('breathing_rate', val)}
                        suffix={
                            <p>breaths/min</p>
                        }
                    />
                </div>
                <div className="col-span-6 flex flex-col" >
                    <Label className="mb-1.5">Tingkat Kesadaran</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={fetchSnomed}
                        defaultOptions
                        defaultValue={{ value: local?.consciousness_code, label: local?.consciousness_display }}
                        isClearable
                        onChange={(value) => {
                            setData({ ...data, consciousness_code: value?.value, consciousness_display: value?.label });
                            setLocal({ ...local, consciousness_code: value?.value, consciousness_display: value?.label });
                        }}
                        placeholder="Search for by type name"
                    />
                </div>
                <div className="col-span-6" >
                    <TextField
                        inputMode="numeric"
                        label="Tinggi Badan"
                        placeholder=""
                        value={data.weight}
                        onChange={(val) => setData('weight', val)}
                        suffix={
                            <p>cm</p>
                        }
                    />
                </div>
                <div className="col-span-6" >
                    <TextField
                        inputMode="numeric"
                        label="Berat Badan"
                        placeholder=""
                        value={data.height}
                        onChange={(val) => setData('height', val)}
                        suffix={
                            <p>kg</p>
                        }
                    />
                </div>
                <div className="col-span-12" >
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}