import { Button } from "@/components/ui";

export default function AppointmentIndex() {

    return (
        <div className="h-screen w-full bg-white" >
            <div className="max-w-sm sm:max-w-md mx-auto bg-white h-screen w-full p-6" >
                <p className="text-lg font-semibold" >Form Pendaftaran Kunjungan</p>
                <p className="text-sm text-gray-500" >Silahkan isi data berikut untuk mendaftar kunjungan</p>
                <form className="mt-4 flex flex-col gap-4" >
                    <Button type="submit" >
                        Daftar
                    </Button>
                </form>
            </div>
        </div>
    )

}