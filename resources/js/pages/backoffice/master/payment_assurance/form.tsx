import { Button, Textarea, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { PaymentAssurance } from "@/types/payment-assurance";
import { Link, useForm } from "@inertiajs/react";
import { IconCircleQuestionmarkFill, IconPlus } from "justd-icons";
import { toast } from "sonner";

type PaymentAssuranceFormProps = {
    payment?: PaymentAssurance;
}

export default function PaymentAssuranceForm({ payment }: PaymentAssuranceFormProps) {

    const { data, setData, post, processing, errors, reset } = useForm<PaymentAssurance>(payment);

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (payment) {
            post(route('backoffice.payment-assurance.store', payment), {
                onSuccess: (_) => {
                    toast("Data berhasil disimpan", {
                        description: "Data berhasil disimpan",
                        important: true,
                    });
                },
                onError: (error) => {
                    toast("Whoopsss....", {
                        description: JSON.stringify(error),
                        important: true,
                    });
                }
            });
        } else {
            post(route('backoffice.payment-assurance.store'), {
                onSuccess: (_) => {
                    toast("Data berhasil disimpan", {
                        description: "Data berhasil disimpan",
                        important: true,
                    });
                },
                onError: (error) => {
                    toast("Whoopsss....", {
                        description: JSON.stringify(error),
                        important: true,
                    });
                }
            });
        }

    };

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Payment Assurance Form</h1>
                    <p className="text-sm text-gray-500" >Add new payment method</p>
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
                    autoFocus
                    onChange={(v) => setData("name", v)}
                    errorMessage={errors.name}
                    isRequired
                />
                <Textarea
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
                <div className="col-span-12" >
                    <Button isDisabled={processing} type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )

}

PaymentAssuranceForm.layout = (page: any) => <AppLayout children={page} />;