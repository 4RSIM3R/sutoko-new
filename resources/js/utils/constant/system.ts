import { toast } from "sonner";
import { VisitOptions } from '@inertiajs/core';

export const FormResponse: VisitOptions = {
    onSuccess: () => {
        toast.success('Success...');
    },
    onError: (err) => {
        toast.error(JSON.stringify(err));
    },
};