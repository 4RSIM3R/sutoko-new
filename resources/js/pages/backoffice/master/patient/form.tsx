import { Button, Select, Textarea, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Patient } from "@/types/patient";
import { blood_group, education, gender, marital_status, occupation, religion } from "@/utils/constant";
import { FormResponse } from "@/utils/constant/system";
import { useForm } from "@inertiajs/react";
import { IconCircleQuestionmarkFill } from "justd-icons";

type PatientFormProps = {
    patient?: Patient;
}

export default function PatientForm({ patient }: PatientFormProps) {

    const { data, setData, post, processing, errors } = useForm<Patient>(patient);

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (patient) {
            post(route('backoffice.patient.store', patient), FormResponse);
        } else {
            post(route('backoffice.patient.store'), FormResponse);
        }

    };

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Patient Form</h1>
                    <p className="text-sm text-gray-500" >Add new patient</p>
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
                <TextField
                    className="col-span-6"
                    type="date"
                    label="Tanggal Lahir"
                    placeholder="Tanggal Lahir"
                    name="birth_date"
                    value={data.birth_date}
                    autoComplete="off"

                    onChange={(v) => setData("birth_date", v.toString())}
                    errorMessage={errors.birth_date}
                    isRequired
                />
                <Select
                    className="col-span-6"
                    label="Agama"
                    name="religion"
                    isRequired
                    selectedKey={data.religion}
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
                <Select
                    className="col-span-6"
                    label="Golongan Darah"
                    name="blood_group"
                    isRequired
                    selectedKey={data.blood_group}
                    errorMessage={errors.blood_group}
                    onSelectionChange={(v) => setData("blood_group", v.toString())}
                >
                    <Select.Trigger />
                    <Select.List items={blood_group}>
                        {(item) => (
                            <Select.Option id={item.id} textValue={item.name}>
                                {item.name}
                            </Select.Option>
                        )}
                    </Select.List>
                </Select>
                <Select
                    className="col-span-6"
                    label="Status Pernikahan"
                    name="marital_status"
                    isRequired
                    selectedKey={data.marital_status}
                    errorMessage={errors.marital_status}
                    onSelectionChange={(v) => setData("marital_status", v.toString())}
                >
                    <Select.Trigger />
                    <Select.List items={marital_status}>
                        {(item) => (
                            <Select.Option id={item.id} textValue={item.name}>
                                {item.name}
                            </Select.Option>
                        )}
                    </Select.List>
                </Select>
                <Select
                    className="col-span-6"
                    label="Pendidikan"
                    name="education"
                    isRequired
                    selectedKey={data.education}
                    errorMessage={errors.education}
                    onSelectionChange={(v) => setData("education", v.toString())}
                >
                    <Select.Trigger />
                    <Select.List items={education}>
                        {(item) => (
                            <Select.Option id={item.id} textValue={item.name}>
                                {item.name}
                            </Select.Option>
                        )}
                    </Select.List>
                </Select>
                <Select
                    className="col-span-6"
                    label="Pekerjaan"
                    name="occupation"
                    isRequired
                    selectedKey={data.occupation}
                    errorMessage={errors.occupation}
                    onSelectionChange={(v) => setData("occupation", v.toString())}
                >
                    <Select.Trigger />
                    <Select.List items={occupation}>
                        {(item) => (
                            <Select.Option id={item.id} textValue={item.name}>
                                {item.name}
                            </Select.Option>
                        )}
                    </Select.List>
                </Select>
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

PatientForm.layout = (page: any) => <AppLayout children={page} />;