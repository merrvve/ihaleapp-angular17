export interface CompareColumn {
    id: number;
    field: string;
    header: string;
    bid?: number;
    isUnit: boolean;
    isTotal: boolean;
    isAllTotal: boolean;
    color?: string;
}