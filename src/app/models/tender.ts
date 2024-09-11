import { RequestedDocument } from './requested-document';
import { TenderBid } from './tender-bid';

export interface Tender {
  id?: string; // Optional for new tenders
  owner_id: string;
  name: string;
  description: string;
  created_at: string; // Use appropriate Firebase import
  completed_at?: string; // Optional
  currency: string;
  cost: number;
  requestedDocuments: RequestedDocument[];
  tenderFiles: TenderFile[];
  bidders: string[];
  isCompleted: boolean;
  isDraft: boolean;
  isEditMode?: boolean;
  discoveryData?: any;
  revisions?: TenderRevision[]; // Optional
  bids?: TenderBid[]; // Optional (can be populated later)
  messages?: TenderMessage[]; // Optional (can be populated later)
}

export interface TenderFile {
  id?: string;
  name: string;
  url: string;
  created_at: string;
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
