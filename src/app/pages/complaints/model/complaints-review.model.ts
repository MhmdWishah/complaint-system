export interface ComplaintsSearchFilters {
    FromDate: string;
    ToDate: string;
    ComplaintRiskLevelComplaintRiskLevel: number;
    ComplaintType: number;
    ComplaintStatus: number;
}

export interface SearchedComplaint {
    ComplainantName: string;
    ComplaintDate: string;
    ComplaintRiskLevelName: string;
    ComplaintTypeName: string;
    ID: number;
    IsSecretComplaint: boolean;
}