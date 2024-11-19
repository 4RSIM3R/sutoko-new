import { Button, Label, Textarea } from "@/components/ui"
import { fetchIcd10, fetchSnomed } from "@/utils/select"
import AsyncSelect from "react-select/async"

export const Diagnose = () => {

    return (
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
    )

}