import { Button, Checkbox, Label } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Encounter } from "@/types/encounter";
import { fetchLocation, fetchPatient, fetchPaymentAssurance, fetchPractioner } from "@/utils/select";
import { IconCircleQuestionmarkFill } from "justd-icons";
import { useState } from "react";
import AsyncSelect from "react-select/async";

export default function EncounterForm() {

    const [encounter, setEncounter] = useState<Encounter>({})

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Encounter Form</h1>
                    <p className="text-sm text-gray-500" >Register new patient encounter</p>
                </div>
                <div>
                    <Button appearance="outline" >
                        <IconCircleQuestionmarkFill />
                    </Button>
                </div>
            </div>
            <form className="mt-4 grid grid-cols-12 gap-4">
                <div className="col-span-6" >
                    <Label className="mb-1.5">Pasien</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={fetchPatient}
                        defaultOptions
                        defaultValue={{ value: encounter?.patient_id, label: encounter?.patient_name }}
                        isClearable
                        onChange={(value) => {

                        }}
                        placeholder="Search for a patient..."
                    />
                </div>
                <div className="col-span-6" >
                    <Label className="mb-1.5">Location</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={fetchLocation}
                        defaultOptions
                        defaultValue={{ value: encounter?.location_id, label: encounter?.location_name }}
                        isClearable
                        onChange={(value) => {

                        }}
                        placeholder="Search for a location..."
                    />
                </div>
                <div className="col-span-6" >
                    <Label className="mb-1.5">Practioner</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={fetchPractioner}
                        defaultOptions
                        defaultValue={{ value: encounter?.practioner_id, label: encounter?.practioner_name }}
                        isClearable
                        onChange={(value) => {

                        }}
                        placeholder="Search for a praction..."
                    />
                </div>
                <div className="col-span-6" >
                    <Label className="mb-1.5">Payment Assurance</Label>
                    <AsyncSelect
                        className="col-span-6 text-black"
                        cacheOptions
                        loadOptions={fetchPaymentAssurance}
                        defaultOptions
                        defaultValue={{ value: encounter?.payment_assurance_id, label: encounter?.payment_assurance_name }}
                        isClearable
                        onChange={(value) => {

                        }}
                        placeholder="Search for a payment assurance..."
                    />
                </div>
                <div className="col-span-12" >
                    <Checkbox>Kirim quisioner pelayanan ke pasien?</Checkbox>
                </div>
                <div className="col-span-6" >
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )

}

EncounterForm.layout = (page: any) => <AppLayout children={page} />;