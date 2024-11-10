export type Patient = {
    id?: number;
    nik?: string;
    name?: string;
    gender?: string;
    birth_date?: string;
    religion?: string;
    blood_group?: string;
    education?: string;
    marital_status?: string;
    occupation?: string;
    phone_number?: string;
    address?: string;
    satu_sehat_id?: string;
    synced_at?: Date;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
};
