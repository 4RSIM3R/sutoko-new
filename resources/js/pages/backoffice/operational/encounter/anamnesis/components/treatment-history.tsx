import { Button, Label, Textarea, TextField } from "@/components/ui"
import AsyncSelect from "react-select/async"

export const TreatmentHistory = () => {

    return (
        <form className="py-2 grid grid-cols-12 gap-4">
            <div className="col-span-12" >
                <Label className="mb-2">Obat</Label>
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
            <div className="col-span-6" >
                <TextField
                    label="Dosis / Minum"
                    placeholder="Dosis sekali minum"
                    type="number"
                />
            </div>
            <div className="col-span-6" >
                <TextField
                    label="Dosis / Hari"
                    placeholder="Dosis dalam 1 hari"
                    type="number"
                />
            </div>
            <Textarea
                label="Keterangan"
                placeholder="keterangan riwayat pengobatan"
                className="col-span-12"
            />
            <div className="col-span-12" >
                <Button type="submit" >
                    Submit
                </Button>
            </div>
        </form>
    )

}