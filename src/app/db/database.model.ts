export class UserProfileDto {
  ContactNumber: string = '';
  CreatedAt?: Date;
  Email: string = '';
  IsActive?: boolean;
  Name: string = '';
  ProfilePic: string = '';
  ProviderId: string = '';
  TotalSizeAllowed = 50;
}

export class ProjectDto {
  UserId: string = '';
  projectName: string = '';
  FunctionType: string = '';
  Requirement: string = '';
  UserFilesStorageLocationURL: string = '';
  StorageLocationURL: string = '';
  TotalSizeAllowed: number = 40;
  UserNotes?: string = '';
  PreferedAudio?: string = '';
  CreatedOn: Date = new Date();
  ExpireOn: Date = new Date();
  IsActive: boolean = true;
}
