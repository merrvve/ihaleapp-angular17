import { RequestedDocument } from "./requested-document";

export interface TenderBid {
    id?: string;
    bidder_id: string;
    company_id?: string;
    company_name?: string;
    created_at: string;
    requestedDocuments?: RequestedDocument[]; // Optional
    discovery_data?: any;
    total_price: number;
  }