export interface PublicComplaint {
    ID?: number;
    Center: number;
    ComplainantName: string;
    ComplainantAddress: number;
    ComplainantAddressTxt: string;
    ComplainantAddressDetails: string;
    ComplainantMobileNumber: string;
    ComplainantEmail: string;
    ComplaintDescription: string;
    ComplainantGender: string;
    ComplainantGenderTxt: string;
    ComplaintDate: string;
    TransferStatus?: number;
    ReceivedFullName?: string;
    ReceivedDate?: string;
}

export interface PublicComplaintSearchParams {
    FromDate?: string;
    ToDate?: string;
    TransferStatus?: number;
}
