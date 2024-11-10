type KfaItem = {
    name?: string;
    kfa_code?: string;
    active?: boolean;
    state?: string;
    image?: string | null;
    updated_at?: string;
    farmalkes_type?: {
        code?: string;
        name?: string;
        group?: string;
    };
    dosage_form?: {
        code?: string;
        name?: string;
    };
    produksi_buatan?: string;
    nie?: string;
    nama_dagang?: string;
    manufacturer?: string;
    registrar?: string;
    generik?: boolean;
    rxterm?: number;
    dose_per_unit?: number;
    fix_price?: number | null;
    het_price?: number | null;
    farmalkes_hscode?: string | null;
    tayang_lkpp?: string | null;
    kode_lkpp?: string | null;
    net_weight?: number | null;
    net_weight_uom_name?: string;
    volume?: number | null;
    volume_uom_name?: string;
    med_dev_jenis?: string | null;
    med_dev_subkategori?: string | null;
    med_dev_kategori?: string | null;
    med_dev_kelas_risiko?: string | null;
    klasifikasi_izin?: string | null;
    uom?: {
        name?: string;
    };
    product_template?: {
        name?: string;
        state?: string;
        active?: boolean;
        kfa_code?: string;
        updated_at?: string;
        display_name?: string;
    };
    active_ingredients?: Array<{
        state?: string;
        active?: boolean;
        kfa_code?: string;
        zat_aktif?: string;
        updated_at?: string;
        kekuatan_zat_aktif?: string;
    }>;
    tags?: Array<{
        code?: string | null;
        name?: string | null;
    }>;
    replacement?: {
        product?: {
            name?: string | null;
            reason?: string | null;
            kfa_code?: string | null;
        };
        template?: {
            name?: string | null;
            reason?: string | null;
            kfa_code?: string | null;
        };
    };
    total_data?: number;
};
