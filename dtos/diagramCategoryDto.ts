export default class DiagramCategoryDto {
  id;
  name;

  constructor(model: any) {
    this.id = model._id;
    this.name = model.name;
  }
}
