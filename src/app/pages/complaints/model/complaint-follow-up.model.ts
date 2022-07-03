export interface ComplaintInfo{
    EmpID: number;
    ID: number;
    InsertDate: string;
    Status: number;
    ComplainantName: string;
    ComplainantAddress: string;
    ComplainantAddressName: string;
    ComplainantAddressDetails: string;
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
    DepartmentName: string;
}

export interface ComplaintFollowUp{
    ComplaintID: string;
    InsertDateTime: string;
    FollowUpType: number;
    Description: string;
    ToEmpID: string;
}

export interface FollowUpInfo{
    ComplaintID: string;
    InsertDateTime: string;
    FollowUpType: number;
    Description: string;
    ToEmpID: string;
    EmpID: number;
    EmpIDName: string;
    FollowUpTypeName: string;
    ID: number;
    ToEmpIDName: string;
}

export interface ComplaintEmp{
    ComplaintID: number; 
    EmpID: number;
    EmpName: string;
}

export interface ComplaintOtherEmps{
    ComplaintID: number; 
    ComplaintOtherEmployees: string;
}