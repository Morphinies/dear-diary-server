export default class DiagramChapterDto {
  id;
  name;
  unit;

  constructor(model: any) {
    this.id = model._id;
    this.name = model.name;
    this.unit = model.unit;
  }
}
