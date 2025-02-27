import { Button, Select, TextField } from "@/components/ui";
import { gender } from "@/utils/constant";
import { FormResponse } from "@/utils/constant/system";
import { useForm } from "@inertiajs/react";
import { IconCalendar, IconDevicePhone, IconPencilBox, IconPeople } from "justd-icons";
import { toast, Toaster } from "sonner";

export default function Registration() {

    const { data, post, setData, errors } = useForm<any>();

    const onSubmit = (e: any) => {
        e.preventDefault();
        post(route('registration'), FormResponse);
    };

    return (
        <div className="h-screen w-full bg-white" >
            <Toaster />
            <div className="max-w-sm sm:max-w-md mx-auto bg-white h-screen w-full p-6" >
                <p className="text-lg font-semibold" >Form Pendaftaran Pasien Baru</p>
                <p className="text-sm text-gray-500" >
                    Silahkan isi data berikut untuk mendaftarkan diri sebagai pasien baru, selanjutnya anda dapat mendaftarkan kunjungan di 
                    link berikut: <a href={route('appointment')} className="text-blue-500">Daftar Kunjungan</a>
                </p>
                <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4" >
                    <TextField
                        label="NIK"
                        placeholder="Masukkan nomor induk kependudukan"
                        maxLength={16}
                        minLength={16}
                        value={data.nik}
                        onChange={(v) => setData("nik", v)}
                        errorMessage={errors.nik}
                        prefix={<IconPencilBox />}
                    />
                    <TextField
                        label="Nama Lengkap"
                        placeholder="Masukkan nama lengkap tanpa gelar"
                        prefix={<IconPeople />}
                        value={data.name}
                        onChange={(v) => setData("name", v)}
                        errorMessage={errors.name}
                    />
                    <Select
                        className="col-span-6"
                        label="Jenis Kelamin"
                        name="gender"
                        isRequired
                        selectedKey={data.gender}
                        onSelectionChange={(v) => setData("gender", v.toString())}
                    >
                        <Select.Trigger />
                        <Select.List items={gender}>
                            {(item) => (
                                <Select.Option id={item.id} textValue={item.name}>
                                    {item.name}
                                </Select.Option>
                            )}
                        </Select.List>
                    </Select>
                    <TextField
                        label="Tanggal Lahir"
                        placeholder="Masukkan tanggal lahir"
                        prefix={<IconCalendar />}
                        type="date"
                        value={data.birth_date}
                        onChange={(v) => setData("birth_date", v)}
                        errorMessage={errors.birth_date}
                    />
                    <TextField
                        label="Nomor Telepon"
                        placeholder="Masukkan nomor telepon aktif"
                        prefix={<IconDevicePhone />}
                        type="tel"
                        value={data.phone_number}
                        onChange={(v) => setData("phone_number", v)}
                        errorMessage={errors.phone_number}
                    />
                    <Button type="submit" >
                        Daftar Pasien Baru
                    </Button>
                </form>
            </div>
        </div>
    );
}