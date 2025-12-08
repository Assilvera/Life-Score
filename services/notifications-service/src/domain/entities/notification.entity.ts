export class Notification {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly title: string,
    public readonly message: string,
    public readonly type: string,
    public readonly challengeId?: string | null,
    public readonly isRead: boolean = false,
    public readonly createdAt?: Date,
    public readonly readAt?: Date | null,
  ) {}
}
