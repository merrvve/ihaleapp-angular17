export interface UserDetail {
    role: "TENDERER" | "BIDDER" | "ADMIN" |undefined;
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    company?: Company;
}

export interface Company {
    id?: string;
    name: string;
    taxNo: string; 
    category: string;
}
