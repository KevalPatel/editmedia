export interface ProjectDto {
  id: string;
  projectName: string;
  FunctionType: string;
  requirement: string;
  StorageLocationURL: string;
  TotalSizeAllowed: number;
  UserNotes?: string | null | undefined;
  PreferedAudio?: string | null | undefined;
  CreatedOn: Date;
  ExpireOn: Date;
  IsActive: boolean;
}

export interface ProjectsDto {
  Projects?: ProjectDto[] | null;
}
