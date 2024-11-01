import { ReportSettings } from './report-settings';
import { RequestedDocument } from './requested-document';
import { TenderBid } from './tender-bid';
import { TenderBidsSummary } from './tender-bids-summary';

export interface Tender {
  id?: string; 
  owner_id: string;
  name: string;
  description: string;
  created_at: string; 
  completed_at?: string; 
  currency: string;
  cost: number;
  requestedDocuments: RequestedDocument[];
  tenderFiles: TenderFile[];
  bidders: string[];
  isCompleted: boolean;
  isDraft: boolean;
  isEditMode?: boolean;
  discoveryData?: any;
  bidsCount: number;
  revisionsCount: number;
  questionsCount: number;
  liscenseTime: string;
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
  id?: string;
  name?: string,
  created_at: string;
  discoveryData: any;
}

export interface TenderMessage {
  id: string;
  created_at: Date;
  replied: boolean;
  sender_id: string;
}

