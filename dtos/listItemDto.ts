export default class ListItemDto {
  id;
  text;
  sort;
  menuId;
  priority;
  deadline;
  updatedAt;
  createdAt;
  isCompleted;

  constructor(model: any) {
    this.id = model._id;
    this.text = model.text;
    this.sort = model.sort;
    this.menuId = model.menuId;
    this.priority = model.priority;
    this.deadline = model.deadline;
    this.updatedAt = model.updatedAt;
    this.createdAt = model.createdAt;
    this.isCompleted = model.isCompleted;
  }
}
