export class TopicDTO {
  constructor(
    public title: string,
    public order: number,
    public id?: number,
    public description?: string,
    public topic_father_id?: number
  ) {}
}

export class UnitDTO {
  constructor(
    public title: string,
    public order: number,
    public id?: number,
    public topics?: TopicDTO[],
    public description?: string
  ) {}
}

export class SubjectDTO {
  constructor(
    public title: string,
    public id?: number,
    public userID?: number,
    public description?: string,
    public imageURL?: string,
    public units?: UnitDTO[]
  ) {}
}
