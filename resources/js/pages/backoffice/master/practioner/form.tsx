import { FilePicker } from "@/components/file-picker";
import { Button, Card, Label, Select, Textarea, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Practitioner } from "@/types/practioner";
import { gender, practioner_role, religion, specialty } from "@/utils/constant";
import { fetchRegencies } from "@/utils/select";
import { useForm } from "@inertiajs/react";
import { IconCircleQuestionmarkFill } from "justd-icons";
import { useRef } from "react";
import AsyncSelect from "react-select/async";
import { toast } from "sonner";

type PractionerFormProps = {
    practitioner?: Practitioner;
}

export default function PractionerForm({ practitioner }: PractionerFormProps) {

    const { data, setData, post, processing, errors } = useForm<any>(practitioner);
    const strRef = useRef<HTMLInputElement>(null);
    const sipRef = useRef<HTMLInputElement>(null);

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (practitioner) {
            post(route('backoffice.practioner.store', practitioner.id), {
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
            post(route('backoffice.practioner.store'), {
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
                    <h1 className="text-xl font-semibold" >Practioner Form</h1>
                    <p className="text-sm text-gray-500" >Add New practioner</p>
                </div>
                <div>
                    <Button appearance="outline" >
                        <IconCircleQuestionmarkFill />
                    </Button>
                </div>
            </div>
            <form onSubmit={onSubmit} className="grid grid-cols-12 gap-4 mt-4" action="">
                <Card className="col-span-12" >
                    <Card.Header>
                        <Card.Title>Data Diri</Card.Title>
                        <Card.Description>Data Diri Tenaga Kesehatan</Card.Description>
                    </Card.Header>
                    <Card.Content className="grid grid-cols-12 gap-4" >
                        <TextField
                            className="col-span-6"
                            label="NIK"
                            placeholder="Nomor Induk Kependudukan"
                            name="nik"
                            inputMode="numeric"
                            type="text"
                            value={data.nik}
                            autoComplete="one-time-code"
                            onChange={(v) => setData("nik", v)}
                            errorMessage={errors.nik}
                            isRequired
                        />
                        <TextField
                            className="col-span-6"
                            label="NIP"
                            placeholder="Nomor Induk Pegawai"
                            name="nip"
                            inputMode="numeric"
                            type="text"
                            value={data.nip}
                            autoComplete="one-time-code"
                            onChange={(v) => setData("nip", v)}
                            errorMessage={errors.employee_id}
                            isRequired
                        />
                        <TextField
                            className="col-span-6"
                            label="Gelar Depan"
                            placeholder="Gelar Depan"
                            name="prefix"
                            value={data.prefix}
                            autoComplete="one-time-code"
                            onChange={(v) => setData("prefix", v)}
                            errorMessage={errors.prefix}
                        />
                        <TextField
                            className="col-span-6"
                            label="Nama"
                            placeholder="Nama Lengkap"
                            name="name"
                            value={data.name}
                            autoComplete="one-time-code"
                            onChange={(v) => setData("name", v)}
                            errorMessage={errors.name}
                            isRequired
                        />
                        <TextField
                            className="col-span-6"
                            label="Gelar Akhir"
                            placeholder="Gelar Akhir"
                            name="suffix"
                            value={data.suffix}
                            autoComplete="one-time-code"
                            onChange={(v) => setData("suffix", v)}
                            errorMessage={errors.suffix}
                        />
                        <div className="col-span-6" >
                            <Label className="mb-1.5">Tempat Lahir</Label>
                            <AsyncSelect
                                cacheOptions
                                loadOptions={(value) => fetchRegencies({ search: value })}
                                defaultOptions
                                isClearable
                                onChange={(value) => {
                                    setData("birth_place", value?.label);
                                }}
                                placeholder="Search for a regency..."
                            />
                        </div>
                        <TextField
                            className="col-span-6"
                            label="Tanggal Lahir"
                            placeholder="Tanggal Lahir"
                            name="birth_date"
                            value={data.birth_date}
                            type="date"
                            autoComplete="one-time-code"
                            onChange={(v) => setData("birth_date", v)}
                            errorMessage={errors.birth_date}
                            isRequired
                        />
                        <Select
                            className="col-span-6"
                            label="Jenis Kelamin"
                            name="gender"
                            isRequired
                            selectedKey={data.gender}
                            errorMessage={errors.gender}
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
                        <Select
                            className="col-span-6"
                            label="Agama"
                            name="religion"
                            isRequired
                            selectedKey={data.religion}
                            errorMessage={errors.religion}
                            onSelectionChange={(v) => setData("religion", v.toString())}
                        >
                            <Select.Trigger />
                            <Select.List items={religion}>
                                {(item) => (
                                    <Select.Option id={item.id} textValue={item.name}>
                                        {item.name}
                                    </Select.Option>
                                )}
                            </Select.List>
                        </Select>
                        <TextField
                            className="col-span-6"
                            label="Email"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            autoComplete="one-time-code"
                            onChange={(v) => setData("email", v)}
                            errorMessage={errors.email}
                        />
                        <TextField
                            className="col-span-6"
                            label="Phone"
                            placeholder="Phone"
                            name="phone"
                            value={data.phone}
                            autoComplete="one-time-code"
                            onChange={(v) => setData("phone", v)}
                            errorMessage={errors.phone}
                        />
                        <TextField
                            className="col-span-6"
                            label="Alamat"
                            placeholder="Alamat"
                            name="address"
                            value={data.address}
                            autoComplete="one-time-code"
                            onChange={(v) => setData("address", v)}
                            errorMessage={errors.address}
                        />
                    </Card.Content>
                </Card>
                <Card className="col-span-12" >
                    <Card.Header>
                        <Card.Title>Data Administrasi</Card.Title>
                        <Card.Description>Data Administrasi Tenaga Kesehatan</Card.Description>
                    </Card.Header>
                    <Card.Content className="grid grid-cols-12 gap-4" >
                        <Select
                            className="col-span-6"
                            label="Okupansi"
                            name="occupation"
                            isRequired
                            selectedKey={data.occupation}
                            errorMessage={errors.occupation}
                            onSelectionChange={(v) => setData("occupation", v.toString())}
                        >
                            <Select.Trigger />
                            <Select.List items={practioner_role}>
                                {(item) => (
                                    <Select.Option id={item.id} textValue={item.name}>
                                        {item.name}
                                    </Select.Option>
                                )}
                            </Select.List>
                        </Select>
                        <Select
                            className="col-span-6"
                            label="Spesialis"
                            name="specialty"
                            isRequired
                            selectedKey={data.specialty}
                            errorMessage={errors.specialty}
                            onSelectionChange={(v) => setData("specialty", v.toString())}
                        >
                            <Select.Trigger />
                            <Select.List items={specialty}>
                                {(item) => (
                                    <Select.Option id={item.id} textValue={item.name}>
                                        {item.name}
                                    </Select.Option>
                                )}
                            </Select.List>
                        </Select>
                    </Card.Content>
                </Card>
                <div className="col-span-12" >
                    <Button isDisabled={processing} type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

PractionerForm.layout = (page: any) => <AppLayout children={page} />;