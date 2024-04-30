export interface Teklif {
  id: string;
  ihale: string; // assuming this is the foreign key reference
  yetkili: string; // assuming this is the foreign key reference
  teklif_tarihi: string; // Date string
  teklif_dokumanlari: string; // file path or URL
  toplam_bedel: number;
}
