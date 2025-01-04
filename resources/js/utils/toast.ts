import { toast } from "sonner";

export const toats_success = () => {
    toast("Data berhasil disimpan", {
        description: "Data berhasil disimpan",
        important: true,
    });
}

export const toats_error = (message: any) => {
    toast("Whoopsss....", {
        description: message,
        important: true,
    });
}