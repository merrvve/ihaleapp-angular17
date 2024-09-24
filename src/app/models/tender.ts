import { ReportSettings } from './report-settings';
import { RequestedDocument } from './requested-document';
import { TenderBid } from './tender-bid';
import { TenderBidsSummary } from './tender-bids-summary';

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
  revisions?: TenderRevision[]; 
  bids?: TenderBid[]; 
  messages?: TenderMessage[]; 
  reportSetting?: ReportSettings
  bidsSummary?: TenderBidsSummary
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

