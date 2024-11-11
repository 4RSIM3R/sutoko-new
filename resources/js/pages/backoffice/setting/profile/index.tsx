import { ComboQuery } from "@/components/combo-query";
import { Button, Textarea, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Region } from "@/types/region";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React from "react";
import { toast } from "sonner";


type ProfileFormSchema = {
    name: string;
    kode_faskes: string;
    email: string;
    phone_number: string;
    address: string;
    province: any;
    regency: any;
    district: any;
    village: any;
};

type ProfileSettingProps = {
    profile?: ProfileFormSchema | null;
}

export default function ProfileSetting({ profile }: ProfileSettingProps) {

    const [region, setRegion] = React.useState<{
        province: any;
        regency: any;
        district: any;
        village: any;
    }>({
        province: profile?.province,
        regency: profile?.regency,
        district: profile?.district,
        village: profile?.village,
    });



    const { data, setData, post, processing } = useForm<ProfileFormSchema>({
        name: profile?.name ?? "",
        kode_faskes: profile?.kode_faskes ?? "",
        email: profile?.email ?? "",
        phone_number: profile?.phone_number ?? "",
        address: profile?.address ?? "",
        province: profile?.province,
        regency: profile?.regency,
        district: profile?.district,
        village: profile?.village,
    } satisfies ProfileFormSchema);

    const fetchProvinces = async () => {
        const response = await axios.get(route('backoffice.region.province'));
        return response.data;
    };

    const fetchRegencies = async (provinceId: any) => {
        if (!provinceId) return [];
        const response = await axios.get(route("backoffice.region.regency"), {
            params: { province_id: provinceId },
        });
        return response.data;
    };

    const fetchDistricts = async (regencyId: any) => {
        if (!regencyId) return [];
        const response = await axios.get(route("backoffice.region.district"), {
            params: { regency_id: regencyId },
        });
        return response.data;
    };

    const fetchVillages = async (districtId: any) => {
        if (!districtId) return [];
        const response = await axios.get(route("backoffice.region.village"), {
            params: { district_id: districtId },
        });
        return response.data;
    };

    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        post(route('backoffice.setting.profile.update'), {
            onSuccess: (_) => {
                toast.success('Data berhasil disimpan');
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
            </div>
            <form onSubmit={onSubmit} className="mt-4 grid grid-cols-12 gap-4">
                <TextField
                    className="col-span-6"
                    name="name"
                    placeholder="Nama Klinik"
                    label="Nama"
                    value={data.name}
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
                    autoFocus
                    onChange={(v) => setData("address", v)}
                    isRequired
                />
                <ComboQuery<Region>
                    className="col-span-6"
                    label="Provinsi"
                    placeholder="Pilih Provinsi"
                    selectedValue={data.province ?? region.province}
                    onChange={(value) => {
                        setRegion((data) => ({
                            ...data,
                            province: value,
                            regency: null,
                            district: null,
                            village: null,
                        }));

                        setData((data) => ({
                            ...data,
                            province: value,
                            regency: null,
                            district: null,
                            village: null,
                        }));
                    }}
                    fetchFunction={fetchProvinces}
                    queryKey={["province"]}
                    enabled={true}
                    disabled={false}
                    getItemLabel={(item) => item.nama_wilayah!}
                    getItemKey={(item) => item.id!}
                />
                <ComboQuery<Region>
                    label="Kabupaten"
                    className="col-span-6"
                    placeholder="Pilih Kabupaten"
                    selectedValue={data.regency ?? region.regency}
                    onChange={(value) => {
                        setRegion((data) => ({
                            ...data,
                            regency: value,
                            district: null,
                            village: null,
                        }))

                        setData((data) => ({
                            ...data,
                            regency: value,
                            district: null,
                            village: null,
                        }))

                    }}
                    fetchFunction={() => fetchRegencies(region.province)}
                    queryKey={["regencies", region.province]}
                    enabled={!!region.province}
                    disabled={!region.province}
                    getItemLabel={(item) => item.nama_wilayah!}
                    getItemKey={(item) => item.id!}
                />
                <ComboQuery<Region>
                    label="Kecamatan"
                    className="col-span-6"
                    placeholder="Pilih Kecamatan"
                    selectedValue={data.district ?? region.district}
                    onChange={(value) => {
                        setRegion((data) => ({
                            ...data,
                            district: value,
                            village: null,
                        }))

                        setData((data) => ({
                            ...data,
                            district: value,
                            village: null,
                        }))
                    }}
                    fetchFunction={() => fetchDistricts(region.regency)}
                    queryKey={["districts", region.regency]}
                    enabled={!!region.regency}
                    disabled={!region.regency}
                    getItemLabel={(item) => item.nama_wilayah!}
                    getItemKey={(item) => item.id!}
                />
                <ComboQuery<Region>
                    label="Desa"
                    className="col-span-6"
                    placeholder="Pilih Desa"
                    selectedValue={data.village ?? region.village}
                    onChange={(value) => {
                        setRegion((prev) => ({
                            ...prev,
                            village: value,
                        }))

                        setData((prev) => ({
                            ...prev,
                            village: value,
                        }))
                    }}
                    fetchFunction={() => fetchVillages(region.district)}
                    queryKey={["villages", region.district]}
                    enabled={!!region.district}
                    disabled={!region.district}
                    getItemLabel={(item) => item.nama_wilayah!}
                    getItemKey={(item) => item.id!}
                />
                <div>
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );

}

ProfileSetting.layout = (page: any) => <AppLayout children={page} />;