import { Company } from "./company.interface";

export interface Meeting {
    id?: string;
    ownerId: string;
    name: string;
    date: string;
    notes: string;
    location: string;
    companies: Company[];

}