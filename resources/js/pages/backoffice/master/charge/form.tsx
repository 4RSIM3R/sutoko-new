import { Button, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Charge } from "@/types/charge";
import { Assurance } from "@/types/payment-assurance";
import { FormResponse } from "@/utils/constant/system";
import { useForm } from "@inertiajs/react";
import { IconCircleQuestionmarkFill } from "justd-icons";
import { useState } from "react";

type ChargeFormProps = {
    payment: Assurance[];
    charge?: Charge;
}

export default function ChargeForm({ payment, charge }: ChargeFormProps) {

    const [paymentCharge, setPaymentCharge] = useState<{ payment_assurance_id: any; price: any }[]>([]);
    const { data, errors, processing, setData, post, put } = useForm<any>(charge);

    const handlePriceChange = (id: any, price: any) => {
        setPaymentCharge((prev) => {
            const existingIndex = prev.findIndex((item) => item.payment_assurance_id === id);
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].price = price;
                return updated;
            }
            return [...prev, { payment_assurance_id: id, price }];
        });
    };

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        data['charges'] = paymentCharge;

        if (charge) {
            put(route('backoffice.patient.store', charge), FormResponse);
        } else {
            post(route('backoffice.charge.store'), FormResponse);
        }

    };

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Charge Book Form</h1>
                    <p className="text-sm text-gray-500" >Add new charge book</p>
                </div>
                <div>
                    <Button appearance="outline" >
                        <IconCircleQuestionmarkFill />
                    </Button>
                </div>
            </div>
            <form onSubmit={onSubmit} className="grid grid-cols-12 gap-4 mt-4">
                <TextField
                    className="col-span-12"
                    label="Nama"
                    placeholder="Nama"
                    name="name"
                    value={data.name}
                    autoComplete="off"
                    onChange={(v) => setData("name", v)}
                    errorMessage={errors.name}
                    isRequired
                />
                <TextField
                    className="col-span-12"
                    label="Deskripsi"
                    placeholder="Deskripsi"
                    name="description"
                    value={data.description}
                    autoComplete="off"
                    onChange={(v) => setData("description", v)}
                    errorMessage={errors.description}
                    isRequired
                />
                {
                    payment.map(e => (
                        <>
                            <TextField
                                className="col-span-6"
                                label="Payment Method"
                                value={e.name.toUpperCase()}
                                isReadOnly
                            />
                            <TextField
                                className="col-span-6"
                                label="Price"
                                inputMode="numeric"
                                onChange={(v) => handlePriceChange(e.id, v)}
                            />
                        </>
                    ))
                }
                <div className="col-span-12" >
                    <Button isDisabled={processing} type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )

}

ChargeForm.layout = (page: any) => <AppLayout children={page} />;