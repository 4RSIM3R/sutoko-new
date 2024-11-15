import { Button, Select, Textarea } from "@/components/ui"
import { loinc_htt } from "@/utils/constant/loinc"

export const HTT = () => {
    return (
        <form className="py-2 grid grid-cols-12 gap-4">
            <div className="col-span-12" >
                <Select
                    className="col-span-12"
                    label="Narrative"
                    placeholder="Select narrative"
                    onSelectionChange={(val) => { }}
                >
                    <Select.Trigger />
                    <Select.List items={loinc_htt}>
                        {
                            loinc_htt.map(e => (
                                <Select.Option id={e.code} textValue={e.name}>
                                    {e.name}
                                </Select.Option>
                            ))
                        }
                    </Select.List>
                </Select>
            </div>
            <div className="col-span-12" >
                <Textarea
                    label="Keterangan"
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