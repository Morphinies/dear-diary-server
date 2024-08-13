export default class CalendarDataDto {
  id;
  menuId;
  deadlineIds;

  constructor(model: any) {
    this.id = model._id;
    this.menuId = model.menuId;
    this.deadlineIds = model.deadlineIds;
  }
}
