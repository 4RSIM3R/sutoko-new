import { Button, buttonStyles, Label, Modal, Textarea } from "@/components/ui"
import { Encounter } from "@/types/encounter"
import { fetchIcd10, fetchSnomed } from "@/utils/select"
import { IconEye } from "justd-icons"
import AsyncSelect from "react-select/async"

type DiagnoseProps = {
    encounter: Encounter
}

export const Diagnose = ({ encounter }: DiagnoseProps) => {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold">Diagnosa {encounter.patient?.name}</h1>
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
            <form className="py-2 grid grid-cols-12 gap-4">
                <div className="col-span-12 flex flex-col" >
                    <Label className="mb-1.5">Kode ICD 10</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={fetchIcd10}
                        defaultOptions
                        isClearable
                        onChange={(value) => {
                            // setEncounter({ ...encounter, patient_id: value?.value, patient_name: value?.label });
                            // setData({ ...data, patient_id: value?.value });
                        }}
                        placeholder="Search for by type name"
                    />
                </div>
                <div className="col-span-12" >
                    <Textarea
                        label="Keterangan"
                        placeholder="keterangan diagnosa"
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