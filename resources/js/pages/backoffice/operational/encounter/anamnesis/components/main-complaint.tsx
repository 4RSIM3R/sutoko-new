import { Button, Checkbox, Label, Textarea, TextField } from "@/components/ui"
import { Encounter } from "@/types/encounter";
import { fetchSnomed } from "@/utils/select";
import { useForm } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { toast } from "sonner";

type MainComplaintProps = {
    encounter: Encounter;
}

type MainComplaintSchema = {
    primary_code: any;
    primary_display: any;
    secondary_code: any;
    secondary_display: any;
    notes: any;
}

export const MainComplaint = ({ encounter }: MainComplaintProps) => {

    const [local, setLocal] = useState<MainComplaintSchema>({
        primary_code: null,
        primary_display: null,
        secondary_code: null,
        secondary_display: null,
        notes: null,
    });

    const query = useQuery({
        queryKey: ["main-complaint", encounter.id],
        queryFn: async () => {
            const response = await axios.get(route('backoffice.encounter.complaint', { id: encounter.id }));
            return response;
        }
    });

    const { post, errors, data, setData } = useForm<MainComplaintSchema>();

    useEffect(() => {
        if (query.isSuccess && query.data) {

            const response = query.data.data;

            setData({
                primary_code: response.primary_code,
                primary_display: response.primary_display,
                secondary_code: response.secondary_code,
                secondary_display: response.secondary_display,
                notes: response.notes,
            });

            setLocal({
                primary_code: response.primary_code,
                primary_display: response.primary_display,
                secondary_code: response.secondary_code,
                secondary_display: response.secondary_display,
                notes: response.notes,
            });
        }
    }, [query.isSuccess, query.data]);

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        post(route('backoffice.encounter.complaint', { id: encounter.id }), {
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
                    <>
                        <div className="flex flex-row justify-between" >
                            <div className="" >
                                <h1 className="text-xl font-semibold">Keluhan {encounter.patient?.name}</h1>
                                <p className="text-sm text-gray-500 mt-0.5">Practioner : {encounter.practioner?.name}</p>
                            </div>
                        </div>
                        <form onSubmit={onSubmit} className="mt-4 grid grid-cols-12 gap-4">
                            <div className="col-span-12 flex flex-col" >
                                <Label className="mb-1.5">Keluhan Utama</Label>
                                <AsyncSelect
                                    className="col-span-6 text-black"
                                    cacheOptions
                                    loadOptions={fetchSnomed}
                                    defaultOptions
                                    value={{ value: local?.primary_code, label: local?.primary_display }}
                                    isClearable
                                    onChange={(value) => {
                                        setData({ ...data, primary_code: value?.value, primary_display: value?.label });
                                        setLocal({ ...local, primary_code: value?.value, primary_display: value?.label });
                                    }}
                                    placeholder="Search for by type name"
                                />
                            </div>
                            <div className="col-span-12 flex flex-col" >
                                <Label className="mb-1.5">Keluhan Penyerta</Label>
                                <AsyncSelect
                                    className="col-span-6 text-black"
                                    cacheOptions
                                    loadOptions={fetchSnomed}
                                    defaultOptions
                                    value={{ value: local?.secondary_code, label: local?.secondary_display }}
                                    isClearable
                                    onChange={(value) => {
                                        setData({ ...data, secondary_code: value?.value, secondary_display: value?.label });
                                        setLocal({ ...local, secondary_code: value?.value, secondary_display: value?.label });
                                    }}
                                    placeholder="Search for by type name"
                                />
                            </div>
                            <Textarea
                                label="Keterangan"
                                value={local.notes}
                                placeholder="keterangan keluhan pasien selain di masukkan anamnesis di masukkan juga di 06. riwayat perjalan penyakit"
                                className="col-span-12"
                                errorMessage={errors.notes}
                                onChange={(value) => {
                                    setData({ ...data, notes: value })
                                    setLocal({ ...local, notes: value })
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
                    </>
                )
            }
        </div>
    )

}