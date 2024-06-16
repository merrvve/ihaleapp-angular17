import { RequestedDocument } from "./requested-document";

export interface TenderBid {
    id: string;
    bidder_id: string;
    created_at: Date;
    requestedDocuments?: RequestedDocument[]; // Optional
    discovery_data: any[][];
    total_price: number;
  }