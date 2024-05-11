export interface Ihale {
  id?: number;
  ihale_adi: string;
  ihale_aciklamasi: string;
  baslangic_tarihi: string; // Date string
  bitis_tarihi?: string; // Date string
  para_birimi: string;
  ihale_bedeli: number;
  istenen_dokumanlar: string;
  teklifciler: number[]; // array of FirmaYetkilisi IDs
  isCompleted: boolean;
  isTaslak: boolean;
  kesif: any[][];
}
