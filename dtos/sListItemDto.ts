export default class ListItemDto {
  id;
  text;
  sort;
  desc;
  menuId;
  updatedAt;
  createdAt;

  constructor(model: any) {
    this.id = model._id;
    this.text = model.text;
    this.sort = model.sort;
    this.desc = model.desc;
    this.menuId = model.menuId;
    this.updatedAt = model.updatedAt;
    this.createdAt = model.createdAt;
  }
}
