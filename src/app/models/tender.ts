import { RequestedDocument } from "./requested-document";
import { TenderBid } from "./tender-bid";

export interface Tender {
    id?: string; // Optional for new tenders
    owner_id: string;
    name: string;
    description: string;
    created_at: Date; // Use appropriate Firebase import
    completed_at?: Date; // Optional
    currency: string;
    cost: number;
    requestedDocuments: RequestedDocument[];
    tenderFiles: TenderFile[];
    bidders: string[];
    isCompleted: boolean;
    isDraft: boolean;
    discovery_data: any[][];
    revisions?: TenderRevision[]; // Optional
    bids?: TenderBid[]; // Optional (can be populated later)
    messages?: TenderMessage[]; // Optional (can be populated later)
  }
  
  
  export interface TenderFile {
    // Add properties for tender files (e.g., name, url)
  }
  
  export interface TenderRevision {
    id: string;
    created_at: Date;
    difference: any;
  }
  
  
  
  export interface TenderMessage {
    id: string;
    created_at: Date;
    replied: boolean;
    sender_id: string;
    // Add message content field (e.g., text)
  }
  