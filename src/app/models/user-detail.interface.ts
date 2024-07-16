import { Company } from "./company.interface";

export interface UserDetail {
    role: "TENDERER" | "BIDDER" | "ADMIN" |undefined;
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    companyId?: string;
}


