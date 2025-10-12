export class User {
  constructor(
    public email: string,
    public name: string,
    public auth0_id: string,
    public readonly id?: string,
  ) {}
}