import { Button, Select, TextField } from "@/components/ui";
import { gender } from "@/utils/constant";
import { IconCalendar, IconDevicePhone, IconPencilBox, IconPeople } from "justd-icons";

export default function Registration() {
    return (
        <div className="h-screen w-full bg-white" >
            <div className="max-w-sm sm:max-w-md mx-auto bg-white h-screen w-full p-6" >
                <p className="text-lg font-semibold" >Form Pendaftaran Pasien Baru</p>
                <p className="text-sm text-gray-500" >Silahkan isi data berikut untuk mendaftarkan diri sebagai pasien baru</p>
                <form className="mt-4 flex flex-col gap-4" >
                    <TextField
                        label="NIK"
                        placeholder="Masukkan nomor induk kependudukan"
                        maxLength={16}
                        minLength={16}
                        prefix={<IconPencilBox />}
                    />
                    <TextField
                        label="Nama Lengkap"
                        placeholder="Masukkan nama lengkap tanpa gelar"
                        prefix={<IconPeople />}
                    />
                    <Select
                        className="col-span-6"
                        label="Jenis Kelamin"
                        name="gender"
                        isRequired
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
                    />
                    <TextField
                        label="Nomor Telepon"
                        placeholder="Masukkan nomor telepon aktif"
                        prefix={<IconDevicePhone />}
                        type="tel"
                    />
                    <Button>
                        Daftar
                    </Button>
                </form>
            </div>
        </div>
    );
}