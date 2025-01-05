import axios from "axios";

export type SelectOption = {
    value: string;
    label: string;
};

type FetchParams = {
    parent_id?: any;
    search?: any;
};

export const fetchProvinces = async ({ search }: FetchParams): Promise<SelectOption[]> => {
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

export const fetchRegencies = async ({ parent_id, search }: FetchParams): Promise<SelectOption[]> => {

    const response = await axios.get(route("backoffice.region.regency"), {
        params: { province_id: parent_id, name: search, },
    });

    return response.data.map((e: any) => ({
        value: e.kode_wilayah,
        label: e.nama_wilayah,
    }));

};

export const fetchDistricts = async ({ parent_id, search }: FetchParams): Promise<SelectOption[]> => {

    const response = await axios.get(route("backoffice.region.district"), {
        params: { regency_id: parent_id, name: search },
    });

    return response.data.map((e: any) => ({
        value: e.kode_wilayah,
        label: e.nama_wilayah,
    }));

};

export const fetchVillages = async ({ parent_id, search }: FetchParams): Promise<SelectOption[]> => {
    const response = await axios.get(route("backoffice.region.village"), {
        params: { district_id: parent_id, name: search },
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

export const fetchIcd10 = async (search: any): Promise<SelectOption[]> => {
    const response = await axios.get(route("backoffice.encounter.icd_10"), {
        params: { name: search },
    });

    return response.data.map((e: any) => ({
        value: e.id,
        label: `${e.code} - ${e.english}`,
    }));
};

export const fetchIcd9 = async (search: any): Promise<SelectOption[]> => {
    const response = await axios.get(route("backoffice.encounter.icd_9"), {
        params: { name: search },
    });

    return response.data.map((e: any) => ({
        value: e.id,
        label: `${e.code} - ${e.english}`,
    }));
};

export const fetchSnomed = async (search: any): Promise<SelectOption[]> => {
    const response = await axios.get('https://browser.ihtsdotools.org/snowstorm/snomed-ct/MAIN/2023-09-01/concepts', {
        params: {
            term: search,
            activeFilter: true,
            offset: 0,
            limit: 10,
        },
    });

    return response.data.items.map((e: any) => ({
        value: e.id,
        label: `${e.pt.term}`,
    }));
};

export const fetchKfa = async (search: any): Promise<SelectOption[]> => {
    const response = await axios.get('https://api-satusehat.kemkes.go.id/fhir-r4/v1/kfa-v2/products/all', {
        params: {
            page: 1,
            size: 50,
            product_type: 'farmasi',
            keyword: search,
        },
    });

    return response.data.items.map((e: any) => ({
        value: e.id,
        label: `${e.idAndFsnTerm}`,
    }));
};