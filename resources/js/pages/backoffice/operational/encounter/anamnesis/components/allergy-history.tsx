import { Button, Checkbox, Label, Select, Textarea } from "@/components/ui"
import { Encounter } from "@/types/encounter"
import { allergy_type } from "@/utils/constant"
import { fetchSnomed } from "@/utils/select"
import { useForm } from "@inertiajs/react"
import AsyncSelect from "react-select/async"

type AllergyHistoryProps = {
    encounter: Encounter
}

type AllergyHistorySchema = {
    type: string
    code: string
    display: string
    notes: string
}

export const AllergyHistory = ({ encounter }: AllergyHistoryProps) => {

    const { data, setData, post } = useForm<AllergyHistorySchema>();

    return (
        <div>
            <form className="py-2 grid grid-cols-12 gap-4">
                <div className="col-span-12" >
                    <Select
                        label="Jenis Alergi"
                        placeholder="Pilih Jenis Alergi"
                        onSelectionChange={(val) => { }}
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
                <div className="col-span-12 flex flex-col" >
                    <Label className="mb-1.5">Alergen</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={fetchSnomed}
                        defaultOptions
                        isClearable
                        onChange={(value) => { }}
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
        </div>
    )
}