export class RegisterModel {
    UserID : string | undefined;
    CreatedBy : string | undefined;
    Operation?:string;
    FirstName?: string;
    LastName?:string;
    Designation?:string;
    EmployeeID?:string;
    Email?:string;
    IsActive?:boolean;
    UserName?:string;
    Password?:string;
    DOB?:Date;
    Gender?:boolean;
    Role?:number;
    }

export class DeleteModel{
    UserID : string | undefined;
    Operation?:string;
}
