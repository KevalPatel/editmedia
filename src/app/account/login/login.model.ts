export interface UserDto {
  Uid?: string | null | undefined;
  UserName: string | null | undefined;
  Provider: string | null | undefined;
  Email: string | null | undefined;
  TokenDetail: object;
}
