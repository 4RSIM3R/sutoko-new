import { AppLayout } from "@/layouts/app-layout";

export default function Backoffice() {

    return (
        <>
            <div className="grid grid-cols-12 gap-4" >

            </div>
            {/* <div className="max-w-3xl" >
                <p className="text-xl font-semibold" >Maklumat</p>
                <p className="text-sm mt-2" >
                    Halo para pengguna SUTOKO!
                    Aplikasi ini merupakan RME versi tidak resmi (kami bukan penyedia RME). 
                    Tujuan utamanya adalah menggantikan beberapa aplikasi lama yang sering ''bermasalah' tebak sendiri, ya.
                    Anda bebas menggunakan aplikasi ini secara gratis, tetapi dilarang memperjualbelikannya karena SUTOKO dilindungi oleh lisensi.
                    Semoga bermanfaat! Namun, demi melindungi hak digital, kami mohon Anda 'sowan' ke <a className="text-blue-600" target="_blank" href="mailto:ilzammulkhaq85@gmail.com">ilzammulkhaq85@gmail.com</a> jika Anda ingin menggunakan aplikasi ini.
                    Nanti, kami akan memberikan App Key agar Anda bisa membuka limit tertentu dalam aplikasi.
                </p>
            </div>
            <div className="max-w-3xl my-4" >
                <p className="text-xl font-semibold" >Kontribusi</p>
                <p className="text-sm mt-2" >
                Anda bisa langsung berkontribusi di repository kami dengan berbagai cara, misalnya membantu pengujian (testing) atau menambahkan fitur. Kami berencana membentuk steering committee terlebih dahulu agar proyek ini lebih terorganisir. 
                Layaknya proyek open source kelas dunia, silakan kirimkan proposal Anda melalui email, tidak perlu formal. 
                Cukup jelaskan jenis kontribusi, asal institusi anda (per-orangan juga boleh) yang ingin anda berikan, apakah itu fitur baru, perbaikan bug, pengujian, atau lainnya.
                </p>
            </div> */}
        </>
    )

}

Backoffice.layout = (page: any) => <AppLayout children={page} />;