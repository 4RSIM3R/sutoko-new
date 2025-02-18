import { ComboQuery } from "@/components/combo-query";
import { Button, Label, Textarea, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Profile } from "@/types/profile";
import { fetchDistricts, fetchProvinces, fetchRegencies, fetchVillages } from "@/utils/select";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { IconTrash } from "justd-icons";
import React from "react";
import AsyncSelect from "react-select/async";
import { toast } from "sonner";

type ProfileSettingProps = {
    profile?: Profile;
}

type Region = {
    province_id?: any;
    province_name?: any;
    city_id?: any;
    city_name?: any;
    district_id?: any;
    district_name?: any;
    village_id?: any;
    village_name?: any;
}

export default function ProfileSetting({ profile }: ProfileSettingProps) {

    const [region, setRegion] = React.useState<Region>({
        province_id: profile?.province_id,
        province_name: profile?.province_name,
        city_id: profile?.city_id,
        city_name: profile?.city_name,
        district_id: profile?.district_id,
        district_name: profile?.district_name,
        village_id: profile?.village_id,
        village_name: profile?.village_name,
    });


    const { data, setData, post, processing } = useForm<Profile>({
        name: profile?.name ?? "",
        kode_faskes: profile?.kode_faskes ?? "",
        email: profile?.email ?? "",
        phone_number: profile?.phone_number ?? "",
        address: profile?.address ?? "",
        province_id: profile?.province_id,
        city_id: profile?.city_id,
        district_id: profile?.district_id,
        village_id: profile?.village_id,
    });

    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        data['province_id'] = region.province_id;
        data['province_name'] = region.province_name;
        data['city_id'] = region.city_id;
        data['city_name'] = region.city_name;
        data['district_id'] = region.district_id;
        data['district_name'] = region.district_name;
        data['village_id'] = region.village_id;
        data['village_name'] = region.village_name;

        post(route('backoffice.setting.profile.update'), {
            onSuccess: (_) => {
                toast.success('Data berhasil disimpan', {
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
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Profile</h1>
                    <p className="text-sm text-gray-500" >Clinic profile form</p>
                </div>
                <div>
                    <Button intent="danger" size="small">
                        <IconTrash className="fill-white" />
                        Reset Profile
                    </Button>
                </div>
            </div>
            <form onSubmit={onSubmit} className="mt-4 grid grid-cols-12 gap-4">
                <TextField
                    className="col-span-6"
                    name="name"
                    placeholder="Nama Klinik"
                    label="Nama"
                    value={data?.name}
                    onChange={(e) => setData("name", e)}
                />
                <TextField
                    className="col-span-6"
                    name="kode_faskes"
                    placeholder="Kode Faskes Klinik"
                    label="Kode Faskes"
                    value={data.kode_faskes}
                    onChange={(e) => setData("kode_faskes", e)}
                />
                <TextField
                    className="col-span-6"
                    name="email"
                    placeholder="Email Klinik"
                    label="Email"
                    value={data.email}
                    onChange={(e) => setData("email", e)}
                />
                <TextField
                    className="col-span-6"
                    name="phone_number"
                    placeholder="Nomor HP Klinik"
                    label="Nomor HP"
                    value={data.phone_number}
                    onChange={(e) => setData("phone_number", e)}
                />
                <Textarea
                    className="col-span-12"
                    label="Alamat"
                    placeholder="Alamat"
                    name="address"
                    value={data.address}
                    autoComplete="off"
                    onChange={(v) => setData("address", v)}
                    isRequired
                />
                <div className="col-span-6" >
                    <Label className="mb-1.5">Provinsi</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={(val) => fetchProvinces(val)}
                        defaultOptions
                        defaultValue={{ value: region?.province_id, label: region?.province_name }}
                        isClearable
                        onChange={(value) => {
                            setRegion((data) => ({
                                province_id: value?.value,
                                province_name: value?.label,
                                city_id: null,
                                district_id: null,
                                village_id: null
                            }))
                        }}
                        placeholder="Search for a province..."
                    />
                </div>
                <div className="col-span-6" >
                    <Label className="mb-1.5">Kabupaten / Kota</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        isDisabled={!region.province_id}
                        defaultValue={{ value: region?.city_id, label: region?.city_name }}
                        loadOptions={(value) => fetchRegencies({ parent_id: region.province_id, search: value })}
                        defaultOptions
                        isClearable
                        onChange={(value) => {
                            setRegion((data) => ({
                                ...data,
                                city_id: value?.value,
                                city_name: value?.label,
                                district_id: null,
                                village_id: null
                            }))
                        }}
                        placeholder="Search for a regency..."
                    />
                </div>
                <div className="col-span-6" >
                    <Label className="mb-1.5">Kecamatan</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        isDisabled={!region.city_id}
                        defaultValue={{ value: region?.district_id, label: region?.district_name }}
                        loadOptions={(value) => fetchDistricts({ parent_id: region.city_id, search: value })}
                        defaultOptions
                        isClearable
                        onChange={(value) => {
                            setRegion((data) => ({
                                ...data,
                                district_id: value?.value,
                                district_name: value?.label,
                                village_id: null
                            }))
                        }}
                        placeholder="Search for a district..."
                    />
                </div>
                <div className="col-span-6" >
                    <Label className="mb-1.5">Desa / Kelurahan</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        isDisabled={!region.district_id}
                        defaultValue={{ value: region?.village_id, label: region?.village_name }}
                        loadOptions={(value) => fetchVillages({ parent_id: region.district_id, search: value })}
                        defaultOptions
                        isClearable
                        onChange={(value) => {
                            setRegion((data) => ({
                                ...data,
                                village_id: value?.value,
                                village_name: value?.label
                            }))
                        }}
                        placeholder="Search for a village..."
                    />
                </div>
                <div className="col-span-6" >
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );

}

ProfileSetting.layout = (page: any) => <AppLayout children={page} />;