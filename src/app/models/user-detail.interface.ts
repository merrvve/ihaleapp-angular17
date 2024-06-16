export interface UserDetail {
    role: "ISVEREN" | "TEKLIFCI" | "ADMIN" |undefined;
    uid: string;
    accessToken: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    photoUrl: string;
    creationTime: string;
    lastSignInTime: string;
    company?: Company;
}

export interface Company {
    id?: string;
    name: string;
    taxNo: string; 
    category: string;
}
