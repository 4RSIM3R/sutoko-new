import { Button, Select, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Charge } from "@/types/charge";
import { PaymentAssurance } from "@/types/payment-assurance";
import { Link, useForm } from "@inertiajs/react";
import { IconCircleQuestionmarkFill, IconPlus } from "justd-icons";
import { toast } from "sonner";

type ChargeFormProps = {
    payment: PaymentAssurance[];
    charge?: Charge;
}

export default function ChargeForm({ payment, charge }: ChargeFormProps) {

    const { data, errors, processing, setData, post, put } = useForm<Charge>(charge);

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (charge) {
            put(route('backoffice.patient.store', charge), {
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
            post(route('backoffice.charge.store'), {
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
                    autoFocus
                    onChange={(v) => setData("name", v)}
                    errorMessage={errors.name}
                    isRequired
                />
                <Select
                    className="col-span-12"
                    label="Payment Method"
                    placeholder="Select Payment Method"
                    onSelectionChange={(val) => setData("payment_assurance_id", val.toString())}
                >
                    <Select.Trigger />
                    <Select.List items={payment}>
                        {
                            payment.map(e => (
                                <Select.Option id={e.id} textValue={e.name}>
                                    {e.name}
                                </Select.Option>
                            ))
                        }
                    </Select.List>
                </Select>
                <TextField
                    className="col-span-12"
                    label="Harga"
                    placeholder="Harga"
                    name="price"
                    value={data.price}
                    autoComplete="off"
                    autoFocus
                    onChange={(v) => setData("price", v)}
                    errorMessage={errors.price}
                    isRequired
                />
                <div className="col-span-12" >
                    <Button isDisabled={processing} type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )

}

ChargeForm.layout = (page: any) => <AppLayout children={page} />;