export interface Column {
  field: string;
  header: string;
  editable: boolean;
  numberField: boolean;
  relatedField?: string;
  isBirim: boolean;
  isToplam: boolean;
  isBirimToplam: boolean;
  isMiktar: boolean;
  isAllTotal: boolean;
}
