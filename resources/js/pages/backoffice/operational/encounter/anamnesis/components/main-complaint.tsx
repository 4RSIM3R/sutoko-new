import { Button, Checkbox, Label, Textarea } from "@/components/ui"
import { fetchSnomed } from "@/utils/select";
import { useForm } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import AsyncSelect from "react-select/async";
import { toast } from "sonner";

type MainComplaintProps = {
    id: any;
}

type MainComplaintSchema = {
    primary_code: any;
    primary_display: any;
    secondary_code: any;
    secondary_display: any;
    notes: any;
}

export const MainComplaint = ({ id }: MainComplaintProps) => {


    const query = useQuery({
        queryKey: ["anamnesis"],
        queryFn: async () => {
            const response = await axios.get(route('backoffice.encounter.complaint', { id: id }));
            return response;
        }
    });

    const { post, errors, data, setData } = useForm<MainComplaintSchema>();

    useEffect(() => {
        if (query.isSuccess && query.data) {
            setData({
                primary_code: query.data.data.primary_code,
                primary_display: query.data.data.primary_display,
                secondary_code: query.data.data.secondary_code,
                secondary_display: query.data.data.secondary_display,
                notes: query.data.data.notes,
            });
        }
    }, [query.isSuccess, query.data, setData]);

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        // console.log(data);

        post(route('backoffice.encounter.complaint', { id: id }), {
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

    return (
        <div>
            {
                query.isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <form onSubmit={onSubmit} className="py-2 grid grid-cols-12 gap-4">
                        <div className="col-span-12 flex flex-col" >
                            <Label className="mb-2">Keluhan Utama</Label>
                            <AsyncSelect
                                className="col-span-6 text-black"
                                cacheOptions
                                loadOptions={fetchSnomed}
                                defaultOptions
                                value={{ value: data?.primary_code, label: data?.primary_display }}
                                isClearable
                                onChange={(value) => {
                                    setData({ ...data, primary_code: value?.value, primary_display: value?.label });
                                }}
                                placeholder="Search for by type name"
                            />
                        </div>
                        <div className="col-span-12 flex flex-col" >
                            <Label className="mb-2">Keluhan Penyerta</Label>
                            <AsyncSelect
                                className="col-span-6 text-black"
                                cacheOptions
                                loadOptions={fetchSnomed}
                                defaultOptions
                                value={{ value: data?.secondary_code, label: data?.secondary_display }}
                                isClearable
                                onChange={(value) => {
                                    setData({ ...data, secondary_code: value?.value, secondary_display: value?.label });
                                }}
                                placeholder="Search for by type name"
                            />
                        </div>
                        <Textarea
                            label="Keterangan"
                            value={data.notes}
                            placeholder="keterangan keluhan pasien selain di masukkan anamnesis di masukkan juga di 06. riwayat perjalan penyakit"
                            className="col-span-12"
                            errorMessage={errors.notes}
                            onChange={(value) => {
                                setData({ ...data, notes: value })
                            }}
                        />
                        <div className="col-span-12" >
                            {
                                !query.data?.data.primary_code && <Button type="submit" >
                                    Submit
                                </Button>
                            }
                        </div>
                    </form>
                )
            }
        </div>
    )

}