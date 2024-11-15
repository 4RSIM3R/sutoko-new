import { Button, Select, Textarea, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Practitioner } from "@/types/practioner";
import { gender, practioner_role } from "@/utils/constant";
import { useForm } from "@inertiajs/react";
import { IconCircleQuestionmarkFill } from "justd-icons";
import { toast } from "sonner";

type PractionerFormProps = {
    practitioner?: Practitioner;
}

export default function PractionerForm({ practitioner }: PractionerFormProps) {

    const { data, setData, post, processing, errors, reset } = useForm<Practitioner>(practitioner);

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
                    <p className="text-sm text-gray-500" >Add new practioner</p>
                </div>
                <div>
                    <Button appearance="outline" >
                        <IconCircleQuestionmarkFill />
                    </Button>
                </div>
            </div>
            <form onSubmit={onSubmit} className="grid grid-cols-12 gap-4 mt-4" action="">
                <TextField
                    minLength={16}
                    maxLength={16}
                    className="col-span-6"
                    label="NIK"
                    placeholder="Nomor Induk Kependudukan"
                    name="nik"
                    inputMode="numeric"
                    type="text"
                    value={data.nik}
                    autoComplete="off"
                    autoFocus
                    onChange={(v) => setData("nik", v)}
                    errorMessage={errors.nik}
                    isRequired
                />
                <TextField
                    className="col-span-6"
                    label="Nama"
                    placeholder="Nama Lengkap"
                    name="name"
                    value={data.name}
                    autoComplete="off"
                    autoFocus
                    onChange={(v) => setData("name", v)}
                    errorMessage={errors.name}
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
                    label="Role"
                    name="role"
                    isRequired
                    selectedKey={data.role}
                    errorMessage={errors.role}
                    onSelectionChange={(v) => setData("role", v.toString())}
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
                <TextField
                    className="col-span-6"
                    type="date"
                    label="Tanggal Lahir"
                    placeholder="Tanggal Lahir"
                    name="birth_date"
                    value={data.birth_date}
                    autoComplete="off"
                    autoFocus
                    onChange={(v) => setData("birth_date", v.toString())}
                    errorMessage={errors.birth_date}
                    isRequired
                />
                <TextField
                    className="col-span-6"
                    label="Nomor Telepon"
                    placeholder="Nomor Telepon"
                    name="phone_number"
                    type="tel"
                    value={data.phone_number}
                    autoComplete="off"
                    onChange={(v) => setData("phone_number", v)}
                    errorMessage={errors.phone_number}
                    isRequired
                />
                <Textarea
                    className="col-span-12"
                    label="Alamat"
                    placeholder="Alamat"
                    name="address"
                    value={data.address}
                    autoComplete="off"
                    onChange={(v) => setData("address", v)}
                    errorMessage={errors.address}
                    isRequired
                />
                <div className="col-span-12" >
                    <Button isDisabled={processing} type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}

PractionerForm.layout = (page: any) => <AppLayout children={page} />;