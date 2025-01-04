import { Button, Select, Textarea, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Location } from "@/types/location";
import { location_type } from "@/utils/constant";
import { useForm } from "@inertiajs/react";
import { IconCircleQuestionmarkFill } from "justd-icons";
import { toast } from "sonner";

type LocationFormProps = {
    location?: Location;
}

export default function LocationForm({ location }: LocationFormProps) {

    const { data, errors, processing, setData, post, put } = useForm<Location>(location);

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (location) {
            put(route('backoffice.location.store'), {
                onSuccess: (_) => {
                    toast("Data berhasil disimpan", {
                        description: "Data berhasil disimpan",
                        important: true,
                    });
                },
                onError: (error) => {
                    toast("Whoopsss....", {
                        description: JSON.stringify(error),
                        important: true,
                    });
                }
            });
        } else {
            post(route('backoffice.location.store'), {
                onSuccess: (_) => {
                    toast("Data berhasil disimpan", {
                        description: "Data berhasil disimpan",
                        important: true,
                    });
                },
                onError: (error) => {
                    toast("Whoopsss....", {
                        description: JSON.stringify(error),
                        important: true,
                    });
                }
            });
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
                    className="col-span-12"
                    label="Name"
                    placeholder="Location Name"
                    name="name"
                    value={data.name}
                    autoComplete="off"
                    
                    onChange={(v) => setData("name", v)}
                    errorMessage={errors.name}
                    isRequired
                />
                <Select
                    onSelectionChange={(v) => setData("physical_type_code", v.toString())}
                    className="col-span-12"
                    label="Type"
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
                <Textarea
                    className="col-span-12"
                    label="Description"
                    placeholder="Location description"
                    name="address"
                    value={data.description}
                    autoComplete="off"
                    onChange={(v) => setData("description", v)}
                    errorMessage={errors.description}
                    isRequired
                />
                <div>
                    <Button type="submit" isDisabled={processing}>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )

}

LocationForm.layout = (page: any) => <AppLayout children={page} />;