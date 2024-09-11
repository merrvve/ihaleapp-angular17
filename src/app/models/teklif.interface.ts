export interface Teklif {
  id?: number;
  ihale: number;
  yetkili?: number;
  firma_id?: string;
  firma_adi?: string;
  teklif_tarihi?: string;
  teklif_dokumanlari_listesi: string;
  teklif_notlari: string;
  kesif: any[][];
  toplam_bedel: number;
}
