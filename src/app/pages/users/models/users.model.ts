export interface User {
  IDNumber: string;
  IDNO: string;
  UserName: string;
  FullName: string;
  Password: string;
  Email: string;
  Mobile: string;
  StaffNo: number|null;
  Department: number|null;
  Description?: string;
  Active: boolean|null;
  EmpID: number|null;
  EmpNo: number|null;
  UserGroup: number|null;
  UserID: number|null;
  LimitDate: string
}

export interface AutoCompleteUser {
  UserID: number;
  FullName: string
}

export interface UserData {
  DepartmantTxt: string;
  EmpName: string;
  FCMToken: string;
  UserGroupText: string;
  IDNumber: string;
  IDNO: string;
  UserName: string;
  FullName: string;
  Password: string;
  Email: string;
  Mobile: string;
  StaffNo: number|null;
  Department: number|null;
  Description?: string;
  Active: boolean|null;
  EmpID: number|null;
  EmpNo: number|null;
  UserGroup: number|null;
  UserID: number|null;
  LimitDate: string
}

export const DefaultUser: User= {
  IDNumber: "",
  IDNO: "",
  UserName: "",
  FullName: "",
  Password: "",
  Email: "",
  Mobile: "",
  StaffNo: null,
  Department: null,
  Description: "",
  Active: null,
  EmpID: null,
  EmpNo: null,
  UserGroup: null,
  UserID: null,
  LimitDate: ""
}
export interface PermissionsTree {
    node: any;
    parent: PermissionsTree;
    children: PermissionsTree[];
    level: number;
}

export interface Role {
    RoleID: number;
    RoleName: string;
    permissions: String[];
    forAdmin: boolean,
    forAll: boolean,
}
