import { Button, Select, TextField } from "@/components/ui";
import { gender } from "@/utils/constant";
import { useForm } from "@inertiajs/react";
import { IconCalendar, IconDevicePhone, IconPencilBox, IconPeople } from "justd-icons";

export default function Registration() {

    const { data, post, setData, errors } = useForm<any>();

    const onSubmit = (e: any) => {
        e.preventDefault();
        post(route(''), {
            onSuccess: () => {
                alert("Data berhasil disimpan");
            },
            onError: () => {
                alert("Data gagal disimpan");
            }
        })
    };

    return (
        <div className="h-screen w-full bg-white" >
            <div className="max-w-sm sm:max-w-md mx-auto bg-white h-screen w-full p-6" >
                <p className="text-lg font-semibold" >Form Pendaftaran Pasien Baru</p>
                <p className="text-sm text-gray-500" >Silahkan isi data berikut untuk mendaftarkan diri sebagai pasien baru</p>
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
                        value={data.birthdate}
                        onChange={(v) => setData("birthdate", v)}
                        errorMessage={errors.birthdate}
                    />
                    <TextField
                        label="Nomor Telepon"
                        placeholder="Masukkan nomor telepon aktif"
                        prefix={<IconDevicePhone />}
                        type="tel"
                        value={data.phone}
                        onChange={(v) => setData("phone", v)}
                        errorMessage={errors.phone}
                    />
                    <Button type="submit" >
                        Daftar
                    </Button>
                </form>
            </div>
        </div>
    );
}