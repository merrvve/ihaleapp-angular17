export interface Teklif {
  id?: number;
  ihale: number;
  yetkili: number; 
  teklif_tarihi: string; 
  teklif_dokumanlari: string;
  kesif: any[][]
  toplam_bedel: number;
}
