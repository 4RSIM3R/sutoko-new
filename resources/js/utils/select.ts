import axios from "axios";

export type SelectOption = {
    value: string;
    label: string;
};

export const fetchProvinces = async (search: string): Promise<SelectOption[]> => {
    const response = await axios.get(route('backoffice.region.province'), {
        params: {
            name: search,
        },
    });

    return response.data.map((e: any) => ({
        value: e.kode_wilayah,
        label: e.nama_wilayah,
    }));
};

export const fetchRegencies = async (province_id: any, search: string): Promise<SelectOption[]> => {
    if (!province_id) return [];
    const response = await axios.get(route("backoffice.region.regency"), {
        params: { province_id: province_id, name: search, },
    });

    return response.data.map((e: any) => ({
        value: e.kode_wilayah,
        label: e.nama_wilayah,
    }));

};

export const fetchDistricts = async (regenct_id: any, search: string): Promise<SelectOption[]> => {
    if (!regenct_id) return [];

    const response = await axios.get(route("backoffice.region.district"), {
        params: { regency_id: regenct_id, name: search },
    });

    return response.data.map((e: any) => ({
        value: e.kode_wilayah,
        label: e.nama_wilayah,
    }));

};

export const fetchVillages = async (district_id: any, search: string): Promise<SelectOption[]> => {
    if (!district_id) return [];
    const response = await axios.get(route("backoffice.region.village"), {
        params: { district_id: district_id, name: search },
    });

    return response.data.map((e: any) => ({
        value: e.kode_wilayah,
        label: e.nama_wilayah,
    }));

};

export const fetchPractioner = async (search: any): Promise<SelectOption[]> => {
    const response = await axios.get(route("backoffice.practioner.fetch"), {
        params: { name: search },
    });

    return response.data.map((e: any) => ({
        value: e.id,
        label: `${e.name} - ${e.nik}`,
    }));
};

export const fetchPatient = async (search: any): Promise<SelectOption[]> => {
    const response = await axios.get(route("backoffice.patient.fetch"), {
        params: { name: search },
    });

    return response.data.map((e: any) => ({
        value: e.id,
        label: `${e.name} - ${e.nik}`,
    }));
};

export const fetchLocation = async (search: any): Promise<SelectOption[]> => {

    const response = await axios.get(route("backoffice.location.fetch"), {
        params: { name: search },
    });

    return response.data.map((e: any) => ({
        value: e.id,
        label: e.name,
    }));
};

export const fetchPaymentAssurance = async (search: any): Promise<SelectOption[]> => {
    const response = await axios.get(route("backoffice.payment-assurance.fetch"), {
        params: { name: search },
    });

    return response.data.map((e: any) => ({
        value: e.id,
        label: e.name,
    }));
};