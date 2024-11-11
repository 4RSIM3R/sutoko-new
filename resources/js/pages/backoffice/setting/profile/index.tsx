import { ComboBox, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Region } from "@/types/region";
import React from "react";

export default function ProfileSetting() {

    const [provinces, setProvinces] = React.useState<Region[]>([]);
    const [kabupaten, setKabupaten] = React.useState<Region[]>([]);

    // create a dependent dropdown, use tanstack query, make it efficient, if possible, create as component
    // first it will fetch on route backoffice.region.province
    // when province selected, it will fetch kabupaten on route backoffice.region.regency params province_id
    // when kabupaten selected, it will fetch desa/kelurahan on route backoffice.region.district params regency_id
    // when desa/kelurahan selected, it will fetch desa/kelurahan on route backoffice.region.village params district_id


    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Medicine</h1>
                    <p className="text-sm text-gray-500" >Manage all medicines</p>
                </div>
            </div>
            <form className="mt-4 flex flex-col gap-4">
                <TextField placeholder="Nama Klinik" label="Name" />
                <ComboBox placeholder="Pilih Provinsi" label="Provinsi">
                    <ComboBox.Input />
                    <ComboBox.List items={provinces}>
                        {(item) => (
                            <ComboBox.Option id={item.id} textValue={item.nama_wilayah}>
                                {item.nama_wilayah}
                            </ComboBox.Option>
                        )}
                    </ComboBox.List>
                </ComboBox>
               
            </form>
        </div>
    );

}

ProfileSetting.layout = (page: any) => <AppLayout children={page} />;