import { Button, Checkbox, Label, Select, Textarea } from "@/components/ui"
import { allergy_type } from "@/utils/constant"
import { fetchSnomed } from "@/utils/select"
import AsyncSelect from "react-select/async"

export const AllergyHistory = () => {

    return (
        <form className="p-4" >
            <div className="col-span-12" >
                <Select
                    label="Jenis Alergi"
                    placeholder="Select Payment Method"
                    onSelectionChange={(val) => {}}
                >
                    <Select.Trigger />
                    <Select.List items={allergy_type}>
                        {
                            allergy_type.map(e => (
                                <Select.Option id={e.id} textValue={e.name}>
                                    {e.name}
                                </Select.Option>
                            ))
                        }
                    </Select.List>
                </Select>
            </div>
            <div className="col-span-12" >
                <Label className="mb-2">Alergen</Label>
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
            <Textarea
                label="Keterangan"
                placeholder="keterangan alergi"
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