export default class CalendarDataDto {
  id;
  deadlineIds;

  constructor(model: any) {
    this.id = model._id;
    this.deadlineIds = model.deadlineIds;
  }
}
