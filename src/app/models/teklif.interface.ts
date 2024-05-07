export interface Teklif {
  id: number;
  ihale: number; // assuming this is the foreign key reference
  yetkili: number; // assuming this is the foreign key reference
  teklif_tarihi: string; // Date string
  teklif_dokumanlari: string; // file path or URL
  kesif: any[][]
  toplam_bedel: number;
}
