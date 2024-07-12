type GUID = string;

export class JobsModel {
    JobID : GUID | undefined;
    JobVendorID?:string;
    JobName: string | undefined;
    Description: string | undefined;
    JobReleaseDate?:Date;
    IsActive?: boolean; 
    VendorID?:string;
}

export class JobsModel2{
    JobID : GUID | undefined;
    Operation?:string;
}