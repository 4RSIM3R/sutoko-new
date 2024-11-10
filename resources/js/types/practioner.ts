export type Practitioner = {
    id: number;
    name: string;
    nik: string;
    role: string;
    gender: string;
    birth_date?: string;
    phone_number?: string;
    address?: string;
    satu_sehat_id?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
};