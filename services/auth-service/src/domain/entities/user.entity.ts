export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public username: string,
    public password: string,
    public firstName: string | null,
    public lastName: string | null,
    public isActive: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(props: {
    email: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }): User {
    const now = new Date();
    return new User(
      '', // será asignado por la DB
      props.email,
      props.username,
      props.password,
      props.firstName ?? null,
      props.lastName ?? null,
      true,
      now,
      now,
    );
  }
}


