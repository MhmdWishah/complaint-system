export interface UserRole {
  UserID: number;
  RoleID: number;
  RoleName: string;
  UserFullName?: string;
}


export interface Role {
  ForAdmin: boolean;
  ForAll: boolean;
  Name: string;
  code: number;
}


export interface SaveRolePayload {
  RoleID: number;
  userID: number;
}