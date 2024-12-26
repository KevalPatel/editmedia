export class UserProfileDto {
  ContactNumber: string = '';
  CreatedAt?: Date;
  Email: string = '';
  IsActive?: boolean;
  Name: string = '';
  ProfilePic: string = '';
  ProviderId: string = '';
  TotalSizeAllowed = 50;
  Role: string = 'Normal';
}

export class ProjectDto {
  userId: string = '';
  projectName: string = '';
  projectType: string = '';
  requirement: string = '';
  userFilesStorageLocationURL: string = '';
  storageLocationURL: string = '';
  totalSizeAllowed: number = 40;
  userNotes?: string = '';
  preferedAudio?: string = '';
  createdOn: Date = new Date();
  expireOn: Date = new Date();
  isActive: boolean = true;
  projectId: number = 1;
  currentStatus: ProjectStatus = ProjectStatus.InReview
}

export enum ProjectStatus {
  InReview,
  InProgress,
  Completed,
  Discarded
}