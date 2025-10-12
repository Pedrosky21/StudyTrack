export class Subject {
  constructor(
    public title: string,
    public userID: number | null,
    public id?: number | null,
    public description?: string | null,
    public imageURL?: string | null,
  ) {}
}