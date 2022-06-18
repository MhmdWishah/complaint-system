export interface ComplaintInfo{
    EmpID: number;
    ID: number;
    InsertDate: string;
    Status: number;
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
    ComplainantGenderName: string;
    ComplaintRiskLevelName: string;
    ComplaintSourseName: string;
    StatusName: string;
    ComplaintTypeName: string;
}
