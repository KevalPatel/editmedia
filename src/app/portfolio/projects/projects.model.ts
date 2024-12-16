export interface ProjectDto {
  id: string;
  projectName: string;
  FunctionType: string;
  RequirePhotoAlbum?: boolean | null | undefined;
  RequireVideoAlbum?: boolean | null | undefined;
  PreferedAudioURL?: string | null | undefined;
  StorageLocationURL?: string | null | undefined;
  TotalSizeAllowed?: number | null | undefined;
  UserNotes?: string | null | undefined;
  CreatedOn: Date;
  ExpireOn: Date;
}

export interface ProjectsDto {
  Projects?: ProjectDto[] | null;
}
