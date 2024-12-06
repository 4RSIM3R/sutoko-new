import { Button, buttonStyles, Label, Modal } from "@/components/ui"
import { Encounter } from "@/types/encounter"
import { fetchSnomed } from "@/utils/select"
import { IconEye } from "justd-icons"
import AsyncSelect from "react-select/async"

type NutritionProps = {
    encounter: Encounter
}

export const Nutrition = ({ encounter }: NutritionProps) => {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold">Pantangan / Anjuran {encounter.patient?.name}</h1>
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
                    <Label className="mb-1.5">Pantangan / Anjuran Tidak Konsumsi</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={fetchSnomed}
                        defaultOptions
                        // defaultValue={{ value: encounter?.patient_id, label: encounter?.patient_name }}
                        isClearable
                        onChange={(value) => {
                            // setEncounter({ ...encounter, patient_id: value?.value, patient_name: value?.label });
                            // setData({ ...data, patient_id: value?.value });
                        }}
                        placeholder="Search for by type name"
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