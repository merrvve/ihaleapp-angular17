export interface Qa {
    id?: string;
    companyName: string;
    companyId: string;
    tenderOwner: string;
    createdAt: string;
    question: string;
    answer?: string;
    status: 'PENDING' | 'ANSWERED' | 'CLOSED';
}