import { Location } from "./location";
import { Patient } from "./patient";
import { Assurance } from "./payment-assurance";
import { Practitioner } from "./practioner";

export type Encounter = {
    id?: any;
    patient_id?: any;
    patient_name?: any;
    practioner_id?: any;
    practioner_name?: any;
    location_id?: any;
    location_name?: any;
    payment_assurance_id?: any;
    payment_assurance_name?: any;
    satu_sehat_id?: any;
    status?: any;
    request?: Record<any, any> | null;
    response?: Record<any, any> | null;
    created_at?: any;
    updated_at?: any;
    synced_at?: any | null;
    deleted_at?: any | null;
    patient?: Patient | null;
    practioner?: Practitioner | null;
    location?: Location | null;
    payment_assurance?: Assurance | null;
};