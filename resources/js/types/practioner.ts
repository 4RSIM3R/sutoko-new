import { Field } from "./field";

export type Practitioner = Field & {
    id: number;
    nik: any;
    employee_id: any;
    prefix?: any;
    name: any;
    suffix?: any;
    birth_place: any;
    birth_date: any;
    gender: any;
    religion: any;
    occupation: any;
    specialty?: any;
};