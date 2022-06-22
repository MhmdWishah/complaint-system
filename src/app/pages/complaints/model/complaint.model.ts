export interface ComplaintModel{
    ComplainantName: string;
    ComplainantAddress: string;
    ComplainantMobileNumber: string;
    ComplainantEmail: string;
    ComplaintPlace: string;
    ComplaintDate: string;
    IsSecretComplaint: boolean;
    ComplaintType: number;
    ComplaintDescription: string;
    ComplaintExpectedResults: string;
    ComplainantGender: number;
    ComplaintRiskLevel: number;
    ComplaintSourse: number;
    DepartmentID: number
}