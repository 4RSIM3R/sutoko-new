import { Button, Label, Textarea } from "@/components/ui"
import { fetchSnomed } from "@/utils/select";
import AsyncSelect from "react-select/async";

export const MainComplaint = () => {

    return (
        <form className="py-4 grid grid-cols-12 gap-4">
            <div className="col-span-12" >
                <Label className="mb-2">Keluhan Utama</Label>
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
                    placeholder="Search for a patient..."
                />
            </div>
            <div className="col-span-12" >
                <Label className="mb-2">Keluhan Penyerta</Label>
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
                    placeholder="Search for a patient..."
                />
            </div>
            <Textarea
                label="Keterangan"
                placeholder="keterangan keluhan utama pasien"
                className="col-span-12"
            />
            <div className="col-span-6" >
                <Button type="submit" >
                    Submit
                </Button>
            </div>
        </form>
    )

}