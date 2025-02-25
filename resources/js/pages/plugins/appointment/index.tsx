import { CustomSelect } from "@/components/custom-select";
import { Button, Textarea, TextField } from "@/components/ui";

export default function AppointmentIndex() {

    return (
        <div className="h-screen w-full bg-white" >
            <div className="max-w-sm sm:max-w-md mx-auto bg-white h-screen w-full p-6" >
                <p className="text-lg font-semibold" >Form Pendaftaran Kunjungan</p>
                <p className="text-sm text-gray-500" >
                    Silahkan isi data berikut untuk mendaftar kunjungan, jika nik belum terdaftar <a className="text-blue-500" href="">klik disini</a>
                </p>
                <form className="mt-4 flex flex-col gap-4" >
                    <CustomSelect
                        className="col-span-6"
                        label="Poli"
                        name="patient_id"
                        placeholder="Select Poli"
                        defaultValue={null}
                        onChange={(value) => { }}
                        loadOptions={async () => {
                            return [];
                        }}
                        isRequired
                    />
                    <CustomSelect
                        className="col-span-6"
                        label="Doctor"
                        name="patient_id"
                        placeholder="Select Doctor"
                        defaultValue={null}
                        onChange={(value) => { }}
                        loadOptions={async () => {
                            return [];
                        }}
                        isRequired
                    />
                    <TextField
                        label="NIK"
                    />
                    <TextField
                        label="Tanggal Kunjungan"
                        type="date"
                    />
                    <TextField
                        label="Jam Kunjungan"
                        type="time"
                    />
                    <Textarea
                        label="Catatan / Keluhan"
                    />
                    <Button type="submit" >
                        Daftar
                    </Button>
                </form>
            </div>
        </div>
    )

}