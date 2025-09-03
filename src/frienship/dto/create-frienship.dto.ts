export class CreateFrienshipDto {
  id: number;
  requester: number;
  receiver: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
