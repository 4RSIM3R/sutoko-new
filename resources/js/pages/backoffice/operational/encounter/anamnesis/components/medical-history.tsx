import { Button, Checkbox, Label, Table, Textarea, TextField } from "@/components/ui"
import { Encounter } from "@/types/encounter";
import { fetchSnomed } from "@/utils/select"
import { IconCircleQuestionmarkFill, IconEye } from "justd-icons";
import AsyncSelect from "react-select/async"

type MedicalHistoryProps = {
    encounter: Encounter;
}

export const MedicalHistory = ({ encounter }: MedicalHistoryProps) => {

    return (
        <div className="w-full flex flex-col gap-4" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold">Riwayat Penyakit {encounter.patient?.name}</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Practioner : {encounter.practioner?.name}</p>
                </div>
                <div>
                    <Button appearance="outline" className="text-black" >
                        <IconEye className="text-black" />
                    </Button>
                </div>
            </div>
            <form className="grid grid-cols-12 gap-4">
                <div className="col-span-12 flex flex-col" >
                    <Label className="mb-1.5">Penyakit</Label>
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
                <div className="col-span-6 flex flex-col" >
                    <TextField
                        label="Onset Start"
                        placeholder="terjadi sejak penyakit tersebut?"
                        type="date"
                    />
                </div>
                <div className="col-span-6 flex flex-col" >
                    <TextField
                        label="Onset End"
                        placeholder="tanggal terakhir penyakit?"
                        type="date"
                    />
                </div>
                <Textarea
                    label="Keterangan"
                    placeholder="keterangan riwayat penyakit"
                    className="col-span-12"
                />
                <div className="col-span-12" >
                    <Checkbox
                        onChange={(val) => { }}
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