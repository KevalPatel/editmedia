import { ProjectDto } from '../portfolio/projects/projects.model';

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

export class UserDetailsDto {
  profile?: UserProfileDto;
  Projects: ProjectDto[] = [];
}
