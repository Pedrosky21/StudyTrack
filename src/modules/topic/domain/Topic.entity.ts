export class Topic {
  constructor(
    public title: string,
    public order: number,
    public unit_id: number,
    public description?: string,
    public topic_father_id?: number,
    public id?: number
  ) {};
}
