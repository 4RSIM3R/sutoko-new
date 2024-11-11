import { ComboQuery } from "@/components/combo-query";
import { ComboBox, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Region } from "@/types/region";
import axios from "axios";
import React from "react";




export default function ProfileSetting() {

    const [region, setRegion] = React.useState<{
        province: any;
        regency: any;
        district: any;
        village: any;
    }>({
        province: null,
        regency: null,
        district: null,
        village: null,
    });

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


    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Medicine</h1>
                    <p className="text-sm text-gray-500" >Manage all medicines</p>
                </div>
            </div>
            <form className="mt-4 grid grid-cols-12 gap-4">
                <TextField className="col-span-6" name="name" placeholder="Nama Klinik" label="Nama" />
                <TextField className="col-span-6" name="kode_faskes" placeholder="Kode Faskes Klinik" label="Kode Faskes" />
                <TextField className="col-span-6" name="email" placeholder="Email Klinik" label="Email" />
                <TextField className="col-span-6" name="phone_number" placeholder="Nomor HP Klinik" label="Nomor HP" />
                <ComboQuery<Region>
                    className="col-span-6"
                    label="Provinsi"
                    placeholder="Pilih Provinsi"
                    selectedValue={region.province}
                    onChange={(value) =>
                        setRegion({
                            province: value,
                            regency: null,
                            district: null,
                            village: null,
                        })
                    }
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
                    selectedValue={region.regency}
                    onChange={(value) =>
                        setRegion((prev) => ({
                            ...prev,
                            regency: value,
                            district: null,
                            village: null,
                        }))
                    }
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
                    selectedValue={region.district}
                    onChange={(value) =>
                        setRegion((prev) => ({
                            ...prev,
                            district: value,
                            village: null,
                        }))
                    }
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
                    selectedValue={region.village}
                    onChange={(value) =>
                        setRegion((prev) => ({
                            ...prev,
                            village: value,
                        }))
                    }
                    fetchFunction={() => fetchVillages(region.district)}
                    queryKey={["villages", region.district]}
                    enabled={!!region.district}
                    disabled={!region.district}
                    getItemLabel={(item) => item.nama_wilayah!}
                    getItemKey={(item) => item.id!}
                />
            </form>
        </div>
    );

}

ProfileSetting.layout = (page: any) => <AppLayout children={page} />;