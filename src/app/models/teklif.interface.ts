export interface Teklif {
  id?: number;
  ihale: number;
  yetkili?: number; 
  teklif_tarihi?: string; 
  teklif_dokumanlari_listesi: string;
  teklif_notlari:string;
  kesif: any[][]
  toplam_bedel: number;
}
