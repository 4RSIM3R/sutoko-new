import { Button, Label, TextField } from "@/components/ui"
import { fetchSnomed } from "@/utils/select"
import AsyncSelect from "react-select/async"

export const TTV = () => {
    return (
        <form className="py-2 grid grid-cols-12 gap-4">
            <div className="col-span-6" >
                <TextField
                    label="Sistolik"
                    placeholder=""
                    suffix={
                        <p>mm[Hg]</p>
                    }
                />
            </div>
            <div className="col-span-6" >
                <TextField
                    label="Diastolik"
                    placeholder=""
                    suffix={
                        <p>mm[Hg]</p>
                    }
                />
            </div>
            <div className="col-span-6" >
                <TextField
                    label="Suhu Tubuh"
                    placeholder=""
                    suffix={
                        <p>Cel</p>
                    }
                />
            </div>
            <div className="col-span-6" >
                <TextField
                    label="Denyut Jantung"
                    placeholder=""
                    suffix={
                        <p>beats/min</p>
                    }
                />
            </div>
            <div className="col-span-6" >
                <TextField
                    label="Pernafasan"
                    placeholder=""
                    suffix={
                        <p>breaths/min</p>
                    }
                />
            </div>
            <div className="col-span-6 flex flex-col" >
                <Label className="mb-1.5">Tingkat Kesadaran</Label>
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
            <div className="col-span-6" >
                <TextField
                    label="Tinggi Badan"
                    placeholder=""
                    suffix={
                        <p>cm</p>
                    }
                />
            </div>
            <div className="col-span-6" >
                <TextField
                    label="Berat Badan"
                    placeholder=""
                    suffix={
                        <p>kg</p>
                    }
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