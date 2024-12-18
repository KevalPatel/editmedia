export class ProjectDto {
  Id: string = '';
  projectName: string = '';
  FunctionType: string = '';
  Requirement: string = '';
  StorageLocationURL: string = '';
  TotalSizeAllowed: number = 40;
  UserNotes?: string = '';
  PreferedAudio?: string = '';
  CreatedOn: Date = new Date();
  ExpireOn: Date = new Date()
  IsActive: boolean = true;
}

export class ProjectsDto {
  Projects?: ProjectDto[];
}
