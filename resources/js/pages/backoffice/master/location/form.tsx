import { Button, Select, Textarea, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Location } from "@/types/location";
import { encounter_type, location_type } from "@/utils/constant";
import { FormResponse } from "@/utils/constant/system";
import { useForm } from "@inertiajs/react";
import { IconCircleQuestionmarkFill } from "justd-icons";
import { toast } from "sonner";

type LocationFormProps = {
    location?: Location;
}

export default function LocationForm({ location }: LocationFormProps) {

    const { data, errors, processing, setData, post, put } = useForm<any>(location);

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (location) {
            put(route('backoffice.location.store'), FormResponse);
        } else {
            post(route('backoffice.location.store'), FormResponse);
        }
    };

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Location Form</h1>
                    <p className="text-sm text-gray-500" >Add New Location</p>
                </div>
                <div>
                    <Button appearance="outline" >
                        <IconCircleQuestionmarkFill />
                    </Button>
                </div>
            </div>
            <form onSubmit={onSubmit} className="grid grid-cols-12 gap-4 mt-4" >
                <TextField
                    className="col-span-6"
                    label="Name"
                    placeholder="Location Name"
                    name="name"
                    value={data.name}
                    autoComplete="off"
                    onChange={(v) => setData("name", v)}
                    errorMessage={errors.name}
                    isRequired
                />
                <TextField
                    className="col-span-6"
                    label="Capacity / Day"
                    placeholder="Appointment Capacity"
                    name="capacity"
                    value={data.capacity}
                    autoComplete="off"
                    onChange={(v) => setData("capacity", v)}
                    errorMessage={errors.capacity}
                    isRequired
                />
                <TextField
                    className="col-span-6"
                    label="Fee"
                    placeholder="Administration Fee"
                    name="administration_fee"
                    value={data.administration_fee}
                    autoComplete="off"
                    onChange={(v) => setData("administration_fee", v)}
                    errorMessage={errors.administration_fee}
                    isRequired
                />
                <Select
                    onSelectionChange={(v) => setData("physical_type_code", v.toString())}
                    className="col-span-6"
                    label="Location Type"
                    placeholder="Select location type"
                >
                    <Select.Trigger />
                    <Select.List items={location_type}>
                        {
                            location_type.map(e => (
                                <Select.Option id={e.type} textValue={e.name}>
                                    {e.name}
                                </Select.Option>
                            ))
                        }
                    </Select.List>
                </Select>
                <Select
                    onSelectionChange={(v) => setData("encounter_type", v.toString())}
                    className="col-span-6"
                    label="Encounter Type"
                    placeholder="Select encounter type"
                >
                    <Select.Trigger />
                    <Select.List items={encounter_type}>
                        {
                            encounter_type.map(e => (
                                <Select.Option id={e.id} textValue={e.name}>
                                    {e.name}
                                </Select.Option>
                            ))
                        }
                    </Select.List>
                </Select>
                <div className="col-span-12" > 
                    <Button type="submit" isDisabled={processing}>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )

}

LocationForm.layout = (page: any) => <AppLayout children={page} />;