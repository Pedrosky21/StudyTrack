export class Subject {
  constructor(
    public id: number | null,
    public title: string,
    public description: string | null,
    public imageURL: string | null,
    public userID: number | null
  ) {}
}