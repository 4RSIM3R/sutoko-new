import { Button, Select, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Charge } from "@/types/charge";
import { PaymentAssurance } from "@/types/payment-assurance";
import { toats_error, toats_success } from "@/utils/toast";
import { Link, useForm } from "@inertiajs/react";
import { IconCircleQuestionmarkFill, IconPlus } from "justd-icons";
import { useState } from "react";
import { toast } from "sonner";

type ChargeFormProps = {
    payment: PaymentAssurance[];
    charge?: Charge;
}

export default function ChargeForm({ payment, charge }: ChargeFormProps) {

    // []{ payment_assurance_id: string, price: string }
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
            put(route('backoffice.patient.store', charge), {
                onSuccess: (_) => toats_success(),
                onError: (error) => toats_error(JSON.stringify(error)),
            });
        } else {
            post(route('backoffice.charge.store'), {
                onSuccess: (_) => toats_success(),
                onError: (error) => toats_error(JSON.stringify(error)),
            });
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