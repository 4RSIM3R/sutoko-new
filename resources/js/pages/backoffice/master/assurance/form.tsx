import { Button, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Assurance } from "@/types/payment-assurance";
import { FormResponse } from "@/utils/constant/system";
import { useForm } from "@inertiajs/react";
import { IconCircleQuestionmarkFill } from "justd-icons";

type AssuranceFormProps = {
    payment?: Assurance;
}

export default function AssuranceForm({ payment }: AssuranceFormProps) {

    const { data, setData, post, processing, errors } = useForm<any>(payment);

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (payment) {
            post(route('backoffice.payment-assurance.store', payment), FormResponse);
        } else {
            post(route('backoffice.payment-assurance.store'), FormResponse);
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
                    onChange={(v) => setData("name", v)}
                    errorMessage={errors.name}
                    isRequired
                />
                <TextField
                    className="col-span-12"
                    label="Contact"
                    placeholder="Contact"
                    name="contact"
                    value={data.contact}
                    autoComplete="off"
                    onChange={(v) => setData("contact", v)}
                    errorMessage={errors.contact}
                    isRequired
                />
                <div className="col-span-12" >
                    <Button isDisabled={processing} type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )

}

AssuranceForm.layout = (page: any) => <AppLayout children={page} />;