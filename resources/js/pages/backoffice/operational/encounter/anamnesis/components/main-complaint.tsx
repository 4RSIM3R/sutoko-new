import { Button, Checkbox, Label, Textarea } from "@/components/ui"
import { fetchSnomed } from "@/utils/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AsyncSelect from "react-select/async";

type MainComplaintProps = {
    id: any;
}

export const MainComplaint = ({ id }: MainComplaintProps) => {

    const query = useQuery({
        queryKey: ["anamnesis"],
        queryFn: async () => {
            const response = await axios.get(route('backoffice.encounter.anamnesis', { id: id }));
            return response;
        }
    });

    return (
        <div>
            {
                query.isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <form className="py-2 grid grid-cols-12 gap-4">
                        <div className="col-span-12 flex flex-col" >
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
                            placeholder="keterangan keluhan pasien selain di masukkan anamnesis di masukkan juga di 06. riwayat perjalan penyakit"
                            className="col-span-12"
                        />
                        <div className="col-span-12" >
                            <Button type="submit" >
                                Submit
                            </Button>
                        </div>
                    </form>
                )
            }
        </div>
    )

}