
export interface Ihale {
    id: string;
    olusturan: string; // assuming User ID for olusturan
    ihale_aciklamasi: string;
    durum: string;
    baslangic_tarihi: string; // Date string
    para_birimi: string;
    ihale_bedeli: number;
    ihale_dokumanlari: string; // file path or URL
    istenen_dokumanlar: string;
    teklifciler: string[]; // array of FirmaYetkilisi IDs
    isCompleted: boolean;
    isTaslak: boolean;
    kesif: [];
}
