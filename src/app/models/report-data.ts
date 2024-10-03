import { ReportSettings } from "./report-settings";
import { TenderBidsSummary } from "./tender-bids-summary";

export interface ReportData {
    id?: string;
    bid_id: string;
    tender_id: string;
    tender_name: string;
    company_name: string;
    reportSettings: ReportSettings;
    bidsSummary: TenderBidsSummary;
    isSent: boolean;
}