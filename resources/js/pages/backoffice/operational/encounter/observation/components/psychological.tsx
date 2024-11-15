import { Button, Label } from "@/components/ui"
import { fetchSnomed } from "@/utils/select"
import AsyncSelect from "react-select/async"

export const Psychological = () => {
    return (
        <form className="py-2 grid grid-cols-12 gap-4">
            <div className="col-span-12 flex flex-col" >
                <Label className="mb-1.5">Kondisi Psikologis</Label>
                <AsyncSelect
                    className="col-span-12 text-black"
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
                <Button>
                    Submit
                </Button>
            </div>
        </form>
    )
}