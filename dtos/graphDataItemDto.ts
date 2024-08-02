export default class DiagramDataItemDto {
  id;
  unit;
  desc;
  date;
  value;
  chapterId;
  updatedAt;
  createdAt;

  constructor(model: any) {
    this.id = model.id;
    this.unit = model.unit;
    this.desc = model.desc;
    this.date = model.date;
    this.value = model.value;
    this.chapterId = model.chapterId;
    this.updatedAt = model.updatedAt;
    this.createdAt = model.createdAt;
  }
}
