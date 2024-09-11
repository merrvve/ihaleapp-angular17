import { Ihalefile } from './ihalefile.interface';

export interface Ihale {
  id?: number;
  ihale_adi: string;
  ihale_aciklamasi: string;
  baslangic_tarihi?: string;
  bitis_tarihi?: Date;
  para_birimi: string;
  ihale_bedeli: number;
  istenen_dokumanlar: string;
  ihale_dosyalari?: Ihalefile[];
  teklifciler: number[]; // array of FirmaYetkilisi IDs
  isCompleted: boolean;
  isTaslak: boolean;
  kesif: any[][];
}
