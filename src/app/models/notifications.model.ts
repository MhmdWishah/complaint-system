export interface Notification{
    Code: number;
    EmpID: number;
    Eng: string;
    Icon: string;
    Name: string;
    System: string;
    Title: string;
    TotalNotfi: number;
    UserID: number;
    activity_type: number;
    color: string;
    created_time: string;
    href: string;
    id: number;
    initiator: string;
    is_read: false
    pk_type: number;
    source_id: number;
    text: string;
    fromSignalR?: boolean
}
